// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  renderMediaHits();
  setupRevealSections(document);
});

const MEDIA_CATEGORIES = [
  { key: "video", label: "Videos" },
  { key: "opinion", label: "Opinion Pieces" },
  { key: "article", label: "Articles" },
];

function renderMediaHits() {
  const container = document.querySelector("#media-grid");
  if (!container || typeof mediaHits === "undefined") return;

  if (mediaHits.length === 0) {
    container.innerHTML = `
      <div class="media-empty">
        Media coverage will appear here soon. Check back shortly.
      </div>
    `;
    return;
  }

  const sorted = [...mediaHits].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  container.innerHTML = MEDIA_CATEGORIES.map(({ key, label }, index) => {
    const items = sorted.filter((item) => item.category === key);
    if (items.length === 0) return "";

    const expanded = index === 0;

    return `
      <div class="reveal-section media-category${expanded ? " is-expanded" : ""}">
        <h3>
          <button class="reveal-toggle" type="button" aria-expanded="${expanded}">
            <span class="reveal-label">${escapeHtml(label)}</span>
            <span class="reveal-count">${items.length}</span>
            <svg class="reveal-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </h3>
        <div class="reveal-body">
          <div class="media-grid">
            ${items.map(renderMediaCard).join("")}
          </div>
        </div>
      </div>
    `;
  }).join("");

  setupRevealSections(container);
}

const REVEAL_COLLAPSE_DELAY = 900;
const REVEAL_SCROLL_SETTLE_DELAY = 700;
const REVEAL_SCROLL_THRESHOLD = 150;

function setupRevealSections(root) {
  const sections = [...root.querySelectorAll(".reveal-section")].filter(
    (section) => !section.dataset.revealBound
  );
  if (sections.length === 0) return;

  const leaveTimers = new WeakMap();
  let scrollAtExpand = window.scrollY;
  let scrollTimer = null;

  const collapse = (section) => {
    const toggle = section.querySelector(".reveal-toggle");
    const body = section.querySelector(".reveal-body");
    const rect = section.getBoundingClientRect();
    const isScrolledPastTop = rect.top < 0;

    if (isScrolledPastTop) {
      // Section has already scrolled past the top of the viewport. Collapsing it
      // removes height above the user's current view, which would otherwise drag
      // everything below it (what they're actually looking at) up the page — so
      // we collapse instantly (no animation) and manually compensate scroll
      // position by exactly however much the document shrank.
      const scrollYBefore = window.scrollY;
      const docHeightBefore = document.documentElement.scrollHeight;
      const prevTransition = body.style.transition;
      body.style.transition = "none";
      section.classList.remove("is-expanded");
      toggle.setAttribute("aria-expanded", "false");
      const removed = docHeightBefore - document.documentElement.scrollHeight;
      if (removed > 0) {
        window.scrollTo(0, scrollYBefore - removed);
      }
      requestAnimationFrame(() => {
        body.style.transition = prevTransition;
      });
    } else {
      section.classList.remove("is-expanded");
      toggle.setAttribute("aria-expanded", "false");
    }
  };

  const cancelPendingCollapse = (section) => {
    clearTimeout(leaveTimers.get(section));
  };

  const scheduleCollapse = (section, delay) => {
    cancelPendingCollapse(section);
    leaveTimers.set(
      section,
      setTimeout(() => collapse(section), delay)
    );
  };

  const expand = (section) => {
    cancelPendingCollapse(section);
    section.classList.add("is-expanded");
    section.querySelector(".reveal-toggle").setAttribute("aria-expanded", "true");
    scrollAtExpand = window.scrollY;
  };

  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  sections.forEach((section) => {
    section.dataset.revealBound = "true";
    const toggle = section.querySelector(".reveal-toggle");

    if (supportsHover) {
      section.addEventListener("mouseenter", () => expand(section));
      section.addEventListener("mouseleave", () => scheduleCollapse(section, REVEAL_COLLAPSE_DELAY));
    }
    toggle.addEventListener("focus", () => expand(section));
    toggle.addEventListener("blur", () => scheduleCollapse(section, REVEAL_COLLAPSE_DELAY));
    toggle.addEventListener("click", () => {
      section.classList.contains("is-expanded") ? collapse(section) : expand(section);
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (Math.abs(window.scrollY - scrollAtExpand) > REVEAL_SCROLL_THRESHOLD) {
          sections
            .filter((section) => section.classList.contains("is-expanded") && !section.matches(":hover"))
            .forEach((section) => scheduleCollapse(section, 0));
        }
      }, REVEAL_SCROLL_SETTLE_DELAY);
    },
    { passive: true }
  );
}

function renderMediaCard(item) {
  const dateLabel =
    item.dateLabel ||
    new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const embed = item.embedUrl
    ? `
      <div class="media-embed${item.embedType === "audio" ? " is-audio" : ""}">
        <iframe
          src="${escapeAttr(item.embedUrl)}"
          title="${escapeAttr(item.title)}"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    `
    : "";

  const linkLabel = item.embedUrl ? "View original &rarr;" : "Read the full piece &rarr;";
  const favicon = getFaviconUrl(item.link);

  return `
    <article class="media-card">
      ${embed}
      <span class="media-pub">
        ${favicon ? `<img class="media-pub-icon" src="${escapeAttr(favicon)}" alt="" loading="lazy" />` : ""}
        ${escapeHtml(item.publication)}
      </span>
      <h3>${escapeHtml(item.title)}</h3>
      <span class="media-date">${dateLabel}</span>
      <p class="media-excerpt">${escapeHtml(item.excerpt)}</p>
      <a class="media-link" href="${escapeAttr(item.link)}" target="_blank" rel="noopener noreferrer">
        ${linkLabel}
      </a>
    </article>
  `;
}

function getFaviconUrl(link) {
  try {
    const { hostname } = new URL(link);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

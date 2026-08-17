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

  container.innerHTML = MEDIA_CATEGORIES.map(({ key, label }) => {
    const items = sorted.filter((item) => item.category === key);
    if (items.length === 0) return "";

    return `
      <div class="media-category">
        <h3 class="media-category-title">${escapeHtml(label)}</h3>
        <div class="media-grid">
          ${items.map(renderMediaCard).join("")}
        </div>
      </div>
    `;
  }).join("");
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

  return `
    <article class="media-card">
      ${embed}
      <span class="media-pub">${escapeHtml(item.publication)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <span class="media-date">${dateLabel}</span>
      <p class="media-excerpt">${escapeHtml(item.excerpt)}</p>
      <a class="media-link" href="${escapeAttr(item.link)}" target="_blank" rel="noopener noreferrer">
        ${linkLabel}
      </a>
    </article>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

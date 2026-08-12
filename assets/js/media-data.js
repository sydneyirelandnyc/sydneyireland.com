// Media Hits data
//
// To add a new press mention, copy the template below into the mediaHits
// array and fill in your details. Entries are automatically sorted by
// date (newest first) and rendered on media.html — no other changes needed.
//
// Template:
// {
//   title: "Headline of the piece",
//   publication: "Publication Name",
//   date: "2026-01-15",              // YYYY-MM-DD, used for sorting
//   dateLabel: "2026",               // optional — overrides the displayed date
//                                    // (handy when only the year is known)
//   excerpt: "A short one- or two-sentence excerpt or summary.",
//   link: "https://example.com/full-article",
//   embedType: "video",              // optional — "video" or "audio"
//   embedUrl: "https://...",         // optional — iframe embed src
// },

const mediaHits = [
  {
    title: "Why Boy Scouts of America Is Changing Its Name",
    publication: "PBS NewsHour",
    date: "2024-05-10",
    excerpt: "A PBS NewsHour segment on Scouting America's rebrand and the broader push toward gender-inclusive scouting.",
    link: "https://www.pbs.org/newshour/show/why-boy-scouts-of-america-is-changing-its-name",
    embedType: "video",
    embedUrl: "https://player.pbs.org/viralplayer/3091328657",
  },
  {
    title: "Woman, 22, Who Fought for Nine Years to Become a Boy Scout Reveals How She Transformed It Into the Co-Ed Program It Is Today — and Now Her Story Is Set to Become a Feature Film",
    publication: "Daily Mail",
    date: "2024-01-14",
    excerpt: "A profile of Sydney's nine-year campaign to join the Boy Scouts, her role shaping the now co-ed program, and news that her story is being developed into a feature film.",
    link: "https://www.dailymail.com/lifestyle/article-12907335/sydney-ireland-fought-nine-years-boy-scouts-movie.html",
  },
  {
    title: "Why Scouting America Blazes a Different Trail",
    publication: "The Advocate",
    date: "2025-02-20",
    excerpt: "Reflects on Scouting America's gender-neutral rebrand as meaningful progress, while arguing that lasting change requires deeper cultural shifts and more diverse leadership.",
    link: "https://www.advocate.com/opinion/scouting-america",
  },
  {
    title: "The Boy Scouts Aren't Letting Girls In Yet, But Sydney Ireland Is Determined to Be the First Female Eagle Scout",
    publication: "The Daily Show",
    date: "2017-06-01",
    dateLabel: "2017",
    excerpt: "Correspondent Desi Lydic profiles Sydney's fight to become the Boy Scouts' first female Eagle Scout, back when the organization still barred girls from joining.",
    link: "https://www.facebook.com/thedailyshow/videos/the-boy-scouts-arent-letting-girls-in-yet-but-sydney-ireland-is-determined-to-be/1893704570708075/",
    embedType: "video",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fthedailyshow%2Fvideos%2Fthe-boy-scouts-arent-letting-girls-in-yet-but-sydney-ireland-is-determined-to-be%2F1893704570708075%2F&show_text=false",
  },
  {
    title: "This Girl Is Fighting for Inclusion in the Boy Scouts of America",
    publication: "NowThis Her — Girlhood",
    date: "2017-06-01",
    dateLabel: "2017",
    excerpt: "A NowThis Her \"Girlhood\" video on Sydney's fight to be included in the Boy Scouts of America.",
    link: "https://www.facebook.com/NowThisHer/videos/912535855543957/",
    embedType: "video",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FNowThisHer%2Fvideos%2F912535855543957%2F&show_text=false",
  },
  {
    title: "Meet the Teenage Girl Who Wants to Be a Boy Scout",
    publication: "NPR — Weekend Edition Saturday",
    date: "2017-04-29",
    excerpt: "An NPR Weekend Edition Saturday interview with Sydney about her years-long push to join the Boy Scouts and earn the rank of Eagle Scout.",
    link: "https://www.npr.org/2017/04/29/526021195/meet-the-teenage-girl-who-wants-to-be-a-boy-scout",
    embedType: "audio",
    embedUrl: "https://www.npr.org/player/embed/526021195/526158055?byline=false&cover=false",
  },
  {
    title: "I'm a Woman and I Want to Be an Eagle Scout",
    publication: "Outside",
    date: "2018-09-26",
    excerpt: "Argues that the Boy Scouts of America should let girls begin earning the Eagle Scout rank immediately, rather than waiting until February 2019, so young women who fought for inclusion aren't aged out of the opportunity.",
    link: "https://www.outsideonline.com/culture/opinion/let-me-become-eagle-scout/?scope=anon",
  },
  {
    title: "Scouts BSA Should Let Me Join Now — I and Other Young Women Deserve It",
    publication: "USA Today",
    date: "2018-05-09",
    excerpt: "Makes the case that Scouts BSA should open full membership to girls without delay, so those who have long participated informally can finally earn recognition alongside their peers.",
    link: "https://www.usatoday.com/story/opinion/2018/05/09/boy-scouts-bsa-women-girls-2019-column/590591002/",
  },
  {
    title: "I'm a Girl. I've Been Part of the Boy Scouts for Years. It's Time I Become a Member.",
    publication: "The Washington Post",
    date: "2017-08-25",
    excerpt: "Recounts years of unofficially participating in Boy Scout Troop 414 and argues it's time the organization formally welcomes girls as members.",
    link: "https://www.washingtonpost.com/opinions/im-a-girl-ive-been-part-of-the-boy-scouts-for-years-its-time-i-become-a-member/2017/08/25/a6d61ea8-89c1-11e7-961d-2f373b3977ee_story.html",
  },
];

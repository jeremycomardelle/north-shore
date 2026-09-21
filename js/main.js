/**
 * North Shore Custom Rifles — site behavior.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Sticky header shadow/blur on scroll.
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle.
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.style.display === "flex";
    navLinks.style.display = open ? "none" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.alignItems = "flex-start";
    navLinks.style.position = "absolute";
    navLinks.style.top = "100%";
    navLinks.style.right = "0";
    navLinks.style.left = "auto";
    navLinks.style.width = "min(55vw, 190px)";
    navLinks.style.background = "rgba(11,14,11,0.97)";
    navLinks.style.padding = "20px 24px";
    navLinks.style.gap = "18px";
    navLinks.style.textAlign = "left";
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (window.innerWidth <= 720) navLinks.style.display = "none";
    })
  );

  // Scroll-reveal animations.
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Photo sections: shuffle each section on load, show two rows, expand with More / Less.
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  // Photo sections: build tiles from js/gallery-data.js (generated from the photo folders).
  const galleryData = window.GALLERY_DATA || {};
  const sections = [];
  document.querySelectorAll("[data-gallery]").forEach((grid) => {
    const photos = galleryData[grid.dataset.gallery] || [];
    const label = document.querySelector('[data-cat-for="' + grid.dataset.gallery + '"]');
    if (!photos.length) {
      grid.hidden = true;
      if (label) label.hidden = true;
      return;
    }
    const items = photos.map((p) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item" + (p.rotate === 180 ? " gi-flip" : "");
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || grid.dataset.alt || "";
      img.loading = "lazy";
      fig.appendChild(img);
      if (p.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = p.caption;
        fig.appendChild(cap);
      }
      return fig;
    });
    sections.push({ items, grid });
  });
  sections.forEach((s) => {
    shuffle(s.items).forEach((el) => s.grid.appendChild(el));
    s.expanded = false;
    s.btn = document.createElement("button");
    s.btn.type = "button";
    s.btn.className = "btn btn-ghost more-btn";
    s.btn.addEventListener("click", () => { s.expanded = !s.expanded; layout(s); });
    const wrap = document.createElement("div");
    wrap.className = "more-wrap";
    wrap.appendChild(s.btn);
    s.grid.after(wrap);
    s.wrap = wrap;
  });
  function layout(s) {
    const cols = getComputedStyle(s.grid).gridTemplateColumns.split(" ").length;
    const limit = cols * 2;
    const needsToggle = s.items.length > limit;
    s.items.forEach((el, i) => el.classList.toggle("is-extra", needsToggle && !s.expanded && i >= limit));
    s.wrap.hidden = !needsToggle;
    s.btn.textContent = s.expanded ? "Less" : "More";
    s.btn.setAttribute("aria-expanded", String(s.expanded));
  }
  const layoutAll = () => sections.forEach(layout);
  layoutAll();
  window.addEventListener("resize", layoutAll);

  // Photo lightbox: click any tile to view the full photo over a blurred page.
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCap");
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    const open = () => {
      const img = item.querySelector("img");
      const cap = item.querySelector("figcaption");
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbImg.classList.toggle("is-flipped", item.classList.contains("gi-flip"));
      lbCap.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    };
    item.addEventListener("click", open);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

});

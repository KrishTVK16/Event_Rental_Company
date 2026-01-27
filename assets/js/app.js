window.ER = window.ER || {};

ER.storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }
};

ER.formatMoney = function (value) {
  const n = Number(value || 0);
  return new Intl.NumberFormat(undefined, { style: "currency", currency: ER.currency || "USD" }).format(n);
};

ER.getAvailability = function (dateStr, itemId) {
  if (!dateStr) return null;
  const booked = (ER.bookings[dateStr] && ER.bookings[dateStr][itemId]) ? ER.bookings[dateStr][itemId] : 0;
  const maintenance = ER.maintenance && ER.maintenance[itemId] ? ER.maintenance[itemId] : 0;
  const item = ER.inventory.find(x => x.id === itemId);
  if (!item) return null;
  const available = Math.max(0, item.stock - booked - maintenance);
  return { stock: item.stock, booked, maintenance, available };
};

ER.initThemeAndRtl = function () {
  const theme = ER.storage.get("er_theme", "light");
  const dir = ER.storage.get("er_dir", "ltr");

  document.documentElement.setAttribute("data-bs-theme", theme);
  document.documentElement.setAttribute("dir", dir);

  const ltr = document.getElementById("bsLtr");
  const rtl = document.getElementById("bsRtl");
  if (ltr && rtl) {
    const isRtl = dir === "rtl";
    ltr.disabled = isRtl;
    rtl.disabled = !isRtl;
  }

  const themeBtn = document.querySelectorAll("[data-er-toggle='theme']");
  const rtlBtn = document.querySelectorAll("[data-er-toggle='rtl']");

  themeBtn.forEach(btn => {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-bs-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-bs-theme", next);
      ER.storage.set("er_theme", next);
      themeBtn.forEach(b => b.setAttribute("aria-pressed", next === "dark" ? "true" : "false"));
    });
  });

  rtlBtn.forEach(btn => {
    btn.setAttribute("aria-pressed", dir === "rtl" ? "true" : "false");
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("dir") || "ltr";
      const next = current === "rtl" ? "ltr" : "rtl";
      document.documentElement.setAttribute("dir", next);
      ER.storage.set("er_dir", next);
      if (ltr && rtl) {
        const isRtl = next === "rtl";
        ltr.disabled = isRtl;
        rtl.disabled = !isRtl;
      }
      rtlBtn.forEach(b => b.setAttribute("aria-pressed", next === "rtl" ? "true" : "false"));
    });
  });

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const onScroll = () => {
      backToTop.style.display = window.scrollY > 400 ? "inline-flex" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
};

ER.initMotion = function () {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.body.classList.add("er-loaded");
  if (reduceMotion) return;

  const autoRevealSelectors = [
    ".section",
    ".card-soft",
    ".kpi",
    ".hero .card",
    ".hero .kpi",
    ".accordion",
    ".table",
    ".admin-topbar",
    ".admin-sidebar"
  ];

  autoRevealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!el.hasAttribute("data-er-reveal")) el.setAttribute("data-er-reveal", "");
    });
  });

  const revealEls = Array.from(document.querySelectorAll("[data-er-reveal]"));
  if (!revealEls.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-revealed");
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
};

ER.initCounters = function () {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const counterEls = Array.from(document.querySelectorAll(".kpi .value"));
  if (!counterEls.length) return;

  const parseValue = (text) => {
    const t = String(text).trim();
    const hasPlus = t.includes("+");
    const cleaned = t.replace(/[^0-9.]/g, "");
    const n = cleaned ? Number(cleaned) : NaN;
    if (!Number.isFinite(n)) return null;
    const decimals = (cleaned.split(".")[1] || "").length;
    return { n, decimals, hasPlus };
  };

  const animate = (el, meta) => {
    if (el.dataset.erCounted === "1") return;
    el.dataset.erCounted = "1";

    const start = 0;
    const end = meta.n;
    const duration = Math.min(1400, Math.max(700, end * 6));
    const t0 = performance.now();

    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (end - start) * eased;
      const out = meta.decimals ? v.toFixed(meta.decimals) : Math.round(v).toString();
      el.textContent = meta.hasPlus ? `${out}+` : out;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const entries = counterEls
    .map((el) => ({ el, meta: parseValue(el.textContent) }))
    .filter((x) => x.meta);

  if (!entries.length) return;

  const counterObserver = new IntersectionObserver(
    (obsEntries, obs) => {
      obsEntries.forEach((e) => {
        if (!e.isIntersecting) return;
        const found = entries.find((x) => x.el === e.target);
        if (found) animate(found.el, found.meta);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.35 }
  );

  entries.forEach((x) => counterObserver.observe(x.el));
};

ER.enhanceLayout = function () {
  const main = document.querySelector("main");
  if (main) {
    const sections = Array.from(main.querySelectorAll(":scope > .section"));
    sections.forEach((sec, i) => {
      if (i % 2 === 1) sec.classList.add("section-alt");
    });
  }

  document.querySelectorAll(".card-soft ul").forEach((ul) => {
    if (ul.classList.contains("ui-list")) return;
    ul.classList.add("ui-list");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  ER.initThemeAndRtl();
  ER.enhanceLayout();
  ER.initMotion();
  ER.initCounters();
});

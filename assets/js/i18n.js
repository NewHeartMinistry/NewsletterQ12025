"use strict";
(() => {
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en", "ko", "he", "th", "vi"];
  const DIR_MAP = { he: "rtl" };

  const state = {
    lang: localStorage.getItem("lang") || DEFAULT_LANG,
    dict: {},
  };

  const $ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  async function loadDict(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try {
      const res = await fetch(`/i18n/${lang}.json`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
      state.dict = await res.json();
    } catch (err) {
      console.warn(`Falling back to English: ${err}`);
      const res = await fetch(`/i18n/en.json`, { cache: "no-store" });
      state.dict = await res.json();
      lang = DEFAULT_LANG;
    }
    state.lang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = DIR_MAP[lang] || "ltr";
  }

  function t(key) {
    const parts = key.split(".");
    let node = state.dict;
    for (const p of parts) node = node?.[p];
    if (node == null && state.lang !== DEFAULT_LANG) {
      // fallback to English
      try {
        const en = window.__i18n?.fallbackEn || {};
        let temp = en;
        for (const p of parts) temp = temp?.[p];
        return temp != null ? String(temp) : null;
      } catch {}
    }
    return node == null ? null : String(node);
  }

  function applyI18n(root = document) {
    // Simple replacement
    $('[data-i18n]', root).forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val != null) {
        if (/^<.+>/.test(val.trim())) el.innerHTML = val;
        else el.textContent = val;
      }
    });

    // Placeholders
    $('[data-i18n-placeholder]', root).forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = t(key);
      if (val != null) el.setAttribute("placeholder", val);
    });

    // Scoped (e.g., stories.ariel.blurb)
    $('[data-i18n-scope]', root).forEach(scopeEl => {
      const base = scopeEl.getAttribute("data-i18n-scope");
      $('[data-i18n]', scopeEl).forEach(el => {
        const sub = el.getAttribute("data-i18n");
        const val = t(`${base}.${sub}`) ?? t(sub);
        if (val != null) el.textContent = val;
      });
    });

    // Toggle pressed state on buttons
    $('[data-lang]').forEach(btn =>
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === state.lang))
    );
  }

  async function setLanguage(lang) {
    await loadDict(lang);
    applyI18n();
    document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
  }

  document.addEventListener("DOMContentLoaded", async () => {
    // Preload English dictionary for fallback
    try {
      const res = await fetch(`/i18n/en.json`, { cache: "no-store" });
      window.__i18n = window.__i18n || {};
      window.__i18n.fallbackEn = await res.json();
    } catch {}

    // Load user-selected or default language
    try {
      await setLanguage(state.lang);
    } catch (e) {
      console.error("i18n init failed", e);
    }

    // Click handler for language buttons
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;
      e.preventDefault();
      setLanguage(btn.dataset.lang);
    });
  });

  window.__i18n = {
    t,
    setLanguage,
    get lang() { return state.lang; }
  };
})();

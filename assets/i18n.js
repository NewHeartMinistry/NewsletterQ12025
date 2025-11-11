"use strict";
(() => {
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en","ko","he","th","vi"];
  const DIR_MAP = { he: "rtl" };

  const state = { lang: localStorage.getItem("lang") || DEFAULT_LANG, dict: {} };
  const $ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  async function loadDict(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    const res = await fetch(`i18n/${lang}.json`, { cache: "no-store" });
    state.dict = await res.json();
    state.lang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = DIR_MAP[lang] || "ltr";
  }
  function t(key){
    const parts = key.split(".");
    let node = state.dict;
    for (const p of parts) node = node?.[p];
    return node == null ? null : String(node);
  }
  function applyI18n(root=document){
    $('[data-i18n]', root).forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val != null) {
        if (/^<.+>/.test(val.trim())) { el.innerHTML = val; }
        else { el.textContent = val; }
      }
    });
    $('[data-i18n-placeholder]', root).forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val != null) el.setAttribute('placeholder', val);
    });
    $('[data-lang]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.lang === state.lang)));
  }
  async function setLanguage(lang){ await loadDict(lang); applyI18n(); document.dispatchEvent(new CustomEvent('i18n:changed', { detail:{ lang } })); }

  document.addEventListener('DOMContentLoaded', async () => {
    try{ await setLanguage(state.lang); }catch(e){ console.error('i18n init failed', e); }
    document.body.addEventListener('click', (e)=>{
      const btn = e.target.closest('[data-lang]'); if (!btn) return;
      e.preventDefault(); setLanguage(btn.dataset.lang);
    });
  });

  window.__i18n = { t, setLanguage, get lang(){ return state.lang; } };
})();
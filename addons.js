"use strict";
(() => {
  const themeKey='theme';
  const prefersDark = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme(mode){
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(themeKey, mode);
    document.getElementById('themeToggle')?.setAttribute('aria-pressed', String(mode==='dark'));
  }
  function initTheme(){
    const saved = localStorage.getItem(themeKey);
    applyTheme(saved || (prefersDark.matches ? 'dark' : 'light'));
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    initTheme();
    document.getElementById('themeToggle')?.addEventListener('click', ()=>{
      const current = document.documentElement.dataset.theme || 'light';
      applyTheme(current==='light' ? 'dark' : 'light');
    });
    document.getElementById('printBtn')?.addEventListener('click', ()=>window.print());
    document.getElementById('shareBtn')?.addEventListener('click', async ()=>{
      const url = location.href;
      if (navigator.share){ try{ await navigator.share({ title: document.title, url }); return; }catch(e){} }
      try{ await navigator.clipboard.writeText(url); alert('Link copied'); }catch(e){ prompt('Copy link', url); }
    });
  });
})();
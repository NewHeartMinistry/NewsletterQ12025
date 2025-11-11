function setLanguage(l){
 fetch("i18n/"+l+".json")
  .then(r=>r.json())
  .then(t=>{
    for(const k in t){
      let el=document.querySelector(`[data-i18n="${k}"]`);
      if(el) el.innerHTML=t[k];
    }
  });
}
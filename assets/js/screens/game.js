export async function mount({root,state,versions}) {
  const cssUrl='assets/css/board-2d.css?v='+encodeURIComponent(versions.boardCss||'0');
  if(!document.querySelector('[data-board-css]')) {
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl;link.dataset.boardCss='true';document.head.append(link);
  }
  const boardModule=await import('../board-2d.js?v='+encodeURIComponent(versions.boardJs||'0'));
  const size=state.variant==='international-10'?10:8;
  boardModule.renderInitialBoard(root.querySelector('#board-2d'),size);
  root.querySelector('#game-title').textContent=size===10?'Mezinárodní dáma 10×10':'Česká dáma 8×8';
  root.querySelector('#game-mode-label').textContent=state.opponent==='ai'?'AI – '+({easy:'Lehká',medium:'Střední',hard:'Těžká'}[state.difficulty]||'Lehká'):'2 hráči';
  root.querySelector('.board-caption').textContent=size===10
    ?'Testovací náhled desky 10×10. Pravidla a herní tahy této varianty zatím nejsou implementovány.'
    :'Základní náhled desky. Herní tahy a pravidla budou doplněny v další etapě.';
}

export async function mount({root,state,versions}) {
  const cssUrl='assets/css/board-2d.css?v='+encodeURIComponent(versions.boardCss||'0');
  if(!document.querySelector('[data-board-css]')) {
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl;link.dataset.boardCss='true';document.head.append(link);
  }
  const boardModule=await import('../board-2d.js?v='+encodeURIComponent(versions.boardJs||'0'));
  boardModule.renderInitialBoard(root.querySelector('#board-2d'));
  const label=state.opponent==='ai'?'AI – '+({easy:'Lehká',medium:'Střední',hard:'Těžká'}[state.difficulty]||'Lehká'):'2 hráči';
  root.querySelector('#game-mode-label').textContent=label;
}
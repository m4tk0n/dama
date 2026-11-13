export async function mount({root,state,versions}) {
 const cssUrl='assets/css/board-2d.css?v='+encodeURIComponent(versions.boardCss||'0');
 if(!document.querySelector('[data-board-css]')){
  const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl;link.dataset.boardCss='true';document.head.append(link);
 }
 const boardModule=await import('../board-2d.js?v='+encodeURIComponent(versions.boardJs||'0'));
 const size=state.variant==='international-10'?10:8;
 const title=root.querySelector('#game-title');
 const mode=root.querySelector('#game-mode-label');
 const status=root.querySelector('#game-status');
 const hint=root.querySelector('#game-hint');
 const caption=root.querySelector('#game-caption');
 const board=root.querySelector('#board-2d');
 if(size===10){
  boardModule.renderInitialBoard(board,10);
  title.textContent='Mezinárodní dáma 10×10';
  mode.textContent='Test zobrazení';
  root.querySelector('.turn-panel').hidden=true;
  root.querySelector('.game-actions').hidden=true;
  caption.textContent='Testovací náhled desky 10×10. Pravidla a pohyb figurek této varianty zatím nejsou implementovány.';
  return;
 }
 const engine=await import('../game-engine.js?v='+encodeURIComponent(versions.gameEngine||'0'));
 title.textContent='Česká dáma 8×8';
 mode.textContent=state.opponent==='ai'?'AI – ruční test':'2 hráči';
 let game=engine.createInitialState();
 let selected=null;
 let message='Vyberte svou figurku.';

 function playerName(player){
  return player==='white'?'Hráč 1 (bílé)':'Hráč 2 (černé)';
 }
 function render(){
  const available=game.pending?engine.getLegalMoves(game):selected===null?[]:engine.getLegalMovesForPiece(game,selected);
  boardModule.renderGameBoard(board,game,selected,available);
  if(game.gameOver){
   status.textContent='Konec hry – vyhrál '+playerName(game.winner);
   hint.textContent='Soupeř nemá žádné figurky ani legální tah.';
  }else if(game.pending){
   status.textContent=playerName(game.currentPlayer)+' – pokračujte v braní';
   hint.textContent='Stejná figurka musí dokončit všechny další možné skoky.';
  }else{
   status.textContent='Na tahu: '+playerName(game.currentPlayer);
   hint.textContent=message;
  }
 }
 function selectPiece(index){
  const moves=engine.getLegalMovesForPiece(game,index);
  if(!moves.length){
   selected=null;
   message='Tato figurka nemá povolený tah. Pokud je možné brát, musíte vybrat figurku, která bere.';
  }else{
   selected=index;
   message=moves.some(move=>move.captured!==null)?'Vyberte políčko za soupeřovou figurkou. Braní je povinné.':'Vyberte zvýrazněné cílové políčko.';
  }
  render();
 }
 board.addEventListener('click',event=>{
  const cell=event.target.closest('[data-cell-index]');
  if(!cell||game.gameOver)return;
  const index=Number(cell.dataset.cellIndex);
  if(!Number.isInteger(index))return;
  const source=game.pending?game.pending.pieceIndex:selected;
  if(source!==null){
   const move=engine.getLegalMoves(game).find(item=>item.from===source&&item.to===index);
   if(move){
    const sourcePiece=board.querySelector('[data-cell-index="'+move.from+'"] .board-piece');
    const sourceRect=sourcePiece?.getBoundingClientRect();
    const result=engine.playMove(game,move);
    if(result.ok){
     selected=game.pending?game.pending.pieceIndex:null;
     message=game.pending?'Pokračujte v braní stejnou figurkou.':'Tah dokončen.';
     render();
     if(sourceRect){
      const destinationPiece=board.querySelector('[data-cell-index="'+move.to+'"] .board-piece');
      const destinationRect=destinationPiece?.getBoundingClientRect();
      if(destinationPiece&&destinationRect){
       destinationPiece.style.transition='none';
       destinationPiece.style.transform='translate('+(sourceRect.left-destinationRect.left)+'px,'+(sourceRect.top-destinationRect.top)+'px)';
       destinationPiece.getBoundingClientRect();
       requestAnimationFrame(()=>{
        destinationPiece.style.transition='';
        destinationPiece.style.transform='';
       });
      }
     }
    }
    return;
   }
  }
  if(game.pending)return;
  const piece=game.board[index];
  if(piece?.player===game.currentPlayer){
   if(selected===index){selected=null;message='Výběr figurky zrušen.';render();}
   else selectPiece(index);
  }else if(selected!==null){
   message='Toto políčko není povolený cíl. Vyberte jedno ze zvýrazněných políček.';
   render();
  }
 });
 root.querySelector('#restart-game').addEventListener('click',()=>{
  game=engine.createInitialState();selected=null;message='Vyberte svou figurku.';render();
 });
 if(state.opponent==='ai')message='AI zatím není zapojená; prozatím můžete ovládat obě barvy.';
 render();
}

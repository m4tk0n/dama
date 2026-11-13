export async function mount({root,state,versions}) {
 const variant=state.variant||'czech-8';
 const names={classic:'Klasická dáma',giveaway:'Žravá dáma','czech-8':'Česká dáma podle ČFD','czech-zapletal':'Česká dáma dle Zapletala','international-10':'Mezinárodní dáma'};
 const title=root.querySelector('#game-title'),mode=root.querySelector('#game-mode-label');
 const status=root.querySelector('#game-status'),hint=root.querySelector('#game-hint');
 const caption=root.querySelector('#game-caption'),board=root.querySelector('#board-2d');
 const boardWrap=root.querySelector('.board-wrap'),turnPanel=root.querySelector('.turn-panel'),actions=root.querySelector('.game-actions');
 const supported=['classic','giveaway','czech-8','czech-zapletal'];
 title.textContent=names[variant]||'Neznámá varianta';
 if(variant==='international-10'){
  const css=document.createElement('link');css.rel='stylesheet';css.href='assets/css/board-2d.css?v='+encodeURIComponent(versions.boardCss||'0');css.dataset.boardCss='true';document.head.append(css);
  const renderer=await import('../board-2d.js?v='+encodeURIComponent(versions.boardJs||'0'));
  renderer.renderInitialBoard(board,10);mode.textContent='Test zobrazení';turnPanel.hidden=true;actions.hidden=true;
  caption.textContent='Testovací náhled desky 10×10. Pravidla a herní logika nejsou implementovány.';return;
 }
 if(!supported.includes(variant)){
  mode.textContent='Připravuje se';turnPanel.hidden=true;boardWrap.hidden=true;actions.hidden=true;
  caption.textContent='Tato varianta zatím nemá dokončený samostatný engine a pravidla. Nelze ji spustit s pravidly jiné varianty.';return;
 }
 if(!document.querySelector('[data-board-css]')){
  const link=document.createElement('link');link.rel='stylesheet';link.href='assets/css/board-2d.css?v='+encodeURIComponent(versions.boardCss||'0');link.dataset.boardCss='true';document.head.append(link);
 }
 const renderer=await import('../board-2d.js?v='+encodeURIComponent(versions.boardJs||'0'));
 const enginePaths={
  classic:'../variants/classic/engine.js',
  giveaway:'../variants/giveaway/engine.js',
  'czech-8':'../variants/czech-8/engine.js',
  'czech-zapletal':'../variants/czech-zapletal/engine.js'
 };
 const engine=await import(enginePaths[variant]+'?v='+encodeURIComponent(versions['engine_'+variant]||'1'));
 mode.textContent=state.opponent==='ai'?(variant==='czech-8'?'Proti AI':'AI není pro tuto variantu dostupná'):'2 hráči';
 let game=null,selected=null,message='Vyberte svou figurku.';
 let aiModule=null,aiThinking=false;
 const aiPlayer='black';
 function playerName(player){return player==='white'?'Bílý':'Černý'}
 function render(){
  if(!game)return;
  const available=game.pending?engine.getLegalMoves(game):selected===null?[]:engine.getLegalMovesForPiece(game,selected);
  renderer.renderGameBoard(board,game,selected,available);
  if(aiThinking){
   status.textContent='Na tahu: '+playerName(aiPlayer)+' (AI)';
   hint.textContent='Počítač vybírá tah…';
  }else if(game.gameOver){
   status.textContent=game.draw?'Partie skončila remízou.':'Konec hry – vyhrál '+playerName(game.winner)+'.';
   hint.textContent=game.draw?'Hráč na tahu nemá legální tah.':'Soupeř nemá žádné kameny.';
  }else if(game.blocked){
   status.textContent='Partie pozastavena – '+playerName(game.currentPlayer)+' nemá legální tah.';
   hint.textContent='Pravidla konce partie této varianty nejsou ve zdroji jednoznačně potvrzena; výsledek proto engine neurčuje.';
  }else if(game.pending){
   status.textContent=playerName(game.currentPlayer)+' – pokračujte v braní';
   hint.textContent='Stejná figurka musí dokončit všechny další možné skoky.';
  }else{
   status.textContent='Na tahu: '+playerName(game.currentPlayer);
   hint.textContent=message;
  }
 }
 function start(startingPlayer){
  aiThinking=false;
  game=variant==='classic'||variant==='giveaway'?engine.createInitialState({startingPlayer}):engine.createInitialState();
  selected=null;message=state.opponent==='ai'&&variant!=='czech-8'?'AI je zatím dostupná pouze pro Českou dámu podle ČFD.':'Vyberte svou figurku.';boardWrap.hidden=false;actions.hidden=false;render();
 }
 async function runAiTurn(){
  if(!aiModule||!game||game.gameOver||aiThinking||game.currentPlayer!==aiPlayer)return;
  aiThinking=true;message='AI vybírá tah.';render();
  await new Promise(resolve=>setTimeout(resolve,100));
  const plan=aiModule.chooseTurn(game,engine,state.difficulty||'medium');
  if(plan?.moves?.length){
   for(const step of plan.moves){
    if(game.gameOver||game.currentPlayer!==aiPlayer)break;
    const result=engine.playMove(game,step);
    if(!result.ok){message='AI nedokázala provést vypočítaný tah.';break;}
    selected=game.pending?game.pending.pieceIndex:null;
    message=game.pending?'AI pokračuje v braní.':'AI dokončila tah.';
    render();
    await new Promise(resolve=>setTimeout(resolve,180));
   }
  }
  aiThinking=false;render();
 }
 function chooseStartingPlayer(){
  boardWrap.hidden=true;actions.hidden=true;
  status.textContent='Zvolte začínajícího hráče';
  hint.replaceChildren();
  for(const player of ['white','black']){
   const button=document.createElement('button');button.type='button';button.className='button button-outline';button.textContent='Začíná '+playerName(player).toLowerCase();
   button.addEventListener('click',()=>start(player),{once:true});hint.append(button);
  }
  caption.textContent='Pravidla Klasické dámy neurčují, kdo začíná. Vyberte proto začínající stranu pro tuto partii.';
 }
 function selectPiece(index){
  const moves=engine.getLegalMovesForPiece(game,index);
  if(!moves.length){selected=null;message='Tato figurka nemá povolený tah. Pokud lze brát, musíte vybrat figurku, která bere.'}
  else{selected=index;message=moves.some(m=>m.captured!==null)?'Vyberte cílové políčko braní. Braní je povinné.':'Vyberte zvýrazněné cílové políčko.'}
  render();
 }
 board.addEventListener('click',event=>{
  if(!game||game.gameOver||game.blocked||aiThinking||(state.opponent==='ai'&&variant==='czech-8'&&game.currentPlayer===aiPlayer))return;
  const cell=event.target.closest('[data-cell-index]');if(!cell)return;
  const index=Number(cell.dataset.cellIndex);if(!Number.isInteger(index))return;
  const source=game.pending?game.pending.pieceIndex:selected;
  if(source!==null){
   const move=engine.getLegalMoves(game).find(m=>m.from===source&&m.to===index);
   if(move){
    const sourcePiece=board.querySelector('[data-cell-index="'+move.from+'"] .board-piece'),sourceRect=sourcePiece?.getBoundingClientRect();
    const result=engine.playMove(game,move);
    if(result.ok){
     selected=game.pending?game.pending.pieceIndex:null;message=game.pending?'Pokračujte v braní stejnou figurkou.':'Tah dokončen.';render();
     if(sourceRect){
      const destinationPiece=board.querySelector('[data-cell-index="'+move.to+'"] .board-piece'),rect=destinationPiece?.getBoundingClientRect();
      if(destinationPiece&&rect){destinationPiece.style.transition='none';destinationPiece.style.transform='translate('+(sourceRect.left-rect.left)+'px,'+(sourceRect.top-rect.top)+'px)';destinationPiece.getBoundingClientRect();requestAnimationFrame(()=>{destinationPiece.style.transition='';destinationPiece.style.transform='';})}
     }
     if(result.turnFinished&&state.opponent==='ai'&&variant==='czech-8'&&game.currentPlayer===aiPlayer)void runAiTurn();
    }
    return;
   }
  }
  if(game.pending)return;
  const piece=game.board[index];
  if(piece?.player===game.currentPlayer){if(selected===index){selected=null;message='Výběr figurky zrušen.';render()}else selectPiece(index)}
  else if(selected!==null){message='Toto políčko není povolený cíl.';render()}
 });
 root.querySelector('#restart-game').addEventListener('click',()=>{
  if(variant==='classic'||variant==='giveaway')chooseStartingPlayer();else start();
 });
 if(state.opponent==='ai'&&variant==='czech-8')aiModule=await import('../variants/czech-8/ai.js?v='+encodeURIComponent(versions['ai_czech-8']||'1'));
 if(variant==='classic'||variant==='giveaway')chooseStartingPlayer();else start();
}

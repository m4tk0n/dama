const SIZE=8;
const DIRECTIONS=[[-1,-1],[-1,1],[1,-1],[1,1]];
const inside=(r,c)=>r>=0&&r<SIZE&&c>=0&&c<SIZE;
const at=(r,c)=>r*SIZE+c;
const coords=i=>[Math.floor(i/SIZE),i%SIZE];
const forward=player=>player==='white'?1:-1;
const opponent=player=>player==='white'?'black':'white';
const crownRow=player=>player==='white'?7:0;

export function createInitialState(){
 const board=Array(SIZE*SIZE).fill(null);
 for(let r=0;r<3;r++)for(let c=0;c<SIZE;c++)if((r+c)%2===1)board[at(r,c)]={player:'white',king:false};
 for(let r=5;r<8;r++)for(let c=0;c<SIZE;c++)if((r+c)%2===1)board[at(r,c)]={player:'black',king:false};
 return {size:SIZE,board,currentPlayer:'white',selected:null,pending:null,gameOver:false,winner:null,lastMove:null};
}

function captureOptions(board,index,captured=[]){
 const piece=board[index];if(!piece)return [];
 const [r,c]=coords(index),blocked=new Set(captured),result=[];
 const directions=piece.king?DIRECTIONS:DIRECTIONS.filter(([dr])=>dr===forward(piece.player));
 for(const [dr,dc] of directions){
  let nr=r+dr,nc=c+dc;
  if(!piece.king){
   if(!inside(nr,nc))continue;
   const victimIndex=at(nr,nc),victim=board[victimIndex];
   const lr=nr+dr,lc=nc+dc;
   if(victim&&victim.player!==piece.player&&!blocked.has(victimIndex)&&inside(lr,lc)&&!board[at(lr,lc)])result.push({from:index,to:at(lr,lc),captured:victimIndex});
   continue;
  }
  while(inside(nr,nc)&&!board[at(nr,nc)]){nr+=dr;nc+=dc}
  if(!inside(nr,nc))continue;
  const victimIndex=at(nr,nc),victim=board[victimIndex];
  if(!victim||victim.player===piece.player||blocked.has(victimIndex))continue;
  nr+=dr;nc+=dc;
  while(inside(nr,nc)&&!board[at(nr,nc)]){
   result.push({from:index,to:at(nr,nc),captured:victimIndex});
   nr+=dr;nc+=dc;
  }
 }
 return result;
}

function capturesForPlayer(board,player){
 const found=[];
 for(let i=0;i<board.length;i++){
  const piece=board[i];if(piece?.player===player)found.push(...captureOptions(board,i));
 }
 const queenCanCapture=found.some(move=>board[move.from]?.king);
 return queenCanCapture?found.filter(move=>board[move.from]?.king):found;
}

function simpleMoves(board,index){
 const piece=board[index];if(!piece)return [];
 const [r,c]=coords(index),moves=[];
 if(piece.king){
  for(const [dr,dc] of DIRECTIONS){
   let nr=r+dr,nc=c+dc;
   while(inside(nr,nc)&&!board[at(nr,nc)]){
    moves.push({from:index,to:at(nr,nc),captured:null});nr+=dr;nc+=dc;
   }
  }
 }else{
  const dr=forward(piece.player);
  for(const dc of [-1,1]){
   const nr=r+dr,nc=c+dc;
   if(inside(nr,nc)&&!board[at(nr,nc)])moves.push({from:index,to:at(nr,nc),captured:null});
  }
 }
 return moves;
}

export function getLegalMoves(state){
 if(state.gameOver)return [];
 if(state.pending)return captureOptions(state.board,state.pending.pieceIndex,state.pending.captured);
 const captures=capturesForPlayer(state.board,state.currentPlayer);
 if(captures.length)return captures;
 const moves=[];
 for(let i=0;i<state.board.length;i++)if(state.board[i]?.player===state.currentPlayer)moves.push(...simpleMoves(state.board,i));
 return moves;
}

export function getLegalMovesForPiece(state,index){
 return getLegalMoves(state).filter(move=>move.from===index);
}

function finishTurn(state,from,to,captured){
 const piece=state.board[to];
 if(piece&&!piece.king&&coords(to)[0]===crownRow(piece.player))piece.king=true;
 state.pending=null;state.selected=null;state.lastMove={from,to,captured:[...captured]};
 state.currentPlayer=opponent(state.currentPlayer);
 const remaining=state.board.some(item=>item?.player===state.currentPlayer);
 if(!remaining||getLegalMoves({...state,gameOver:false}).length===0){
  state.gameOver=true;state.winner=opponent(state.currentPlayer);
 }
 return state;
}

export function playMove(state,move){
 if(state.gameOver)return {ok:false,state,reason:'Partie již skončila.'};
 const legal=getLegalMoves(state).find(item=>item.from===move.from&&item.to===move.to);
 if(!legal)return {ok:false,state,reason:'Tento tah není povolený.'};
 const piece=state.board[legal.from];
 state.board[legal.from]=null;state.board[legal.to]=piece;
 let captured=state.pending?[...state.pending.captured]:[];
 if(legal.captured!==null)captured.push(legal.captured);
 if(legal.captured!==null){
  const next=captureOptions(state.board,legal.to,captured);
  if(next.length){
   state.pending={pieceIndex:legal.to,captured};
   state.selected=legal.to;
   state.lastMove={from:legal.from,to:legal.to,captured:[...captured],continuing:true};
   return {ok:true,state,turnFinished:false};
  }
 }
 if(captured.length)for(const index of captured)state.board[index]=null;
 finishTurn(state,legal.from,legal.to,captured);
 return {ok:true,state,turnFinished:true};
}

export function getPieceCounts(state){
 return {white:state.board.filter(piece=>piece?.player==='white').length,black:state.board.filter(piece=>piece?.player==='black').length};
}

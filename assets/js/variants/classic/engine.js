import * as setup from './setup.js';
const SIZE=8,DIRECTIONS=[[-1,-1],[-1,1],[1,-1],[1,1]];
const inside=(r,c)=>r>=0&&r<SIZE&&c>=0&&c<SIZE;
const at=(r,c)=>r*SIZE+c,coords=i=>[Math.floor(i/SIZE),i%SIZE];
const forward=p=>p==='white'?1:-1,opponent=p=>p==='white'?'black':'white';
const crownRow=p=>p==='white'?SIZE-1:0;
export function createInitialState(options={}){
 const startingPlayer=options.startingPlayer;
 if(startingPlayer!=='white'&&startingPlayer!=='black')throw new Error('Klasická dáma vyžaduje volbu začínající strany.');
 return {variant:'classic',rulesVersion:setup.rulesVersion,size:SIZE,board:setup.createInitialBoard(),currentPlayer:startingPlayer,selected:null,pending:null,gameOver:false,winner:null,draw:false,lastMove:null};
}
function capturesAt(board,index){
 const piece=board[index];if(!piece)return [];
 const [r,c]=coords(index),moves=[],dirs=piece.king?DIRECTIONS:DIRECTIONS.filter(([dr])=>dr===forward(piece.player));
 for(const [dr,dc] of dirs){
  let nr=r+dr,nc=c+dc;
  if(piece.king){while(inside(nr,nc)&&!board[at(nr,nc)]){nr+=dr;nc+=dc}}
  else if(inside(nr,nc)&&!board[at(nr,nc)])continue;
  if(!inside(nr,nc))continue;
  const victim=board[at(nr,nc)];
  if(!victim||victim.player===piece.player)continue;
  nr+=dr;nc+=dc;
  while(inside(nr,nc)&&!board[at(nr,nc)]){
   moves.push({from:index,to:at(nr,nc),captured:at(nr-dr,nc-dc)});
   if(!piece.king)break;
   nr+=dr;nc+=dc;
  }
 }
 return moves;
}
function allCaptures(board,player){
 const moves=[];for(let i=0;i<board.length;i++)if(board[i]?.player===player)moves.push(...capturesAt(board,i));
 return moves.some(m=>board[m.from]?.king)?moves.filter(m=>board[m.from]?.king):moves;
}
function quietMoves(board,index){
 const p=board[index];if(!p)return [];
 const [r,c]=coords(index),out=[],dirs=p.king?DIRECTIONS:DIRECTIONS.filter(([dr])=>dr===forward(p.player));
 for(const [dr,dc] of dirs){let nr=r+dr,nc=c+dc;while(inside(nr,nc)&&!board[at(nr,nc)]){out.push({from:index,to:at(nr,nc),captured:null});if(!p.king)break;nr+=dr;nc+=dc}}
 return out;
}
export function getLegalMoves(state){
 if(state.gameOver)return [];
 if(state.pending)return capturesAt(state.board,state.pending.pieceIndex);
 const captures=allCaptures(state.board,state.currentPlayer);if(captures.length)return captures;
 const moves=[];for(let i=0;i<state.board.length;i++)if(state.board[i]?.player===state.currentPlayer)moves.push(...quietMoves(state.board,i));return moves;
}
export function getLegalMovesForPiece(state,index){return getLegalMoves(state).filter(m=>m.from===index)}
function finish(state,from,to,captured){
 const p=state.board[to];if(p&&!p.king&&coords(to)[0]===crownRow(p.player))p.king=true;
 state.pending=null;state.selected=null;state.lastMove={from,to,captured:[...captured]};state.currentPlayer=opponent(state.currentPlayer);
 const count=state.board.some(p=>p?.player===state.currentPlayer);
 if(!count){state.gameOver=true;state.winner='classic'==='giveaway'?state.currentPlayer:opponent(state.currentPlayer)}
 else if(getLegalMoves({...state,gameOver:false}).length===0){state.gameOver=true;state.draw=true;state.winner=null}
}
export function playMove(state,move){
 if(state.gameOver)return {ok:false,state,reason:'Partie již skončila.'};
 const legal=getLegalMoves(state).find(m=>m.from===move.from&&m.to===move.to);if(!legal)return {ok:false,state,reason:'Tento tah není povolený.'};
 const p=state.board[legal.from];state.board[legal.from]=null;state.board[legal.to]=p;
 const captured=state.pending?[...state.pending.captured]:[];
 if(legal.captured!==null){captured.push(legal.captured);state.board[legal.captured]=null;const next=capturesAt(state.board,legal.to);if(next.length){state.pending={pieceIndex:legal.to,captured};state.selected=legal.to;state.lastMove={from:legal.from,to:legal.to,captured:[...captured],continuing:true};return {ok:true,state,turnFinished:false}}}
 finish(state,legal.from,legal.to,captured);return {ok:true,state,turnFinished:true};
}
export function getPieceCounts(state){return {white:state.board.filter(p=>p?.player==='white').length,black:state.board.filter(p=>p?.player==='black').length}}

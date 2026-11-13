const CONFIG={easy:{depth:1,nodes:2500},medium:{depth:2,nodes:7000},hard:{depth:3,nodes:16000}};
const opponent=player=>player==='white'?'black':'white';
function cloneState(state){
 return {...state,board:state.board.map(piece=>piece?{...piece}:null),pending:state.pending?{...state.pending,captured:[...state.pending.captured]}:null,lastMove:state.lastMove?{...state.lastMove,captured:[...(state.lastMove.captured||[])]}:null};
}
function completedTurns(state,engine){
 const turns=[];
 function visit(position,path){
  for(const move of engine.getLegalMoves(position)){
   const next=cloneState(position),result=engine.playMove(next,move);
   if(!result.ok)continue;
   const sequence=[...path,{from:move.from,to:move.to}];
   if(result.turnFinished)turns.push({state:next,moves:sequence});
   else visit(next,sequence);
  }
 }
 visit(state,[]);
 return turns;
}
function evaluate(state,player,engine){
 if(state.gameOver)return state.winner===player?100000:state.winner===null?0:-100000;
 let score=0;
 for(let index=0;index<state.board.length;index++){
  const piece=state.board[index];if(!piece)continue;
  const row=Math.floor(index/state.size),col=index%state.size;
  const sign=piece.player===player?1:-1;
  const value=piece.king?350:100;
  const progress=piece.player==='white'?row:state.size-1-row;
  const center=3.5-(Math.abs(3.5-row)+Math.abs(3.5-col))/2;
  score+=sign*(value+(piece.king?0:progress*5)+center*2.5);
 }
 const currentMoves=engine.getLegalMoves(state);
 // Zapletalova pravidla zatím neurčují výsledek zablokované pozice.
 if(!currentMoves.length)return state.blocked?0:(state.currentPlayer===player?-100000:100000);
 const other=cloneState(state);other.currentPlayer=opponent(state.currentPlayer);
 const otherMoves=engine.getLegalMoves(other);
 score+=(state.currentPlayer===player?currentMoves.length-otherMoves.length:otherMoves.length-currentMoves.length)*1.25;
 return score;
}
export function chooseTurn(state,engine,difficulty='medium'){
 const config=CONFIG[difficulty]||CONFIG.medium;
 const rootPlayer=state.currentPlayer;
 let nodes=0;
 function search(position,depth,alpha,beta){
  nodes++;
  const legal=engine.getLegalMoves(position);
  if(position.gameOver||!legal.length)return evaluate(position,rootPlayer,engine);
  if(depth<=0||nodes>=config.nodes)return evaluate(position,rootPlayer,engine);
  const turns=completedTurns(position,engine);
  if(!turns.length)return evaluate(position,rootPlayer,engine);
  const maximizing=position.currentPlayer===rootPlayer;
  let best=maximizing?-Infinity:Infinity;
  for(const turn of turns){
   const value=search(turn.state,depth-1,alpha,beta);
   if(maximizing){best=Math.max(best,value);alpha=Math.max(alpha,best);}
   else{best=Math.min(best,value);beta=Math.min(beta,best);}
   if(beta<=alpha||nodes>=config.nodes)break;
  }
  return best;
 }
 const options=completedTurns(state,engine);
 if(!options.length)return {moves:[],score:evaluate(state,rootPlayer,engine),nodes};
 let best=options[0],bestScore=-Infinity,alpha=-Infinity,beta=Infinity;
 for(const option of options){
  const score=search(option.state,config.depth-1,alpha,beta);
  if(score>bestScore){bestScore=score;best=option;}
  alpha=Math.max(alpha,bestScore);
  if(nodes>=config.nodes)break;
 }
 return {moves:best.moves,score:bestScore,nodes};
}

import test from 'node:test';
import assert from 'node:assert/strict';
const {createInitialState,getLegalMoves,getLegalMovesForPiece,playMove,getPieceCounts}=await import('../assets/js/variants/czech-8/engine.js');

function emptyState(pieces,currentPlayer='white'){
 const board=Array(64).fill(null);
 for(const [row,col,player,king=false] of pieces)board[row*8+col]={player,king};
 return {size:8,board,currentPlayer,selected:null,pending:null,gameOver:false,winner:null,lastMove:null};
}
const move=(state,from,to)=>playMove(state,{from,to});

test('initial position has twelve pieces per side and white starts',()=>{
 const state=createInitialState();
 assert.deepEqual(getPieceCounts(state),{white:12,black:12});
 assert.equal(state.currentPlayer,'white');
 assert.equal(getLegalMoves(state).length,7);
});

test('men move forward only and only on empty dark squares',()=>{
 const state=emptyState([[4,3,'white'],[3,2,'black']]);
 const moves=getLegalMovesForPiece(state,35);
 assert.ok(moves.every(item=>item.captured===null));
 assert.ok(moves.every(item=>item.to!==17));
});

test('capture is mandatory and removes the captured piece after the move',()=>{
 const state=emptyState([[2,1,'white'],[3,2,'black'],[2,5,'white']]);
 const legal=getLegalMoves(state);
 assert.deepEqual(legal.map(item=>[item.from,item.to]),[[17,35]]);
 const result=move(state,17,35);
 assert.equal(result.ok,true);
 assert.equal(state.board[26],null);
 assert.equal(state.board[35].player,'white');
 assert.equal(state.currentPlayer,'black');
});

test('a multi-capture must continue with the same piece',()=>{
 const state=emptyState([[2,1,'white'],[3,2,'black'],[5,4,'black']]);
 const first=move(state,17,35);
 assert.equal(first.ok,true);
 assert.equal(first.turnFinished,false);
 assert.equal(state.currentPlayer,'white');
 assert.equal(state.pending.pieceIndex,35);
 assert.deepEqual(getLegalMoves(state).map(item=>item.to),[53]);
 const second=move(state,35,53);
 assert.equal(second.ok,true);
 assert.equal(second.turnFinished,true);
 assert.equal(state.board[26],null);
 assert.equal(state.board[44],null);
 assert.equal(state.currentPlayer,'black');
});

test('a queen has priority over a man when both can capture',()=>{
 const state=emptyState([[2,1,'white'],[3,2,'black'],[4,5,'white',true],[3,6,'black']]);
 const moves=getLegalMoves(state);
 assert.ok(moves.length>0);
 assert.ok(moves.every(item=>state.board[item.from].king));
});

test('a flying queen can move and capture over distance',()=>{
 const state=emptyState([[2,1,'white',true],[5,4,'black']]);
 const moves=getLegalMovesForPiece(state,17);
 assert.ok(moves.some(item=>item.to===53&&item.captured===44));
 assert.ok(moves.some(item=>item.to===62&&item.captured===44));
});

test('a man becomes a queen on the final row',()=>{
 const state=emptyState([[6,1,'white']]);
 const result=move(state,49,56);
 assert.equal(result.ok,true);
 assert.deepEqual(state.board[56],{player:'white',king:true});
});

test('the game ends when the opponent has no pieces left',()=>{
 const state=emptyState([[2,1,'white'],[3,2,'black']]);
 move(state,17,35);
 assert.equal(state.gameOver,true);
 assert.equal(state.winner,'white');
});

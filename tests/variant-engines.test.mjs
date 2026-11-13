import test from 'node:test';
import assert from 'node:assert/strict';
import * as classic from '../assets/js/variants/classic/engine.js';
import * as giveaway from '../assets/js/variants/giveaway/engine.js';
import * as czech from '../assets/js/variants/czech-8/engine.js';
import * as zapletal from '../assets/js/variants/czech-zapletal/engine.js';

function stateWith(engine, pieces, currentPlayer='white', options={}) {
 const state=engine.createInitialState(engine===classic||engine===giveaway?{startingPlayer:currentPlayer}:{});
 state.board=Array(64).fill(null);
 for(const [row,col,player,king=false] of pieces)state.board[row*8+col]={player,king};
 state.currentPlayer=currentPlayer;
 state.pending=null;state.gameOver=false;state.winner=null;state.draw=false;state.blocked=false;
 return state;
}
const play=(engine,state,from,to)=>engine.playMove(state,{from,to});

test('classic setup has eight pieces and requires explicit first player',()=>{
 assert.throws(()=>classic.createInitialState(),/volbu začínající strany/);
 const state=classic.createInitialState({startingPlayer:'black'});
 assert.equal(state.variant,'classic');
 assert.equal(state.currentPlayer,'black');
 assert.deepEqual(classic.getPieceCounts(state),{white:8,black:8});
});
test('classic capture is mandatory and a flying queen may land beyond a victim',()=>{
 const state=stateWith(classic,[[2,1,'white',true],[3,2,'black'],[2,5,'white']]);
 const moves=classic.getLegalMoves(state);
 assert.ok(moves.every(m=>m.from===17));
 assert.ok(moves.some(m=>m.to===35&&m.captured===26));
 assert.ok(moves.some(m=>m.to===44&&m.captured===26));
});
test('classic gives victory to the player who takes all opposing pieces',()=>{
 const state=stateWith(classic,[[2,1,'white'],[3,2,'black']]);
 const result=play(classic,state,17,35);
 assert.equal(result.ok,true);
 assert.equal(state.gameOver,true);
 assert.equal(state.winner,'white');
});
test('giveaway reverses only the winner when a player loses all pieces',()=>{
 const state=stateWith(giveaway,[[2,1,'white'],[3,2,'black']]);
 const result=play(giveaway,state,17,35);
 assert.equal(result.ok,true);
 assert.equal(state.gameOver,true);
 assert.equal(state.winner,'black');
});
test('Czech ČFD setup has twelve pieces and white starts',()=>{
 const state=czech.createInitialState();
 assert.equal(state.variant,'czech-8');
 assert.equal(state.currentPlayer,'white');
 assert.deepEqual(czech.getPieceCounts(state),{white:12,black:12});
});
test('Zapletal setup has eight pieces and black starts',()=>{
 const state=zapletal.createInitialState();
 assert.equal(state.variant,'czech-zapletal');
 assert.equal(state.currentPlayer,'black');
 assert.deepEqual(zapletal.getPieceCounts(state),{white:8,black:8});
 assert.ok(zapletal.getLegalMoves(state).some(m=>m.from===48));
});
test('Zapletal engine does not invent a winner where end-game rules are unspecified',()=>{
 const state=stateWith(zapletal,[[6,0,'black']],'black');
 const result=play(zapletal,state,48,41);
 assert.equal(result.ok,true);
 assert.equal(state.currentPlayer,'white');
 assert.equal(state.gameOver,false);
 assert.equal(state.blocked,true);
 assert.equal(state.winner,null);
});

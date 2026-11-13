import test from 'node:test';
import assert from 'node:assert/strict';
import * as engine from '../assets/js/variants/czech-8/engine.js';
import * as zapletal from '../assets/js/variants/czech-zapletal/engine.js';
import {chooseTurn} from '../assets/js/variants/czech-8/ai.js';
import {chooseTurn as chooseZapletalTurn} from '../assets/js/variants/czech-zapletal/ai.js';

test('Czech AI chooses a complete legal turn from the initial position',()=>{
 const state=engine.createInitialState();
 const choice=chooseTurn(state,engine,'easy');
 assert.ok(choice.moves.length>0);
 const first=choice.moves[0];
 assert.ok(engine.getLegalMoves(state).some(move=>move.from===first.from&&move.to===first.to));
 const next={...state,board:state.board.map(piece=>piece?{...piece}:null)};
 let result;
 for(const move of choice.moves)result=engine.playMove(next,move);
 assert.equal(result.ok,true);
 assert.equal(result.turnFinished,true);
 assert.equal(next.currentPlayer,'black');
});

test('Czech AI completes a forced multi-capture in one selected turn',()=>{
 const state=engine.createInitialState();
 state.board=Array(64).fill(null);
 state.board[17]={player:'white',king:false};
 state.board[26]={player:'black',king:false};
 state.board[44]={player:'black',king:false};
 state.currentPlayer='white';
 const choice=chooseTurn(state,engine,'easy');
 assert.equal(choice.moves.length,2);
 const next={...state,board:state.board.map(piece=>piece?{...piece}:null)};
 let result;
 for(const move of choice.moves)result=engine.playMove(next,move);
 assert.equal(result.turnFinished,true);
 assert.equal(engine.getPieceCounts(next).black,0);
});

test('Zapletal AI plays its opening turn as black and returns a complete legal turn',()=>{
 const state=zapletal.createInitialState();
 assert.equal(state.currentPlayer,'black');
 const choice=chooseZapletalTurn(state,zapletal,'easy');
 assert.ok(choice.moves.length>0);
 assert.ok(zapletal.getLegalMoves(state).some(move=>move.from===choice.moves[0].from&&move.to===choice.moves[0].to));
 const next={...state,board:state.board.map(piece=>piece?{...piece}:null)};
 let result;
 for(const move of choice.moves)result=zapletal.playMove(next,move);
 assert.equal(result.ok,true);
 assert.equal(result.turnFinished,true);
 assert.equal(next.currentPlayer,'white');
});

test('Zapletal AI completes a forced multi-capture in one selected turn',()=>{
 const state=zapletal.createInitialState();
 state.board=Array(64).fill(null);
 state.board[17]={player:'black',king:false};
 state.board[26]={player:'white',king:false};
 state.board[44]={player:'white',king:false};
 state.currentPlayer='black';
 const choice=chooseZapletalTurn(state,zapletal,'easy');
 assert.equal(choice.moves.length,2);
 const next={...state,board:state.board.map(piece=>piece?{...piece}:null)};
 let result;
 for(const move of choice.moves)result=zapletal.playMove(next,move);
 assert.equal(result.turnFinished,true);
 assert.equal(zapletal.getPieceCounts(next).white,0);
});

test('Zapletal AI does not invent a winner for an unresolved blocked position',()=>{
 const state=zapletal.createInitialState();
 state.board=Array(64).fill(null);
 state.board[0]={player:'white',king:false};
 state.currentPlayer='black';
 state.blocked=true;
 const choice=chooseZapletalTurn(state,zapletal,'easy');
 assert.deepEqual(choice.moves,[]);
 assert.equal(choice.score,0);
});

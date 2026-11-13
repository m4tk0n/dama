import test from 'node:test';
import assert from 'node:assert/strict';
import * as engine from '../assets/js/variants/czech-8/engine.js';
import {chooseTurn} from '../assets/js/variants/czech-8/ai.js';

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

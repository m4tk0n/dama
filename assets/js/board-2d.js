function createCell(row,column,index,piece,{interactive=false,selected=false,target=false,captured=false}={}){
 const dark=(row+column)%2===1;
 const cell=document.createElement(interactive?'button':'div');
 if(interactive)cell.type='button';
 cell.className='board-cell'+(dark?' is-dark':'')+(selected?' is-selected':'')+(target?' is-legal-target':'')+(captured?' is-captured':'');
 cell.setAttribute('role','gridcell');
 cell.setAttribute('aria-label',piece
  ?'Řada '+(row+1)+', sloupec '+(column+1)+', '+(piece.player==='white'?'bílé':'černé')+(piece.king?', dáma':' kámen')
  :'Řada '+(row+1)+', sloupec '+(column+1)+(target?', možný cíl':''));
 if(interactive)cell.dataset.cellIndex=String(index);
 if(!dark&&interactive)cell.disabled=true;
 if(piece){
  const token=document.createElement('span');
  token.className='board-piece '+(piece.player==='white'?'is-light':'is-dark-piece')+(piece.king?' is-king':'');
  token.setAttribute('aria-hidden','true');
  cell.append(token);
 }
 return cell;
}

export function renderInitialBoard(container,size=8){
 if(!container)return;
 const dimension=size===10?10:8,fragment=document.createDocumentFragment();
 container.style.gridTemplateColumns='repeat('+dimension+',minmax(0,1fr))';
 container.style.gridTemplateRows='repeat('+dimension+',minmax(0,1fr))';
 container.setAttribute('aria-label','Hrací deska '+dimension+' krát '+dimension);
 for(let row=0;row<dimension;row++)for(let column=0;column<dimension;column++){
  const dark=(row+column)%2===1,startingRows=dimension===10?4:3;
  const piece=dark&&row<startingRows?{player:'white',king:false}:dark&&row>=dimension-startingRows?{player:'black',king:false}:null;
  fragment.append(createCell(row,column,row*dimension+column,piece));
 }
 container.replaceChildren(fragment);
}

export function renderGameBoard(container,state,selectedIndex=null,legalMoves=[]){
 if(!container)return;
 const targets=new Set(legalMoves.map(move=>move.to));
 const captured=new Set(state.pending?.captured||[]);
 const fragment=document.createDocumentFragment();
 const size=state.size||8;
 container.style.gridTemplateColumns='repeat('+size+',minmax(0,1fr))';
 container.style.gridTemplateRows='repeat('+size+',minmax(0,1fr))';
 container.setAttribute('aria-label','Hrací deska '+size+' krát '+size);
 for(let row=0;row<size;row++)for(let column=0;column<size;column++){
  const index=row*size+column;
  fragment.append(createCell(row,column,index,state.board[index],{
   interactive:true,selected:index===selectedIndex,target:targets.has(index),captured:captured.has(index)
  }));
 }
 container.replaceChildren(fragment);
}

export function renderInitialBoard(container,size=8){
 if(!container)return;
 const dimension=size===10?10:8;
 const fragment=document.createDocumentFragment();
 container.style.gridTemplateColumns='repeat('+dimension+',minmax(0,1fr))';
 container.style.gridTemplateRows='repeat('+dimension+',minmax(0,1fr))';
 container.setAttribute('aria-label','Hrací deska '+dimension+' krát '+dimension);
 for(let row=0;row<dimension;row+=1){for(let column=0;column<dimension;column+=1){
  const darkSquare=(row+column)%2===1;const cell=document.createElement('div');
  cell.className='board-cell'+(darkSquare?' is-dark':'');cell.setAttribute('role','gridcell');
  cell.setAttribute('aria-label','Řada '+(row+1)+', sloupec '+(column+1));
  const startingRows=dimension===10?4:3;
  const hasLightPiece=darkSquare&&row<startingRows;const hasDarkPiece=darkSquare&&row>=dimension-startingRows;
  if(hasLightPiece||hasDarkPiece){const piece=document.createElement('span');piece.className='board-piece '+(hasLightPiece?'is-light':'is-dark-piece');piece.setAttribute('aria-hidden','true');cell.append(piece)}
  fragment.append(cell);
 }}
 container.replaceChildren(fragment);
}

export function renderInitialBoard(container){
 if(!container)return;
 const fragment=document.createDocumentFragment();
 for(let row=0;row<8;row+=1){for(let column=0;column<8;column+=1){
  const darkSquare=(row+column)%2===1;const cell=document.createElement('div');
  cell.className='board-cell'+(darkSquare?' is-dark':'');cell.setAttribute('role','gridcell');
  cell.setAttribute('aria-label','Řada '+(row+1)+', sloupec '+(column+1));
  const hasLightPiece=darkSquare&&row<3;const hasDarkPiece=darkSquare&&row>4;
  if(hasLightPiece||hasDarkPiece){const piece=document.createElement('span');piece.className='board-piece '+(hasLightPiece?'is-light':'is-dark-piece');piece.setAttribute('aria-hidden','true');cell.append(piece)}
  fragment.append(cell);
 }}
 container.replaceChildren(fragment);
}

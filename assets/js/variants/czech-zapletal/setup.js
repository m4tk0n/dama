export const variantId='czech-zapletal';
export const rulesVersion='1';
export const boardSize=8;
export const startingPlayer='black';
export const piecesPerPlayer=8;
export function createInitialBoard(){
 const board=Array(boardSize*boardSize).fill(null);
 for(let r=0;r<2;r++)for(let c=0;c<boardSize;c++)if((r+c)%2===1)board[r*boardSize+c]={player:'white',king:false};
 for(let r=6;r<8;r++)for(let c=0;c<boardSize;c++)if((r+c)%2===1)board[r*boardSize+c]={player:'black',king:false};
 return board;
}
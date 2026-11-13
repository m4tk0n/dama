export const variantId='czech-8';
export const rulesVersion='1';
export const boardSize=8;
export const startingPlayer='white';
export const piecesPerPlayer=12;
export function createInitialBoard(){
 const board=Array(boardSize*boardSize).fill(null);
 for(let r=0;r<3;r++)for(let c=0;c<boardSize;c++)if((r+c)%2===1)board[r*boardSize+c]={player:'white',king:false};
 for(let r=5;r<8;r++)for(let c=0;c<boardSize;c++)if((r+c)%2===1)board[r*boardSize+c]={player:'black',king:false};
 return board;
}
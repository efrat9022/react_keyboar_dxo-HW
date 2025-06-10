export type Player = 'X' | 'O' | null;

export class GameModel {
  board: Player[]; // לוח המשחק
  currentPlayer: Player; // השחקן הנוכחי
  winner: Player | 'Draw'; // מנצח המשחק
  isGameOver: boolean; // האם המשחק נגמר

  constructor() {
    this.board = Array(9).fill(null);//ממלא לי את 9 התאים במערך בnull
    this.currentPlayer = 'X';
    this.winner = null;
    this.isGameOver = false;
  }
}

import React, { useState } from 'react';
import { GameModel } from '../../Models/GameModel';
import './Games.css';
import { Counter } from '../Counter/Counter';

// הגדרת הממשק GameProps
interface GameProps {
  onGameEnd: () => void; // פונקציה שמופעלת בסיום המשחק
}

// קומפוננטת Game
export function Game(props: GameProps) {
  const { onGameEnd } = props; // שליפת הפונקציה מתוך האוביקט

  const [myGame, setMyGame] = useState(new GameModel());//יוצר מופע חדש של המשחק
  const [board, setBoard] = useState(myGame.board);//מעדכן את מצב הלוח הנוכחי
  const [displayCounter, setdisplayCounter] = useState(true);//עדכון הצגת הטיימר
  const [showGameOver, setShowGameOver] = useState(false);//GAME OVER
  const [myNumberStart, setMyNumberStart] = useState(60); // סטייט של הזמן התחלתי
  const [round, setRound] = useState(1); // מספר הסיבוב הנוכחי
  const [roundsWithoutWin, setRoundsWithoutWin] = useState(0); // ספירת סיבובים ללא ניצחון

  const notDisplay = () => {
    setdisplayCounter(false);//מסתיר את הספירה לאחור
    setShowGameOver(true);
    //אחרי השהיה של שניה מחזיר את המצב הונחי למקלדת
    setTimeout(() => {
      if (roundsWithoutWin >= 2) {
        setShowGameOver(false);
        onGameEnd(); // מחזיר למקלדת אחרי השהיה
      }else {
        setShowGameOver(false);
        resetGame(); // אתחול סיבוב חדש
      }
      
    }, 1000); // השהיה של שניה
  };

  const makeMove = (index: number) => {// מספר שמייצג את האינדקס של המשבצת שעליה לחצו בלוח
    if (myGame.isGameOver || myGame.board[index] !== null) return;

    myGame.board[index] = myGame.currentPlayer;//הצבה בלוח X|O

    if (checkWinner()) {
      myGame.winner = myGame.currentPlayer;
      myGame.isGameOver = true;
    } else if (myGame.board.every((cell) => cell !== null)) {
      myGame.winner = 'Draw';
      myGame.isGameOver = true;
    } else {
      myGame.currentPlayer = myGame.currentPlayer === 'X' ? 'O' : 'X';//מעביר תתור לשחקן הבא
    }

    setMyGame({ ...myGame });//מעדכן את מצב הלוח הנוכחי לאחר השיוניים של התור
    setBoard([...myGame.board]);//כנל עם הלוח
  };

  const checkWinner = () => {
    const winningCombinations = [//הגדרת אופציות לניצחון על הלוח
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some(
      (combination) =>
        myGame.board[combination[0]] &&
        myGame.board[combination[0]] === myGame.board[combination[1]] &&
        myGame.board[combination[0]] === myGame.board[combination[2]]
    );
  };

  //פונקציה לאתחול מצב חדש-סיבוב חדש
  const resetGame = () => {
    const newGame = new GameModel();
    setMyGame(newGame);
    setBoard(newGame.board);
    setMyNumberStart(60);
    setdisplayCounter(true);
    setRound((prev) => prev + 1); // העלאת מספר הסיבוב
    if (!myGame.winner || myGame.winner === 'Draw') {
      setRoundsWithoutWin((prev) => prev + 1); // העלאת סיבובים ללא ניצחון
    }
  };


  return (
    <div className="game">
      {displayCounter ? (
        //parentFunc={notDisplay}: פונקציה שתרוץ כשהספירה לאחור תסתיים.
        //myNumberStart={60}: ערך התחלתי לספירה לאחור.
        //בתוך קומפוננטת Counter, הפונקציה parentFunc נועדה להתריע לקומפוננטה ההורה שהטיימר נגמר
        <Counter 
        parentFunc={notDisplay} 
        myNumberStart={myNumberStart} // העברת הסטייט למספר התחלתי
      />
    ) : showGameOver ? (
      roundsWithoutWin >= 2 ? (
        <div>תם הזמן – לך להכין שיעורי בית</div>
      ) : (
        'GAME OVER!!!'
      )
    ) : null}
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => makeMove(index)}>
            {cell}
          </button>
        ))}
      </div>
      {myGame.isGameOver && (
        <div className="winner">
          <p>
            {myGame.winner === 'Draw'
              ? 'It\'s a draw!'
              : `The winner is ${myGame.winner}`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Game;




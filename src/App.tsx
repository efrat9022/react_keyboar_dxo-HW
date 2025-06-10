import React, { useState } from "react";
import Keyboard from "./Components/KeyboardComponent/Keyboard";// נתיב לקומפוננטת Keyboard
import { Game } from './Components/Game/Games';
import "./App.css"; // אם יש עיצוב כולל לאפליקציה

function App() {
  // סטייט לשם ניהול התצוגה
  const [showGame, setShowGame] = useState(false);
  const [countGame,setcountGame] = useState(0);

  return (
    <div className="app">
     {! showGame ? (
      <>
      <button className="start-game-btn" onClick={()=> setShowGame(true)}>התחל משחק</button>
      <Keyboard/>
      </>
     ) : ( 
      <Game onGameEnd={()=> setShowGame(false)}/> //חזרה למקלדת
      )}
    </div>
  );
}

export default App;
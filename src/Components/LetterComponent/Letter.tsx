import React from "react";
import { letter } from "../../Models/LetterModule";

//מגדיר את הפרופס שקומפוננטת Letter מקבלת.
interface LetterProps {
  letter: letter; //מייצד אות עם התכונות שהוגדרו מראש
  onClick: (char: string) => void;//פונקציה שמטפלת בלחיצה על האות
}

const Letter = (props: LetterProps) => {
  return (
    <span
      className={`letter ${props.letter.language}`} // עיצוב לפי השפה
      onClick={() => props.onClick(props.letter.char)} // קריאה לפונקציה עם התו
    >
      {props.letter.char} {/* הצגת התו */}
    </span>
  );
};

export default Letter;

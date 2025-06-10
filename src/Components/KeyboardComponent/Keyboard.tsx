import React, { useState } from "react";
import Letter from "../LetterComponent/Letter";
import { letter } from "../../Models/LetterModule"; // ייבוא המודל של letter
import "./Keyboard.css";

export function Keyboard() {
  // סטייטים
  const [text, setText] = useState<letter[]>([]); //text: מערך שמכיל אובייקטים של אותיות (letter) המוצגות באזור התצוגה
  const [language, setLanguage] = useState("en"); 
  const [isUpperCase, setIsUpperCase] = useState(false); 
  const [charType, setCharType] = useState("letters"); 
  const [currentStyle, setCurrentStyle] = useState<{// עיצוב התו הנוכחי
    color: string;
    fontSize: number;
    bold: boolean;
  }>({
    color: "black",
    fontSize: 16,
    bold: false,
  }); 

  // מערכי אותיות, מספרים ותווים מיוחדים
  const lettersEn = isUpperCase
    ? ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const lettersHe = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const specialChars = ["!", "@", "#", "$", "%", "^", "&"];
  const emojis = ["😊", "😍", "💖", "✨", "🎉", "🌈", "🍀", "🌸", "🍓", "🌻", "🐱", "🐶", "🦄", "🐰", "🌼"];

  // פונקציות
  //הוספת תו חדש לתצוגה
  const AddChar = (char: string) => {
    const newChar: letter = {
      char,//ערך התו שהתקבל
      language,//השפה שהתקבלה מהסטיט
      style: { ...currentStyle },//עיצוה התו הנוכחי שהתקבל
    };
    setText([...text, newChar]);//מעדכן את הסטיט עם האותיות שכבר היו +התו החדש לסו, המערך
  };

  //מחיקת אות מהמערך
  const DeleteLastChar = () => {
    setText(text.slice(0, -1));
  };

  //מוחקת את כל הטקסט
  const ClearText = () => {
    setText([]);
  };

  //שינוי השפה במקלדת
  const ToggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  //עדכון אותיות קטנות|גדולות
  const ToggleUpperCase = () => {
    setIsUpperCase(!isUpperCase);
  };

  //שינוי מצב הבחירה במקלדת
  const ChangeCharType = (type: "letters" | "numbers" | "specialChars" | "emojis") => {
    setCharType(type);
  };

  const ChangeStyle = (newStyle: { color?: string; fontSize?: number; bold?: boolean }) => {
    setCurrentStyle({
      ...currentStyle,
      ...newStyle,//מחליף את הסטייל הנוכחי למה שהתקבל
    });
  };
  
  // בחירת התווים לתצוגה
  const chars =
    charType === "letters"
      ? language === "en"
        ? lettersEn
        : lettersHe
      : charType === "numbers"
      ? numbers
      : charType === "emojis"
      ?emojis
      : specialChars;

  return (
    //עובר בלולאה על כל התווים שנבחרו ומציג אותם על הלוח
    <div className="keyboard">
      {/* אזור התצוגה */}
      <div className="display">
        {text.map((letterObj, index) => (
          <span
            key={index}//מזהה יחודי לכל אות במערך שנבחר
            style={{
              color: letterObj.style.color,
              fontSize: `${letterObj.style.fontSize}px`,
              fontWeight: letterObj.style.bold ? "bold" : "normal",
            }}
          >
            {letterObj.char}
          </span>
        ))}
      </div>

      {/* לחצני אפשרויות */}
      <div className="controls">
        <button onClick={ToggleLanguage}>
          Language: {language === "en" ? "English" : "Hebrew"}
        </button>
        <button onClick={ToggleUpperCase}>
          {isUpperCase ? "Lowercase" : "Uppercase"}
        </button>
        <button onClick={() => ChangeCharType("letters")}>Letters</button>
        <button onClick={() => ChangeCharType("numbers")}>Numbers</button>
        <button onClick={() => ChangeCharType("emojis")}>Emojis</button>
        <button onClick={() => ChangeCharType("specialChars")}>Special Chars</button>
        <button onClick={ClearText}>Clear All</button>
        <button onClick={DeleteLastChar}>Delete Last</button>
        <button onClick={() => ChangeStyle({ bold: !currentStyle.bold })}>Bold: {currentStyle.bold ? "On" : "Off"}</button>
        <button onClick={() => AddChar(" ")}>Space</button>

        <input
          type="color" // בחירת הצבע
          onChange={(e) => ChangeStyle({ color: e.target.value })}
          value={currentStyle.color}
        />
        <input
          type="number"// גודל גופן
          min="10"
          max="40"
          onChange={(e) =>
            ChangeStyle({ fontSize: parseInt(e.target.value) })
          }
          value={currentStyle.fontSize}
        />
      </div>

      {/* הצגת תווים */}
      <div className="chars">
        {chars.map((char) => (
          <Letter
            key={char}
            letter={{
              char,
              language,
              style: currentStyle,
            }} // מעבירים את האובייקט letter
            onClick={AddChar}
          />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;

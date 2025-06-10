
import { useEffect, useState } from "react";
import './Counter.css'

interface CounterProps {
  myNumberStart: number; // מספר התחלתי עבור הטיימר
  parentFunc: () => void; // פונקציה שמופעלת כאשר הטיימר מגיע ל-0
}

export function Counter(props: CounterProps) {
  const { myNumberStart, parentFunc } = props;
  const [myNumber, setMyNumber] = useState(myNumberStart); // מעדכן את ערך הטיימר
  const [idTimer, setIdTimer] = useState<NodeJS.Timeout | null>(null); // מזהה הטיימר

  useEffect(() => {
    setMyNumber(myNumberStart); // עדכון הטיימר לערך ההתחלתי החדש
    if (idTimer) clearInterval(idTimer); // ניקוי טיימר קודם

    const timerId = setInterval(() => {//הורדת הטיימר במשך דקה
      setMyNumber((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);

    setIdTimer(timerId);//שמירת מזהה הטיימר
    return () => clearInterval(timerId); // ניקוי הטיימר בעת ניקוי הקומפוננטה
  }, [myNumberStart]); // אתחול מחדש כאשר myNumberStart משתנה

  useEffect(() => {
    if (myNumber <= 0) {
      clearInterval(idTimer!); // ניקוי הטיימר
      parentFunc(); // קריאה לפונקציה מההורה
    }
  }, [myNumber, idTimer, parentFunc]);//הפונקציה תרוץ שוב כשפונקצית ההורה תתקבל, המספר בטיימר השתנה,או התנקה הערך

  return (
    <div>
      <h1>{myNumber}</h1>
    </div>
  );
}

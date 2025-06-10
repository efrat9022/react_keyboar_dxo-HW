# ReactSmartKeyboard-XO

React HW combining an interactive smart keyboard with a dynamic XO game.  
This app demonstrates advanced component design in React, including state and props management, conditional rendering, and time-based logic.

---

##  Project Features

###  Smart Keyboard
- Buttons for letters, numbers, and special characters
- Supports Hebrew and English input
- Text formatting: size, color, bold
- Toggle camelCase / UPPER / lower case
- Delete last character / clear all text
- Dynamic rendering using props and state

### XO Game
- Appears after clicking "Start Game"
- One-minute countdown timer per round
- Automatic "Game Over" if time runs out without a winner
- Up to 3 rounds allowed
- Returns to keyboard screen after game ends

---

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

---

## Tech Stack

- React
- JavaScript
- CSS / Bootstrap
- useState, useEffect
- Component-based architecture

---

## Project Structure (Example)

```
my-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Keyboard.tsx
│   │   ├── Letter.tsx
│   │   ├── XOGame.tsx
│   │   ├── Timer.tsx
│   ├── App.tsx
│   ├── index.tsx
├── package.json
├── README.md
```

---


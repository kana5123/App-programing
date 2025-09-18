import { useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import History from "./components/History";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      return;
    }
    if (value === "=") {
      try {
        const result = eval(input).toString();
        setInput(result);
        const newRecord = `${input} = ${result}`;
        setHistory((prev) => [newRecord, ...prev].slice(0, 5));
      } catch {
        setInput("Error");
      }
      return;
    }
    setInput((prev) => prev + value);
  };


  return (
    <div className="container">
      <h1>React 계산기</h1>
      {input === "Error" ? <p style={{ color: "red" }}>잘못된 수식!</p> : null}
      <Display value={input} />
      <Keypad onKey={handleClick} />
      <History records={history} />
    </div>
  );
}

export default App;

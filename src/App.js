import { useCallback, useEffect, useMemo, useState } from "react";
import Display from "./components/Display.jsx";
import Keypad from "./components/Keypad.jsx";
import History from "./components/History.jsx";
import "./App.css";
import { Parser } from "expr-eval";

const MAX_HISTORY = 5;

// 소수 오차 보정
function formatResult(val) {
  if (typeof val !== "number" || !isFinite(val)) return "Error";
  const rounded = Math.round((val + Number.EPSILON) * 1e12) / 1e12;
  const fixed = rounded.toFixed(12);
  return fixed.replace(/\.?0+$/, "");
}

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const parser = useMemo(() => new Parser(), []);

  const evaluate = useCallback((expr) => {
    try {
      // expr-eval의 %는 '나머지(modulo)' 연산입니다. (예: 200%50=0, 3.5%6=3.5)
      const value = parser.evaluate(expr);
      return formatResult(value);
    } catch {
      return "Error";
    }
  }, [parser]);

  const handleClick = useCallback((value) => {
    if (value === "C") {
      setInput("");
      return;
    }
    if (value === "=") {
      setInput((prev) => {
        const expr = prev.trim();
        if (!expr) return prev;
        const result = evaluate(expr);
        if (result !== "Error") {
          const rec = `${expr} = ${result}`;
          setHistory((p) => {
            // 바로 이전 기록과 같으면 추가하지 않음 (중복 방지)
            if (p[0] === rec) return p;
            return [rec, ...p].slice(0, MAX_HISTORY);
          });
        }
        return result;
      });
      return;
    }
    setInput((prev) => prev + value);
  }, [evaluate]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const k = e.key;
      if ((k >= "0" && k <= "9") || k === "." || k === "(" || k === ")") {
        setInput((prev) => prev + k);
        return;
      }
      if ("+-*/%".includes(k)) {
        setInput((prev) => prev + k);
        return;
      }
      if (k === "Enter" || k === "=") {
        e.preventDefault();
        handleClick("=");
        return;
      }
      if (k === "Escape") {
        e.preventDefault();
        handleClick("C");
        return;
      }
      if (k === "Backspace") {
        e.preventDefault();
        setInput((prev) => prev.slice(0, -1));
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClick]);

  const clearHistory = useCallback(() => setHistory([]), []);

  return (
    <div className="container">
      <h1>React 계산기</h1>
      {input === "Error" ? <p style={{ color: "red" }}>잘못된 수식!</p> : null}
      <Display value={input} />
      <Keypad onKey={handleClick} />
      <History records={history} onClear={clearHistory} />
    </div>
  );
}

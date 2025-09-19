import Button from "./Button.jsx";

export default function Keypad({ onKey }) {
  const operators = ["+", "-", "*", "/", "%", "="]; // % 포함
  const numbers = ["7","8","9","4","5","6","1","2","3","0",".","C"];

  return (
    <div className="keypad">
      <div className="numbers">
        {numbers.map((n) => (
          <Button key={n} label={n} onClick={onKey} />
        ))}
      </div>
      <div className="operators">
        {operators.map((op) => (
          <Button key={op} label={op} onClick={onKey} />
        ))}
      </div>
    </div>
  );
}

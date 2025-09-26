import { useState, useEffect } from "react";

export default function TodoApp() {

  const [text, setText] = useState("");

  const [emoji, setEmoji] = useState("");

  const [priority, setPriority] = useState("medium");


  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;


    const displayText = emoji ? `${emoji} ${trimmed}` : trimmed;

    setTodos([
      ...todos,
      { id: Date.now(), text: displayText, done: false, priority } 
    ]);
    setText("");
;
  };


  const toggleDone = (id) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const remainingCount = todos.filter(t => !t.done).length; 


  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });

  return (
    <div className="card">
      <h2>{today} To-do List</h2>


      <form onSubmit={handleSubmit} className="form-row">

        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="emoji-select"
          aria-label="이모지 선택"
        >
          <option value="">이모지 없음</option>
          <option value="📚">📚</option>
          <option value="💪">💪</option>
          <option value="💼">💼</option>
          <option value="📝">📝</option>
          <option value="📧">📧</option>
        </select>


        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />


        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
          aria-label="우선순위 선택"
        >
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>

        <button type="submit">추가</button>
      </form>


      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            className={`todo-item ${t.priority}-priority`}
            style={{
              textDecoration: t.done ? "line-through" : "none" 
            }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
            />
            <span className="todo-text">{t.text}</span>


            <span className={`${t.priority}-badge`}>{t.priority}</span>

            <button onClick={() => deleteTodo(t.id)}>삭제</button>
          </li>
        ))}
      </ul>


      <p>남은 할 일: {remainingCount}</p>
    </div>
  );
}

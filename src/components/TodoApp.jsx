import { useState, useEffect } from "react";

export default function TodoApp() {
  // 입력값 상태 (PDF p7–9)
  const [text, setText] = useState("");
  // 참신한 팁: 이모지 선택 (PDF p19)
  const [emoji, setEmoji] = useState("");
  // 참신한 팁: 우선순위 선택 (PDF p20)
  const [priority, setPriority] = useState("medium");

  // todos 상태 + 자동 로드 (PDF p23, p24)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 참신한 팁: 자동 저장 (PDF p23, p24)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 할 일 추가 (PDF p10, p24)
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    // 이모지는 텍스트 앞에 붙여 저장 (PDF p19 아이디어)
    const displayText = emoji ? `${emoji} ${trimmed}` : trimmed;

    setTodos([
      ...todos,
      { id: Date.now(), text: displayText, done: false, priority } // PDF p20: priority 필드
    ]);
    setText("");
    // 우선순위/이모지는 유지하거나 초기화 원하는대로
    // setEmoji(""); setPriority("medium");
  };

  // 완료 토글 (PDF p13–14, p24)
  const toggleDone = (id) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // 삭제 (PDF p16–17, p24)
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const remainingCount = todos.filter(t => !t.done).length; // PDF p18

  // 날짜 표시는 PDF p21, p25 패턴
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });

  return (
    <div className="card">
      <h2>{today} To-do List</h2>

      {/* 입력 폼 (PDF p9–10, p25) */}
      <form onSubmit={handleSubmit} className="form-row">
        {/* 이모지 선택 (PDF p19) */}
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

        {/* 텍스트 입력 (PDF p8–9) */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />

        {/* 우선순위 선택 (PDF p20) */}
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

      {/* 리스트 렌더링 (PDF p11–12, p25) */}
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            className={`todo-item ${t.priority}-priority`}
            style={{
              textDecoration: t.done ? "line-through" : "none" // PDF p15, p25
            }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
            />
            <span className="todo-text">{t.text}</span>

            {/* 우선순위 배지 (PDF p20 예시 클래스명) */}
            <span className={`${t.priority}-badge`}>{t.priority}</span>

            <button onClick={() => deleteTodo(t.id)}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 남은 할 일 (PDF p18, p25) */}
      <p>남은 할 일: {remainingCount}</p>
    </div>
  );
}

import Title, { Counter } from "./components/앱프 1차 과제";

function App() {
  return (
    <div style={{ padding: 24 }}>
      <Title name="강이의" dep="제주대학교 인공지능학과" number={2021104002} />
      <Counter />
    </div>
  );
}

export default App;

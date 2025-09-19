export default function History({ records = [], onClear }) {
    return (
      <div className="history">
        <div className="history-header">
          <h3 style={{ margin: 0 }}>기록</h3>
          <button
            type="button"
            className="btn"
            onClick={onClear}
            disabled={records.length === 0}
            aria-label="기록 초기화"
          >
            기록 초기화
          </button>
        </div>
  
        <ul>
          {records.map((r, idx) => (
            <li key={idx}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }
  
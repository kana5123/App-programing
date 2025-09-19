export default function Display({ value }) {
    const text = (value ?? "").toString();
    return (
      <div className="display" role="status" aria-live="polite">
        {text === "" ? "0" : text}
      </div>
    );
  }
  
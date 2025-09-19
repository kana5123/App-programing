export default function Button({ label, onClick }) {
    const handle = () => {
      if (typeof onClick === "function") onClick(label);
    };
  
    return (
      <button type="button" className="btn" onClick={handle} aria-label={label}>
        {label}
      </button>
    );
  }
  
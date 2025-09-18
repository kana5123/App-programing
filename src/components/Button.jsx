export default function Button({ label, onClick }) {
    const handle = () => {

      if (typeof onClick === "function") {
        onClick(label);
      } else {
        console.warn("Button onClick prop is not a function:", onClick);
      }
    };
  
    return (
      <button className="btn" onClick={handle}>
        {label}
      </button>
    );
  }
  
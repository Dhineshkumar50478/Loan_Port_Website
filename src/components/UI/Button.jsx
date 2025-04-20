export function Button({ children, className, onClick }) {
    return (
      <button onClick={onClick} className={`px-4 py-2 rounded-md ${className}`}>
        {children}
      </button>
    );
  }
  
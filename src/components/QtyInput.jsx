function QtyInput({ value, onChange }) {
  const increment = () => onChange(value + 1);
  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="input-group border border-primary me-lg-16 mb-16 mb-lg-0">
      <button
        className="btn btn-outline-primary rounded-0 border-0 py-12"
        type="button"
        onClick={decrement}
      >
        <span className="material-symbols-outlined align-bottom">remove</span>
      </button>

      <input
        type="text"
        className="form-control border-0 text-primary text-center bg-transparent cn-label-l"
        // 使用傳進來的 value
        value={value}
        readOnly
      />

      <button
        className="btn btn-outline-primary rounded-0 border-0 py-12"
        type="button"
        onClick={increment}
      >
        <span className="material-symbols-outlined align-bottom">add</span>
      </button>
    </div>
  );
}

export default QtyInput;

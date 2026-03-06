import { useState, useEffect, useRef } from "react";

function ProductsFilter({ categoryList, setCurrentCategory, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // 點外面關閉
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="product-dropdown"
      ref={ref}
      style={{ position: "relative" }}
    >
      <button
        className="btn border-0 eng-heading-h4 text-primary p-0 d-flex align-items-center"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Filter
        <span
          className="material-symbols-outlined ms-2"
          style={{ fontSize: "20px" }}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <ul
          className="dropdown-menu rounded-0 border-0 shadow py-12 px-8 show"
          style={{ position: "absolute", top: "100%", left: 0, zIndex: 1050 }}
        >
          {categoryList.map((cat) => (
            <li key={cat.value}>
              <button
                className="dropdown-item cn-body-s-regular py-12 px-16"
                type="button"
                onClick={() => {
                  setCurrentCategory(cat.value);
                  setCurrentPage(1);
                  setIsOpen(false);
                }}
              >
                {cat.title} / {cat.eng}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsFilter;

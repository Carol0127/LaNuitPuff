function ProductsFilter({ categoryList, setCurrentCategory, setCurrentPage }) {
  return (
    <>
      <div className="dropdown product-dropdown">
        <button
          className="btn border-0 dropdown-toggle eng-heading-h4 text-primary p-0 d-flex align-items-center"
          type="button"
          id="filterDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
          <span
            className="material-symbols-outlined ms-2"
            style={{ fontSize: "20px" }}
          >
            expand_more
          </span>
        </button>

        <ul className="dropdown-menu rounded-0 border-0 shadow py-12 px-8">
          {categoryList.map((cat) => (
            <li key={cat.value}>
              <a
                className="dropdown-item cn-body-s-regular py-12 px-16"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentCategory(cat.value);
                  setCurrentPage(1);
                }}
              >
                {cat.title} / {cat.eng}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProductsFilter;

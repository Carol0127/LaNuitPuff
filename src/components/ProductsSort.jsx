function ProductSort({ setSortOrder }) {
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
          Sort
          <span
            className="material-symbols-outlined ms-2"
            style={{ fontSize: "20px" }}
          >
            expand_more
          </span>
        </button>

        <ul
          className="dropdown-menu rounded-0 border-0 shadow py-12 px-8"
          aria-labelledby="filterDropdown"
        >
          <li>
            <a
              className="dropdown-item cn-body-s-regular py-12 px-16"
              href="#/category/comforting"
              onClick={(e) => {
                e.preventDefault();
                setSortOrder("low");
              }}
            >
              由低到高 / Low to High
            </a>
          </li>
          <li>
            <a
              className="dropdown-item cn-body-s-regular py-12 px-16"
              href="#/category/comforting"
              onClick={(e) => {
                e.preventDefault();
                setSortOrder("high");
              }}
            >
              由高到低 / High to Low
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProductSort;

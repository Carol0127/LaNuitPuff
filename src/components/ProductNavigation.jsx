function ProductNavigation({ pagination, setCurrentPage }) {
  return (
    <>
      <nav className="mt-28 mt-lg-40 d-flex justify-content-end justify-content-lg-center">
        <ul className="list-unstyled d-flex">
          {[...Array(pagination.total_pages)].map((_, i) => (
            <li
              key={i}
              className="productNavigation"
            >
              <a
                className={`eng-label-l ${pagination.current_page === i + 1 ? "active" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default ProductNavigation;

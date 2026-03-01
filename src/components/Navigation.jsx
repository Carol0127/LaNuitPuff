function Navigation({ pagination, setCurrentPage }) {
  return (
    <>
      <nav className=" d-flex justify-content-end justify-content-lg-center">
        <ul className="list-unstyled d-flex mb-0">
          {[...Array(pagination.total_pages)].map((_, i) => (
            <li
              key={i}
              className="navigationCustom"
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

export default Navigation;

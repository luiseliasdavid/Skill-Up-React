const Pagination = ({
    totalPages,
    currentPage,
    switchPage,
    prev,
    next,
}) => {
    return (
        <nav className="align-self-center">
            <ul className="pagination">
                <li className={"page-item"}>
                    <button className="page-link" onClick={prev}>
                        <span>&laquo;</span>
                    </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                    <li className="page-item" key={index}>
                        <button
                            className={`page-link ${
                                currentPage == index + 1 ? "active" : ""
                            }`}
                            onClick={() => switchPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}

                <li className="page-item">
                    <button className="page-link" onClick={next}>
                        <span>&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

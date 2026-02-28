export const Pagination = ({
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems = 17263,
}) => {
  //calculating the showing x to y text
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  //windowing logic (deciding when to show"....")
  const generatePaginationArray = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "....", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "....",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = generatePaginationArray();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center px-6 py-4 border-t border-neutral-800 bg-[#0d1217] text-sm text-neutral-400 gap-y-4 md:gap-y-0">
      {/**left sie: showing reuslts */}
      <div className="justify-self-center md:justify-self-start">
        showing {startItem} to {endItem} of {totalItems} results
      </div>

      {/**center */}
      <div className="flex items-center gap-2 justify-self-center text-white font-medium">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 px-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dynamic Page Numbers */}
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? onPageChange(page) : null
            }
            disabled={page === "..."}
            className={`min-w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              page === currentPage
                ? "bg-[#1b3a2a] text-emerald-400"
                : page === "..."
                  ? "cursor-default text-neutral-400 tracking-widest"
                  : "hover:bg-neutral-800"
            }`}
          >
            {page}
          </button>
        ))}
        {/* Next Arrow (>) */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 px-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3 justify-self-center md:justify-self-end">
        <span>Rows</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-[#1a202c] border border-neutral-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bloack p-2 outline-none cursor-pointer hover:bg-neutral-800 transition-colors"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>

  );
};

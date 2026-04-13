const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-16 font-body">
      {[1, 2, 3, 4].map((page) => (
        page <= totalPages && (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-10 h-10 text-sm rounded-sm transition
              ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }
            `}
          >
            {page}
          </button>
        )
      ))}

      {totalPages > 5 && (
        <>
          <span className="px-2 text-gray-400 tracking-widest">
            ......
          </span>

          <button
            onClick={() => onPageChange(totalPages)}
            className={`
              w-10 h-10 text-sm rounded-sm transition
              ${
                currentPage === totalPages
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }
            `}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
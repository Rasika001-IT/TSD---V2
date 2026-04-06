const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-3 mt-16 font-body">
      <button className="w-10 h-10 bg-black text-white text-sm rounded-sm">1</button>
      <button className="w-10 h-10 bg-gray-200 text-sm rounded-sm">2</button>
      <button className="w-10 h-10 bg-gray-200 text-sm rounded-sm">3</button>
      <button className="w-10 h-10 bg-gray-200 text-sm rounded-sm">4</button>
      <span className="px-3 text-gray-400 tracking-widest">......</span>
      <button className="w-10 h-10 bg-gray-200 text-sm rounded-sm">12</button>
    </div>
  );
};

export default Pagination;
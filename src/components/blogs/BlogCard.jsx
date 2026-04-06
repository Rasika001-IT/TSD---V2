const BlogCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition duration-300">
      
      {/* IMAGE */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        
        {/* TAG */}
        <span className="inline-block bg-primary text-white text-[10px] font-semibold px-2 py-[2px] mb-3">
          {data.tag || "EXCLUSIVE"}
        </span>

        {/* TITLE */}
        <h3 className="font-heading text-[18px] leading-snug mb-2">
          {data.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="font-body text-sm text-gray-600 mb-3 leading-relaxed">
          {data.excerpt}
        </p>

        {/* CTA */}
        <button className="text-sm text-primary font-medium hover:underline">
          Read More
        </button>

      </div>
    </div>
  );
};

export default BlogCard;
const FeaturedStoryBlock = ({ data }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-12">

        {/* Text */}
        <div className="w-1/2 space-y-4">
          <h2 className="text-3xl font-heading font-semibold leading-snug">
            {data.title}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {data.description}
          </p>

          <p className="text-sm font-medium cursor-pointer hover:underline">
            Read Full Article
          </p>
        </div>

        {/* Image */}
        <div className="w-1/2">
          <img
            src={data.image}
            alt=""
            className="w-full h-[260px] object-cover rounded-md"
          />
        </div>

      </div>
    </section>
  );
};

export default FeaturedStoryBlock;
const StoryRow = ({ title, description, image, reverse }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className={`flex items-center gap-12 ${reverse ? "flex-row-reverse" : ""}`}>

          {/* Image */}
          <div className="w-1/2">
            <img
              src={image}
              alt=""
              className="w-full h-[260px] object-cover rounded-md"
            />
          </div>

          {/* Text */}
          <div className="w-1/2 space-y-4">
            <h3 className="text-2xl font-heading font-semibold leading-snug">
              {title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>

            <p className="text-sm font-medium cursor-pointer hover:underline">
              Read Full Article
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StoryRow;
const FeaturedCard = ({ article, variant }) => {
  const isHero = variant === "hero";

  return (
    <div className={isHero ? "mb-12" : "mb-8"}>
      
      {/* Image */}
      <div
        className={`w-full overflow-hidden ${
          isHero ? "h-[480px]" : "aspect-[2/1]"
        }`}
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2
        className={`mt-4 font-heading leading-snug ${
          isHero ? "text-3xl font-semibold" : "text-2xl font-semibold"
        }`}
      >
        {article.title}
      </h2>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-700 leading-relaxed max-w-[95%]">
        {article.description}
      </p>
    </div>
  );
};

export default FeaturedCard;
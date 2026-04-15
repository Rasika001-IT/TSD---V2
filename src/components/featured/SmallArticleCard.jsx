import { Link } from "react-router-dom";

const SmallArticleCard = ({
  article,
  categories,
}) => {
  const excludedSlugs = [
    "blogs",
    "news",
    "featured-articles",
    "magazine",
    "women-in-business",
    "editors-highlights",
  ];

  const matchedCategory =
    categories.find(
      (cat) =>
        article.categories.includes(cat.id) &&
        !excludedSlugs.includes(cat.slug)
    ) ||
    categories.find((cat) =>
      article.categories.includes(cat.id)
    );

  const categoryName =
    matchedCategory?.name || "Blogs";

  return (
    <div className="pb-8 border-b border-gray-200">
      <Link to={`/article/${article.slug}`}>
        <div className="w-full aspect-[16/10] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="mt-4">
        <span className="inline-block bg-[#C89632] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm">
          {categoryName}
        </span>
      </div>

      <Link to={`/article/${article.slug}`}>
        <h3 className="mt-3 text-xl font-heading font-semibold leading-snug hover:text-[#C89632] transition">
          {article.title}
        </h3>
      </Link>

      <p
        className="mt-2 text-sm text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html:
            article.excerpt
              .replace(/<[^>]+>/g, "")
              .slice(0, 120) + "...",
        }}
      />
    </div>
  );
};

export default SmallArticleCard;
import { Link } from "react-router-dom";

const FeaturedCard = ({ article }) => {
  return (
    <div className="mb-14 border-b border-gray-200 pb-10">
      <Link to={`/article/${article.slug}`}>
        <div className="w-full aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <Link to={`/article/${article.slug}`}>
        <h2 className="mt-5 text-3xl font-heading font-semibold leading-snug hover:text-[#C89632] transition">
          {article.title}
        </h2>
      </Link>

      <p className="mt-2 text-sm text-gray-500">
        Featured Articles • By {article.author}
      </p>

      <p
        className="mt-4 text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html:
            article.excerpt.slice(0, 180) + "...",
        }}
      />

      <Link
        to={`/article/${article.slug}`}
        className="inline-block mt-4 text-sm text-gray-500 hover:text-black"
      >
        Read More
      </Link>
    </div>
  );
};

export default FeaturedCard;
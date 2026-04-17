import FeaturedCard from "./FeaturedCard";
import Sidebar from "./Sidebar";

const FeaturedLayout = ({
  featuredPosts,
  blogPosts,
  categories,
  loading,
  onLoadMore,
  hasMore,
}) => {
  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-10 items-start">
      <div className="col-span-8">
        {featuredPosts.map((article) => (
          <FeaturedCard
            key={article.id}
            article={article}
          />
        ))}

        {hasMore && (
          <button
            onClick={onLoadMore}
            className="mt-6 px-5 py-2.5 bg-black text-white text-sm rounded-md hover:opacity-90 transition"
          >
            View More
          </button>
        )}
      </div>

      <div className="col-span-4 border-l border-gray-300 pl-8">
        <Sidebar
          posts={blogPosts}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default FeaturedLayout;
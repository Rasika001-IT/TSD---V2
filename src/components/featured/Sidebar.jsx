import SmallArticleCard from "./SmallArticleCard";

const Sidebar = ({ posts, categories }) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <SmallArticleCard
          key={post.id}
          article={post}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default Sidebar;
import SmallArticleCard from "./SmallArticleCard";
import CategoryList from "./CategoryList";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      <SmallArticleCard />
      <CategoryList />
    </div>
  );
};

export default Sidebar;
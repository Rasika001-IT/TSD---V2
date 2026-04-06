import FeaturedCard from "./FeaturedCard";
import Sidebar from "./Sidebar";

import kamiya from "../../assets/images/featured/kamiya.png";
import georgios from "../../assets/images/featured/georgios.png";
import rob from "../../assets/images/featured/rob.png";

const articles = [
  {
    id: 1,
    image: kamiya,
    title:
      "Storytelling With Purpose: Kamiya Jani’s Blueprint for Modern Media Success",
    description:
      "Kamiya Jani has quietly reshaped what it means to be a modern storyteller. Where many digital creators trade depth for virality, she has built a platform that marries journalistic rigor with the warmth of human travel narratives...",
  },
  {
    id: 2,
    image: georgios,
    title:
      "Georgios Matis: Bridging Science and Philosophy in the Fight Against Chronic Pain",
    description:
      "In the ever-evolving field of neurosurgery, few figures embody the fusion of cutting-edge technology and profound humanism...",
  },
  {
    id: 3,
    image: rob,
    title:
      "Rob Whitfield: Redefining Winning in the Age of Team Transformation",
    description:
      "When Rob Whitfield began his career in technology consulting, the work was clear-cut...",
  },
];

const FeaturedLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-10 items-start">
      
      {/* LEFT */}
      <div className="col-span-8">
        {articles.map((article, index) => (
          <FeaturedCard
            key={article.id}
            article={article}
            variant={index === 0 ? "hero" : "default"}
          />
        ))}

        <button className="mt-10 px-5 py-2.5 bg-black text-white text-sm rounded-md hover:opacity-90 transition">
          View More
        </button>
      </div>

      {/* RIGHT */}
      <div className="col-span-4">
        <Sidebar />
      </div>
    </div>
  );
};

export default FeaturedLayout;
import { Link } from "react-router-dom";

const HeroFeature = ({ data }) => {
  return (
    <section className="bg-gradient-to-r from-[#1c1f26] to-[#2a2f3a] py-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-12">

        <div className="w-1/2">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-[400px] object-cover rounded-md"
          />
        </div>

        <div className="w-1/2 space-y-6">
          <h1 className="text-4xl font-heading font-bold text-white leading-tight">
            {data.title}
          </h1>

          <p className="text-gray-300 leading-relaxed">
            {data.description}
          </p>

          <Link to={`/article/${data.slug}`}>
            <button className="bg-white text-black px-5 py-2 rounded text-sm font-medium">
              Read More
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HeroFeature;
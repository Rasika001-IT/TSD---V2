import Container from "../layout/Container";

import kamya from "../../assets/images/magazine/kamya-jani.png";
import georgios from "../../assets/images/magazine/georgios-matis.png";
import zarine from "../../assets/images/magazine/zarine-manchanda.png";
import rob from "../../assets/images/magazine/rob-whitfield.png";
import tia from "../../assets/images/magazine/tia-latrell.png";
import naphtali from "../../assets/images/magazine/naphtali-bryant.png";

const magazines = [
  {
    id: 1,
    title: "Most Innovative Entrepreneur of Year 2025",
    image: kamya,
  },
  {
    id: 2,
    title: "Most Trailblazer Leader to Follow in 2025",
    image: georgios,
  },
  {
    id: 3,
    title: "Most Prominent Leader to Follow in 2025",
    image: zarine,
  },
  {
    id: 4,
    title: "Most Empowering Business Leader in 2025",
    image: rob,
  },
  {
    id: 5,
    title: "Most Visionary Woman Leader in 2025",
    image: tia,
  },
  {
    id: 6,
    title: "Most Inspiring Business Leader in 2025",
    image: naphtali,
  },
];

const MagazineGrid = () => {
  return (
    <section className="py-20 pt-10">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-3 text-white">
            The Magazine
          </h2>

          <p className="font-body text-sm text-gray-400 mb-5 max-w-xl mx-auto">
            Discover inspiring journeys, bold ideas, and success stories from leaders across industries.
          </p>

          <div className="w-24 h-[2px] bg-primary mx-auto"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {magazines.map((item) => (
            <div key={item.id} className="text-center group cursor-pointer">

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* TITLE */}
              <h3 className="mt-5 font-heading font-semibold text-lg lg:text-xl text-gray-200 leading-snug">
                {item.title}
              </h3>

            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-3 mt-16">

          {/* ACTIVE */}
          <button className="w-10 h-10 flex items-center justify-center bg-white text-black text-sm font-medium rounded">
            1
          </button>

          {/* OTHER PAGES */}
          <button className="w-10 h-10 flex items-center justify-center bg-white/10 text-white text-sm rounded hover:bg-white/20 transition">
            2
          </button>

          <button className="w-10 h-10 flex items-center justify-center bg-white/10 text-white text-sm rounded hover:bg-white/20 transition">
            3
          </button>

          {/* DOTS */}
          <span className="text-white/60 px-2 tracking-widest">...</span>

          <button className="w-10 h-10 flex items-center justify-center bg-white/10 text-white text-sm rounded hover:bg-white/20 transition">
            8
          </button>

        </div>

      </Container>
    </section>
  );
};

export default MagazineGrid;
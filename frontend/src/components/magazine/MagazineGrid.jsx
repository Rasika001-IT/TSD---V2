import Container from "../layout/Container";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    slug: "kamiya-jani",
  },
  {
    id: 2,
    title: "Most Trailblazer Leader to Follow in 2025",
    image: georgios,
    slug: "georgios-matis",
  },
  {
    id: 3,
    title: "Most Prominent Leader to Follow in 2025",
    image: zarine,
    slug: "zarine-manchanda",
  },
  {
    id: 4,
    title: "Most Empowering Business Leader in 2025",
    image: rob,
    slug: "rob-whitfield",
  },
  {
    id: 5,
    title: "Most Visionary Woman Leader in 2025",
    image: tia,
    slug: "tia-latrell",
  },
  {
    id: 6,
    title: "Most Inspiring Business Leader in 2025",
    image: naphtali,
    slug: "naphtali",
  },
  {
    id: 7,
    title: "Most Visionary Women Leader in 2025",
    image: "https://thesuccessdigest.com/wp-content/uploads/2025/07/Kristin-Magazine-1-2.png",
    slug: "kristin",
  },
];

const MagazineGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(magazines.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = magazines.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {currentItems.map((item) => (
            <Link key={item.id} to={`/article/${item.slug}`}>
              <div className="text-center group cursor-pointer">

                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-5 font-heading font-semibold text-lg lg:text-xl text-gray-200 leading-snug">
                  {item.title}
                </h3>

              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-3 mt-16">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center text-sm rounded transition ${
                  currentPage === page
                    ? "bg-white text-black font-medium"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default MagazineGrid;
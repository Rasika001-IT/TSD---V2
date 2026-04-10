import Container from "../layout/Container";
import { Link } from "react-router-dom";

import img1 from "../../assets/images/women/women-1.png";
import img2 from "../../assets/images/women/women-2.png";
import img3 from "../../assets/images/women/women-3.png";
import img4 from "../../assets/images/women/women-4.png";

const profiles = [
  {
    image: img1,
    name: "Zarine Manchanda",
    role: "CEO, Zarine Manchanda Company",
    quote: "A Legacy of Purpose, Power, and Philanthropy",
    slug: "zarine-manchanda",
  },
  {
    image: img2,
    name: "Kamiya Jani",
    role: "Founder & Editor In Chief, Curly Tales",
    quote: "Kamiya Jani’s Blueprint for Modern Media Success",
    slug: "kamiya-jani",
  },
  {
    image: img3,
    name: "Tia Latrell",
    role: "Latrell Flowers, LLC",
    quote: "From Basement Blooms to Celebrity Floral Empire",
    slug: "tia-latrell",
  },
  {
    image: img4,
    name: "Kristin Marquet",
    role: "Founder, Marquet Media",
    quote: "Crafting Brands with Soul and Strategy",
    slug: "kristin",
  },
];

const WomenInBusiness = () => {
  return (
    <section className="bg-[#C89632]/5 py-24">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
            Special Features
          </span>

          <h2 className="font-heading text-4xl font-bold mt-4">
            Women in Business
          </h2>

          <p className="text-sm text-black/70 max-w-xl mx-auto mt-3 leading-relaxed">
            Celebrating the visionary women who are breaking barriers and reshaping industries across the globe.
          </p>

          <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-4"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {profiles.map((item, index) => (
            <Link key={index} to={`/article/${item.slug}`}>
              <div className="relative group cursor-pointer overflow-hidden">

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[420px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/75 transition-all duration-500 text-white">

                  <h3 className="font-heading font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-xs mt-1 opacity-80">
                    {item.role}
                  </p>

                  <p className="text-xs mt-2 italic opacity-80">
                    “{item.quote}”
                  </p>

                  <p className="text-xs mt-3 font-medium">
                    Read Story →
                  </p>

                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-14">
          <Link to="/women-in-business">
  <button className="bg-black text-white px-6 py-3 text-sm rounded-[5px] hover:opacity-80 transition">
    Explore All Profiles
  </button>
</Link>
        </div>

      </Container>
    </section>
  );
};

export default WomenInBusiness;
import Container from "../layout/Container";

import blog1 from "../../assets/images/blogs/blog-1.png";
import blog2 from "../../assets/images/blogs/blog-2.png";
import blog3 from "../../assets/images/blogs/blog-3.png";
import blog4 from "../../assets/images/blogs/blog-4.png";
import blog5 from "../../assets/images/blogs/blog-5.png";
import blog6 from "../../assets/images/blogs/blog-6.png";
import blog7 from "../../assets/images/blogs/blog-7.png";
import blog8 from "../../assets/images/blogs/blog-8.png";

const data = [
  {
    tag: "Exclusive",
    image: blog1,
    title: "Inside the Boardrooms of Tomorrow",
    desc: "How the next generation of executive is redefining corporate governance.",
  },
  {
    tag: "Investigation",
    image: blog2,
    title: "The Global Supply Chain Revolution",
    desc: "Companies that transformed their logistics are now leading their industries.",
  },
  {
    tag: "Exclusive",
    image: blog3,
    title: "The Rise of Sustainable Leadership",
    desc: "CEOs who are putting environmental responsibility at the core of business.",
  },
  {
    tag: "Exclusive",
    image: blog4,
    title: "Inside the Boardrooms of Tomorrow",
    desc: "How the next generation of executive is redefining corporate governance.",
  },
  {
    tag: "Exclusive",
    image: blog5,
    title: "Inside the Boardrooms of Tomorrow",
    desc: "How the next generation of executive is redefining corporate governance.",
  },
  {
    tag: "Investigation",
    image: blog6,
    title: "The Global Supply Chain Revolution",
    desc: "Companies that transformed their logistics are now leading their industries.",
  },
  {
    tag: "Exclusive",
    image: blog7,
    title: "The Rise of Sustainable Leadership",
    desc: "CEOs who are putting environmental responsibility at the core of business.",
  },
  {
    tag: "Exclusive",
    image: blog8,
    title: "Inside the Boardrooms of Tomorrow",
    desc: "How the next generation of executive is redefining corporate governance.",
  },
];

const Blogs = () => {
  return (
    <section className="bg-[#C89632]/5 py-24">

      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">

          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Latest Stories
            </span>

            <h2 className="font-heading font-bold text-4xl">
              Blogs
            </h2>
          </div>

          <button className="text-sm font-medium hover:opacity-70 transition">
            View All Articles
          </button>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {data.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt=""
                className="w-full h-[220px] object-cover"
              />

              {/* CONTENT */}
              <div className="bg-white p-5 flex flex-col flex-grow">

                {/* TAG */}
                <span className="bg-[#C89632] text-white text-[10px] px-2 py-1 uppercase tracking-wide w-fit">
                  {item.tag}
                </span>

                {/* TITLE */}
                <h3 className="font-heading font-semibold text-[16px] mt-3 leading-snug">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-[13px] text-black/60 mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* PUSH CTA TO BOTTOM */}
                <div className="mt-auto pt-4">
                  <p className="text-[#C89632] text-sm font-medium cursor-pointer hover:underline">
                    Read More
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </Container>

    </section>
  );
};

export default Blogs;
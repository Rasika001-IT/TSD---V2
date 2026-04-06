import Container from "../layout/Container";
import mainImage from "../../assets/images/hero.png";
import sideImage from "../../assets/images/article.png";

const sideArticles = [
  {
    title: "The Rise of Sustainable Investing",
    desc: "ESG funds are outperforming traditional investments.",
    meta: "Emily Roberts | 5 min read",
  },
  {
    title: "Building Resilient Teams in Uncertain Times",
    desc: "Strategies from top executives on fostering adaptability.",
    meta: "Michael Torres | 6 min read",
  },
  {
    title: "From Garage to Unicorn: Success Stories",
    desc: "Inside the journeys of billion-dollar startups.",
    meta: "Lisa Park | 7 min read",
  },
  {
    title: "Global Trade Post-Pandemic Patterns",
    desc: "How supply chains are being reimagined worldwide.",
    meta: "David Kim | 6 min read",
  },
  {
    title: "Global Trade Post-Pandemic Patterns",
    desc: "How supply chains are being reimagined worldwide.",
    meta: "David Kim | 6 min read",
  },
];

const FeaturedArticles = () => {
  return (
    <section className="bg-[#C89632]/5 py-20">

      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">

          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Cover Story
            </span>

            <h2 className="font-heading font-bold text-4xl">
              Featured Articles
            </h2>
          </div>

          <button className="text-sm font-medium mb-1 hover:opacity-70 transition">
            View All Articles
          </button>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12">

          {/* LEFT BIG ARTICLE */}
          <div>
            <img
              src={mainImage}
              alt="featured"
              className="w-full h-[420px] object-cover"
            />

            <h3 className="font-heading font-semibold text-2xl mt-6 leading-snug">
              How Artificial Intelligence is Transforming Healthcare Delivery
            </h3>

            <p className="text-sm text-black/70 mt-3 max-w-xl">
              From diagnostic to drug discovery, AI is revolutionizing every aspect of modern medicine
            </p>

            <p className="text-xs text-black/50 mt-3">
              James Chen | 8 min read
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">

            {sideArticles.map((article, index) => (
              <div key={index} className="flex gap-4 items-start">

                {/* IMAGE */}
                <img
                  src={sideImage}
                  alt="side"
                  className="w-[150px] h-[80px] object-cover"
                />

                {/* TEXT */}
                <div className="flex flex-col max-w-[260px]">

                  {/* TITLE */}
                  <p className="font-heading font-semibold text-[14px] leading-tight truncate">
                    {article.title}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-[13px] text-black/70 mt-1 truncate">
                    {article.desc}
                  </p>

                  {/* META */}
                  <p className="text-[12px] text-black/50 mt-1.5 truncate">
                    {article.meta}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </Container>

    </section>
  );
};

export default FeaturedArticles;
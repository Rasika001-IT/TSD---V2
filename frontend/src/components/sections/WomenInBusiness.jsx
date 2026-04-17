import Container from "../layout/Container";
import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

// STATIC IMAGES
import ZarineImg from "../../assets/images/women/women-1.png";
import KristineImg from "../../assets/images/women/women-2.png";
import TiaImg from "../../assets/images/women/women-3.png";
import KamiyaImg from "../../assets/images/women/women-4.png";

const WOMEN_IMAGES = [
  ZarineImg,
  KristineImg,
  TiaImg,
  KamiyaImg,
];

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit).trim() + "...";
};

const WomenInBusiness = () => {
  const { posts, loading } = usePosts(135, 4);

  if (loading) return null;

  if (!posts.length) {
    console.log("No Women of Impact posts found.");
    return null;
  }

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

          {posts.map((post, index) => (
            <Link key={post.id} to={`/women-in-business/${post.slug}`}>
              <div className="relative group cursor-pointer overflow-hidden">

                <img
                  src={WOMEN_IMAGES[index]}
                  alt={stripHtml(post.title)}
                  className="w-full h-[420px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/75 transition-all duration-500 text-white">

                  <h3
                    className="font-heading font-semibold text-lg"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  <p className="text-xs mt-2 italic opacity-80">
                    “{truncateText(stripHtml(post.excerpt), 70)}”
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
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import NewsHero from "../components/news/NewsHero";
import NewsList from "../components/news/NewsList";
import Pagination from "../components/news/Pagination";

const News = () => {
  return (
    <>
      <Navbar />

      {/* BACKGROUND WRAPPER */}
      <div className="bg-[#C89632]/5">
        <NewsHero />
        <NewsList />
        <Pagination />
        <Newsletter />
      </div>

      <Footer />
    </>
  );
};

export default News;
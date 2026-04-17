import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import TrendingMarquee from "../components/sections/TrendingMarquee";
import FeaturedArticles from "../components/sections/FeaturedArticles";
import Magazine from "../components/sections/Magazine";
import WomenInBusiness from "../components/sections/WomenInBusiness";
import BusinessFinance from "../components/sections/BusinessFinance";
import MoreSections from "../components/sections/MoreSections";
import Blogs from "../components/sections/Blogs";
import EditorsPick from "../components/sections/EditorsPick";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";
import MagazineSection from "../components/MagazineSection";

const Home = () => {
  return (
    <div className="bg-[#FCF9F4]">
      <Navbar />
      <Hero />
      <TrendingMarquee />
      <FeaturedArticles />
      <MagazineSection />
      <WomenInBusiness />
      <BusinessFinance />
      <MoreSections />
      <Blogs />
      <EditorsPick />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
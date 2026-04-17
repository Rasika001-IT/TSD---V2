import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import BlogHero from "../components/blogs/BlogHero";
import BlogGrid from "../components/blogs/BlogGrid";

const Blogs = () => {
  return (
    <>
      <Navbar />

      <BlogHero />

      <BlogGrid />

      <Newsletter />

      <Footer />
    </>
  );
};

export default Blogs;
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import FeaturedLayout from "../components/featured/FeaturedLayout";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";

import {
  fetchCategories,
  fetchPostsByCategory,
} from "../services/wordpress";

const Featured = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPage = async () => {
      try {
        setLoading(true);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const featuredCategory = categoriesData.find(
          (cat) => cat.slug === "featured-articles"
        );

        const blogCategory = categoriesData.find(
          (cat) => cat.slug === "blogs"
        );

        if (!featuredCategory || !blogCategory) return;

        const [featuredData, blogData] = await Promise.all([
          fetchPostsByCategory(featuredCategory.id, 50),
          fetchPostsByCategory(blogCategory.id, 6),
        ]);

        setFeaturedPosts(featuredData);
        setBlogPosts(blogData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPage();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen">
      <Navbar />

      <Container>
        <h1 className="text-4xl font-heading font-bold mt-12 mb-10">
          Featured Articles
        </h1>

        <FeaturedLayout
          featuredPosts={featuredPosts.slice(0, visibleCount)}
          blogPosts={blogPosts}
          categories={categories}
          loading={loading}
          onLoadMore={handleLoadMore}
          hasMore={visibleCount < featuredPosts.length}
        />
      </Container>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Featured;
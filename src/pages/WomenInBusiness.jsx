import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import HeroFeature from "../components/sections/women/HeroFeature";
import FeaturedStoryBlock from "../components/sections/women/FeaturedStoryBlock";
import StoryRow from "../components/sections/women/StoryRow";

import { Link } from "react-router-dom";

// Image Imports
import heroImg from "../assets/images/women/page/hero-woman.png";
import kamiyaImg from "../assets/images/women/page/kamiya-jani.png";
import kristinImg from "../assets/images/women/page/kristin-marquet.png";
import financeImg from "../assets/images/women/page/women-finance.png";
import zarineImg from "../assets/images/women/page/zarine-manchanda.png";

const WomenInBusiness = () => {
  // Hero Section Data
  const heroData = {
    title: "Most Visionary Woman Leader in 2025",
    slug: "most-visionary-women-leader-in-2025",
    description:
      "In the vibrant world of floral design, where creativity meets emotion, this visionary leader has transformed a humble beginning into a globally recognized brand.",
    image: heroImg,
  };

  // Featured Story
  const featuredStory = {
    title: "Crafting Brands with Soul and Strategy",
    slug: "kristin", // ✅ FIXED
    description:
      "When I started Marquet Media in 2009, I didn’t just want to build a branding firm—I wanted to create a space where strategy meets soul.",
    image: kristinImg,
  };

  // Story Rows
  const stories = [
    {
      title:
        "Women in Finance and Leadership 2025: Trends, Challenges, and Pathways to Success",
      slug: "women-in-finance-2025", // ✅ NEW
      description:
        "Women in finance and leadership continue to reshape an industry long dominated by male voices.",
      image: financeImg,
    },
    {
      title:
        "Storytelling With Purpose: Kamiya Jani’s Blueprint for Modern Media Success",
      slug: "kamiya-jani",
      description:
        "Kamiya Jani has quietly reshaped what it means to be a modern storyteller.",
      image: kamiyaImg,
    },
    {
      title:
        "Dr. Zarine Manchanda: A Legacy of Purpose, Power, and Philanthropy",
      slug: "zarine-manchanda",
      description:
        "Dr. Zarine Manchanda’s story is one of resilience and impact.",
      image: zarineImg,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <Link to={`/article/${heroData.slug}`}>
        <HeroFeature data={heroData} />
      </Link>

      {/* Featured Block */}
      <Link to={`/article/${featuredStory.slug}`}>
        <FeaturedStoryBlock data={featuredStory} />
      </Link>

      {/* Story Rows */}
      {stories.map((story, index) => (
        <Link key={index} to={`/article/${story.slug}`}>
          <StoryRow
            {...story}
            reverse={index % 2 !== 0}
          />
        </Link>
      ))}

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default WomenInBusiness;
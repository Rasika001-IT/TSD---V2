import { useParams } from "react-router-dom";
import { articles } from "../data/articles";
import usePosts from "../hooks/usePosts";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";

const ArticlePage = () => {
  const { slug } = useParams();

  const { posts, loading } = usePosts();

  // 🔹 Find article from BOTH sources
  const localArticle = articles.find((a) => a.slug === slug);
  const wpArticle = posts.find((p) => p.slug === slug);

  const article = localArticle || wpArticle;

  if (loading) return <div className="p-20">Loading...</div>;
  if (!article) return <div className="p-20">Article not found</div>;

  return (
    <>
      <Navbar />

      <section className="bg-[#FCF9F4] py-16">
        <div className="max-w-[900px] mx-auto px-6">

          {/* IMAGE */}
          {article.image && (
            <img
              src={article.image}
              alt="article"
              className="w-full h-[400px] object-cover mb-10"
            />
          )}

          {/* TITLE */}
          <h1
            className="font-heading text-3xl md:text-4xl font-bold leading-snug"
            dangerouslySetInnerHTML={{
              __html: article.title?.rendered || article.title,
            }}
          />

          {/* CONTENT */}
          <div
            className="mt-8 text-[15px] text-black/80 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: article.content?.rendered || article.content,
            }}
          />

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArticlePage;
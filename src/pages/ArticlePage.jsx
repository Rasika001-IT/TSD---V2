import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import usePosts from "../hooks/usePosts";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

const ArticlePage = () => {
  const { slug } = useParams();
  const { posts, loading } = usePosts();

  const localArticle = articles.find((a) => a.slug === slug);
  const wpArticle = posts.find((p) => p.slug === slug);

  const article = localArticle || wpArticle;

  if (loading) return <div className="p-20">Loading...</div>;
  if (!article) return <div className="p-20">Article not found</div>;

  const relatedPosts = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4]">

        {/* ARTICLE SECTION */}
        <section className="max-w-[1050px] mx-auto px-6 py-20">

          {/* HERO IMAGE */}
          {article.image && (
            <img
              src={article.image}
              alt="article"
              className="w-full h-[550px] object-cover rounded-sm mb-14"
            />
          )}

          {/* META */}
          <p className="text-sm text-black/50 mb-4 tracking-[2px] uppercase">
            Featured • Editor's Pick
          </p>

          {/* TITLE */}
          <h1
            className="font-heading text-5xl md:text-6xl font-bold leading-[1.1] mb-8"
            dangerouslySetInnerHTML={{
              __html: article.title?.rendered || article.title,
            }}
          />

          {/* AUTHOR/DATE */}
          <p className="text-sm text-black/60 mb-14">
            By The Success Digest Editorial Team • April 2026
          </p>

          {/* CONTENT */}
          <div
            className="
              prose
              max-w-none
              prose-headings:font-heading
              prose-headings:text-[#1D1F26]
              prose-p:text-[17px]
              prose-p:leading-[2]
              prose-p:mb-8
              prose-li:text-[17px]
              prose-li:leading-[2]
              prose-strong:text-black
              prose-h2:text-3xl
              prose-h2:mt-14
              prose-h2:mb-6
              prose-ul:mb-8
            "
            dangerouslySetInnerHTML={{
              __html: article.content?.rendered || article.content,
            }}
          />

          {/* DIVIDER */}
          <div className="flex justify-center my-20">
            <div className="w-24 h-[3px] bg-[#C89632]" />
          </div>

          {/* PREV/NEXT */}
          <div className="flex justify-between text-sm text-black/50 border-t border-b border-black/10 py-7">
            <button className="hover:text-black transition">
              ← Previous Post
            </button>

            <button className="hover:text-black transition">
              Next Post →
            </button>
          </div>

        </section>

        {/* MUST READ */}
        <section className="max-w-[1050px] mx-auto px-6 py-14">
          <h2 className="font-heading text-5xl font-bold mb-14">
            Must Read
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            {relatedPosts.map((post) => (
              <Link key={post.slug} to={`/article/${post.slug}`}>
                <div className="group cursor-pointer">

                  <div className="overflow-hidden mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <h3
                    className="font-heading text-3xl leading-snug group-hover:text-[#C89632] transition"
                    dangerouslySetInnerHTML={{
                      __html: post.title?.rendered || post.title,
                    }}
                  />

                  <p className="text-sm text-black/50 mt-3">
                    Industries, Markets, News
                  </p>

                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* COMMENT SECTION */}
        <section className="max-w-[1050px] mx-auto px-6 py-24 text-center">
          <h2 className="font-heading text-5xl font-bold mb-5">
            Leave a Comment
          </h2>

          <p className="text-sm text-black/50 mb-12">
            Your email address will not be published. Required fields are marked *
          </p>

          <textarea
            placeholder="Type here..."
            className="w-full h-44 border border-black/10 bg-white p-5 mb-6 outline-none resize-none"
          />

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <input
              type="text"
              placeholder="Name*"
              className="border border-black/10 p-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email*"
              className="border border-black/10 p-4 outline-none"
            />

            <input
              type="text"
              placeholder="Website url"
              className="border border-black/10 p-4 outline-none"
            />
          </div>

          <button className="bg-black text-white px-10 py-3 hover:bg-[#C89632] transition">
            Post Comment
          </button>
        </section>

        <Newsletter />

      </main>

      <Footer />
    </>
  );
};

export default ArticlePage;
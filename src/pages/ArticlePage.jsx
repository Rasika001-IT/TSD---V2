import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import {
  fetchPostBySlug,
  fetchCategories,
  fetchTags,
  fetchPosts,
} from "../services/wordpress";

const ArticlePage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [taxonomyData, setTaxonomyData] = useState([]);
  const [mustReadPosts, setMustReadPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);

        const [wpPost, categories, tags, allPosts] =
          await Promise.all([
            fetchPostBySlug(slug),
            fetchCategories(),
            fetchTags(),
            fetchPosts(),
          ]);

        if (!wpPost) return;

        setPost(wpPost);

        const categoryItems = categories
          .filter((cat) =>
            wpPost.categories.includes(cat.id)
          )
          .map((cat) => ({
            name: cat.name,
            slug: cat.slug,
            type: "category",
          }));

        const tagItems = tags
          .filter((tag) =>
            wpPost.tags.includes(tag.id)
          )
          .map((tag) => ({
            name: tag.name,
            slug: tag.slug,
            type: "tag",
          }));

        setTaxonomyData([
          ...categoryItems,
          ...tagItems,
        ]);

        const related = allPosts
          .filter((p) => p.slug !== slug)
          .slice(0, 2);

        setMustReadPosts(related);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-[#FCF9F4]">
          Loading...
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-[#FCF9F4]">
          Article not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">
        <section className="max-w-[1100px] mx-auto px-6 py-14">

          {/* HERO IMAGE */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[500px] object-cover mb-8"
            />
          )}

          {/* TITLE */}
          <h1 className="font-heading text-5xl leading-tight mb-4">
            {post.title.replace(/<[^>]+>/g, "")}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-1 text-sm text-gray-500 mb-10">
            {taxonomyData.map((item, i) => (
              <Link
                key={i}
                to={`/${item.type}/${item.slug}`}
                className="hover:text-black"
              >
                {item.name}
                {i < taxonomyData.length - 1 && ","}
              </Link>
            ))}

            <span>/</span>

            <Link
              to={`/author/${post.authorSlug}`}
              className="hover:text-black"
            >
              By {post.author}
            </Link>
          </div>

          {/* CONTENT */}
          <article
            className="
              prose 
              prose-lg 
              max-w-none
              prose-headings:font-heading
              prose-headings:text-[#1D1F26]
              prose-headings:mb-4
              prose-headings:mt-10
              prose-p:mb-5
              prose-p:leading-8
              prose-li:leading-8
              prose-strong:text-[#1D1F26]
            "
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />

          {/* DIVIDER */}
          <div className="flex justify-center my-14">
            <div className="w-14 h-[2px] bg-[#C89632]" />
          </div>

          <p className="text-center text-gray-500 mb-14">
            Thank you for reading The Success Digest.
          </p>

          <div className="flex justify-center mb-14">
            <div className="w-14 h-[2px] bg-[#C89632]" />
          </div>

          {/* PREV NEXT */}
          <div className="flex justify-between border-y py-6 mb-20 text-sm text-gray-400">
            <button>← Previous Post</button>
            <button>Next Post →</button>
          </div>

          {/* MUST READ */}
          <section className="mb-24">
            <h2 className="font-heading text-5xl mb-10">
              Must Read
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {mustReadPosts.map((item) => (
                <Link
                  key={item.slug}
                  to={`/article/${item.slug}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[240px] object-cover mb-4"
                  />

                  <h3 className="font-heading text-2xl leading-snug">
                    {item.title.replace(/<[^>]+>/g, "")}
                  </h3>
                </Link>
              ))}
            </div>
          </section>

          {/* COMMENT SECTION */}
          <section className="text-center">
            <h2 className="font-heading text-5xl mb-2">
              Leave a Comment
            </h2>

            <p className="text-gray-400 mb-8">
              Your email address will not be published.
            </p>

            <textarea
              placeholder="Type here..."
              className="w-full h-40 p-4 border mb-5"
            />

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <input
                placeholder="Name"
                className="border p-3"
              />
              <input
                placeholder="Email"
                className="border p-3"
              />
              <input
                placeholder="Website"
                className="border p-3"
              />
            </div>

            <button className="bg-black text-white px-8 py-3">
              Post Comment
            </button>
          </section>

        </section>

        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default ArticlePage;
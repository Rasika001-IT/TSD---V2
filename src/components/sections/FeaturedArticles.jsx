import Container from "../layout/Container";
import useCategoryPosts from "../../hooks/useCategoryPosts";
import { Link } from "react-router-dom";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const getReadTime = (content) => {
  const text = stripHtml(content);
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const FeaturedArticles = () => {
  const { posts, loading } = useCategoryPosts(
    "news",
    true
  );

  if (loading) {
    return (
      <p className="py-20 text-center">
        Loading...
      </p>
    );
  }

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 6);

  if (!mainPost) return null;

  return (
    <section className="bg-[#C89632]/5 py-20">
      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Latest Updates
            </span>

            <h2 className="font-heading font-bold text-4xl">
              News
            </h2>
          </div>

          <Link
            to="/news"
            className="text-sm font-medium mb-1 hover:opacity-70 transition"
          >
            View All Articles
          </Link>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12">

          {/* MAIN POST */}
          <Link to={`/article/${mainPost.slug}`}>
            <div className="cursor-pointer hover:opacity-90 transition">

              {mainPost.image && (
                <img
                  src={mainPost.image}
                  alt={stripHtml(mainPost.title)}
                  className="w-full h-[420px] object-cover"
                />
              )}

              <h3
                className="font-heading font-semibold text-2xl mt-6 leading-snug"
                dangerouslySetInnerHTML={{
                  __html: mainPost.title,
                }}
              />

              <div
                className="text-sm text-black/70 mt-3 max-w-xl"
                dangerouslySetInnerHTML={{
                  __html: mainPost.excerpt,
                }}
              />

              <p className="text-xs text-black/50 mt-4">
                {mainPost.author} |{" "}
                {getReadTime(mainPost.content)} min
                read
              </p>

            </div>
          </Link>

          {/* SIDE POSTS */}
          <div className="flex flex-col gap-5">

            {sidePosts.map((post) => (
              <Link
                to={`/article/${post.slug}`}
                key={post.id}
              >
                <div className="flex gap-4 items-start cursor-pointer hover:opacity-80 transition">

                  {post.image && (
                    <img
                      src={post.image}
                      alt={stripHtml(post.title)}
                      className="w-[150px] h-[80px] object-cover"
                    />
                  )}

                  <div className="flex flex-col max-w-[260px]">

                    <p
                      className="font-heading font-semibold text-[14px] leading-tight line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: post.title,
                      }}
                    />

                    <div
                      className="text-[13px] text-black/70 mt-1 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                    />

                    <p className="text-xs text-black/50 mt-2">
                      {post.author} |{" "}
                      {getReadTime(post.content)}{" "}
                      min read
                    </p>

                  </div>

                </div>
              </Link>
            ))}

          </div>

        </div>

      </Container>
    </section>
  );
};

export default FeaturedArticles;
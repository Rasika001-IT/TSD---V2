import Container from "../layout/Container";
import usePosts from "../../hooks/usePosts";
import { Link } from "react-router-dom";

const FeaturedArticles = () => {
  const { posts, loading } = usePosts();

  if (loading) return <p className="py-20 text-center">Loading...</p>;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 6);

  return (
    <section className="bg-[#C89632]/5 py-20">
      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Cover Story
            </span>

            <h2 className="font-heading font-bold text-4xl">
              Featured Articles
            </h2>
          </div>

          <button className="text-sm font-medium mb-1 hover:opacity-70 transition">
            View All Articles
          </button>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12">

          {/* LEFT BIG ARTICLE */}
          {mainPost && (
            <Link to={`/article/${mainPost.slug}`}>
              <div className="cursor-pointer hover:opacity-90 transition">
                {mainPost.image && (
                  <img
                    src={mainPost.image}
                    alt="featured"
                    className="w-full h-[420px] object-cover"
                  />
                )}

                <h3
                  className="font-heading font-semibold text-2xl mt-6 leading-snug"
                  dangerouslySetInnerHTML={{ __html: mainPost.title }}
                />

                <div
                  className="text-sm text-black/70 mt-3 max-w-xl"
                  dangerouslySetInnerHTML={{ __html: mainPost.excerpt }}
                />
              </div>
            </Link>
          )}

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">
            {sidePosts.map((post) => (
              <Link to={`/article/${post.slug}`} key={post.id}>
                <div className="flex gap-4 items-start cursor-pointer hover:opacity-80 transition">

                  {/* IMAGE */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="side"
                      className="w-[150px] h-[80px] object-cover"
                    />
                  )}

                  {/* TEXT */}
                  <div className="flex flex-col max-w-[260px]">

                    {/* TITLE */}
                    <p
                      className="font-heading font-semibold text-[14px] leading-tight line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    {/* DESCRIPTION */}
                    <div
                      className="text-[13px] text-black/70 mt-1 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

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
import Container from "../layout/Container";
import usePosts from "../../hooks/usePosts";

const BlogHero = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <section className="py-16">
        <Container>
          <div className="relative h-[460px] flex items-center justify-center">
            <p className="text-lg">Loading featured post...</p>
          </div>
        </Container>
      </section>
    );
  }

  // Get the latest post for hero section
  const featuredPost = posts[0];

  return (
    <section className="py-16">
      <Container>
        <div className="relative h-[460px]">
          
          {/* IMAGE */}
          <div className="absolute right-0 top-0 w-[65%] h-full">
            {featuredPost?.image ? (
              <img
                src={featuredPost.image}
                alt="Featured Blog"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* CARD */}
          {featuredPost && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] bg-white/70 backdrop-blur-xl px-14 py-12 rounded-md shadow-xl text-center">
      
              <h1 
                className="font-heading text-4xl lg:text-[42px] leading-tight mb-5 font-bold"
                dangerouslySetInnerHTML={{ __html: featuredPost.title }}
              />

              <p 
                className="text-gray-600 text-[15px] font-body leading-relaxed max-w-[560px] mx-auto"
                dangerouslySetInnerHTML={{ 
                  __html: featuredPost.excerpt.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                }}
              />

              <div className="mt-4 text-sm text-gray-500">
                By {featuredPost.author || "TSD Staff"} • {new Date(featuredPost.date).toLocaleDateString()}
              </div>

            </div>
          )}

        </div>
      </Container>
    </section>
  );
};

export default BlogHero;
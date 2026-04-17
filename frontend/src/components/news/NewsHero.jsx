import Container from "../layout/Container";
import { Link } from "react-router-dom";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const NewsHero = ({ post }) => {
  if (!post) return null;

  return (
    <section className="pt-16 pb-12">
      <Container>

        {/* IMAGE FIRST */}
        <div className="flex justify-center mb-10">
          <Link to={`/article/${post.slug}`}>
            <img
              src={post.image}
              alt="news"
              className="w-full max-w-[1000px] h-[480px] object-cover rounded-sm"
            />
          </Link>
        </div>

        {/* TITLE + EXCERPT BELOW */}
        <div className="max-w-[820px] mx-auto text-center">
          <Link to={`/article/${post.slug}`}>
            <h1
              className="font-heading font-bold text-[36px] leading-[1.25] mb-4 hover:opacity-80"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </Link>

          <p className="font-body text-[15px] text-gray-600 leading-[1.6]">
            {stripHtml(post.excerpt)}
          </p>
        </div>

      </Container>
    </section>
  );
};

export default NewsHero;
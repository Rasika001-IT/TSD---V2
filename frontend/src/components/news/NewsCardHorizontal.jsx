import { Link } from "react-router-dom";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const NewsCardHorizontal = ({ post }) => {
  return (
    <Link to={`/article/${post.slug}`}>
      <div className="flex gap-8 items-start cursor-pointer group transition-all duration-300 hover:opacity-90">

        <img
          src={post.image}
          alt="news"
          className="w-[260px] h-[170px] object-cover flex-shrink-0 rounded-sm transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />

        <div className="max-w-[520px]">

          <h3
            className="font-heading text-[18px] leading-[1.4] mb-2 group-hover:underline"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          <p className="font-body text-[14px] text-gray-600 leading-[1.6] mb-2">
            {stripHtml(post.excerpt)}
          </p>

          <span className="font-body text-[12px] text-gray-400">
            {post.author}
          </span>

        </div>

      </div>
    </Link>
  );
};

export default NewsCardHorizontal;
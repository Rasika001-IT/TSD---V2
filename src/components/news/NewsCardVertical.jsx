import { Link } from "react-router-dom";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const NewsCardVertical = ({ post }) => {
  return (
    <Link to={`/article/${post.slug}`}>
      <div className="cursor-pointer group transition-all duration-300 hover:opacity-90 space-y-2">

        <img
          src={post.image}
          alt="news"
          className="w-full h-[170px] object-cover rounded-sm transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        <h3
          className="font-heading text-[15px] leading-[1.5] group-hover:underline"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <p className="font-body text-[13.5px] text-gray-600 leading-[1.6]">
          {stripHtml(post.excerpt)}
        </p>

      </div>
    </Link>
  );
};

export default NewsCardVertical;
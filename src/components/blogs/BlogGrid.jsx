import Container from "../layout/Container";
import BlogCard from "./BlogCard";
import articleImg from "../../assets/images/article.png";

const blogs = [
  {
    id: 1,
    title: "Inside the Boardrooms of Tomorrow",
    excerpt: "How the next generation of executive is redefining corporate governance.",
    image: articleImg,
    tag: "EXCLUSIVE",
  },
  {
    id: 2,
    title: "The Global Supply Chain Revolution",
    excerpt: "Companies that transformed their logistics are now leading their industries.",
    image: articleImg,
    tag: "INVESTIGATION",
  },
  {
    id: 3,
    title: "The Rise of Sustainable Leadership",
    excerpt: "CEOs who are putting environmental responsibility at the core of business.",
    image: articleImg,
    tag: "EXCLUSIVE",
  },
  {
    id: 4,
    title: "Inside the Boardrooms of Tomorrow",
    excerpt: "How the next generation of executive is redefining corporate governance.",
    image: articleImg,
    tag: "EXCLUSIVE",
  },
  {
    id: 5,
    title: "The Global Supply Chain Revolution",
    excerpt: "Companies that transformed their logistics are now leading their industries.",
    image: articleImg,
    tag: "INVESTIGATION",
  },
  {
    id: 6,
    title: "The Rise of Sustainable Leadership",
    excerpt: "CEOs who are putting environmental responsibility at the core of business.",
    image: articleImg,
    tag: "EXCLUSIVE",
  },
  {
    id: 7,
    title: "Inside the Boardrooms of Tomorrow",
    excerpt: "How the next generation of executive is redefining corporate governance.",
    image: articleImg,
    tag: "EXCLUSIVE",
  },
  {
    id: 8,
    title: "The Global Supply Chain Revolution",
    excerpt: "Companies that transformed their logistics are now leading their industries.",
    image: articleImg,
    tag: "INVESTIGATION",
  },
  {
    id: 9,
    title: "The Rise of Sustainable Leadership",
    excerpt: "CEOs who are putting environmental responsibility at the core of business.",
    image: articleImg,
    tag: "EXCLUSIVE",
  },
];

const BlogGrid = () => {
  return (
    <section className="py-20">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-3">
            Latest Stories
          </h2>

          <p className="font-body text-sm text-gray-600 mb-5">
            Browse and read the latest stuff
          </p>

          <div className="w-20 h-[2px] bg-primary mx-auto"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} data={blog} />
          ))}
        </div>

      </Container>
    </section>
  );
};

export default BlogGrid;
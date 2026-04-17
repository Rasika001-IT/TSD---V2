import { Link } from "react-router-dom";

const StandardArticleTemplate = ({
  post,
  taxonomyData,
  faqs,
  openFAQ,
  setOpenFAQ,
  mustReadPosts,
}) => {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-14">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[500px] object-cover mb-8"
        />
      )}

      <h1 className="font-heading text-5xl leading-tight mb-4">
        {post.title.replace(/<[^>]+>/g, "")}
      </h1>

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

      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />

      {faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-4xl mb-8">
            FAQs
          </h2>

          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenFAQ(
                    openFAQ === index
                      ? null
                      : index
                  )
                }
              >
                {faq.question}
              </button>

              {openFAQ === index && (
                <p>{faq.answer}</p>
              )}
            </div>
          ))}
        </section>
      )}

      <section className="mt-20">
        <h2 className="font-heading text-4xl mb-8">
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
              />

              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default StandardArticleTemplate;
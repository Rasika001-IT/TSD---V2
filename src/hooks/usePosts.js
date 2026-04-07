import { useEffect, useState } from "react";

const API_URL = "https://thesuccessdigest.com/wp-json/wp/v2/posts?_embed";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const formattedPosts = data.map((post) => ({
        id: post.id,

        // ✅ IMPORTANT FIELDS
        slug: post.slug, // 🔥 THIS FIXES YOUR ISSUE
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,

        // ✅ FEATURED IMAGE (safe optional chaining)
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading };
};

export default usePosts;
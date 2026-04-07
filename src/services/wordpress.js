const API_URL = "https://thesuccessdigest.com/wp-json/wp/v2/posts";

export const fetchPosts = async () => {
  let page = 1;
  let allPosts = [];
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await fetch(
        `${API_URL}?per_page=100&page=${page}&_embed=true`
      );

      if (!response.ok) {
        hasMore = false;
        break;
      }

      const data = await response.json();

      if (data.length === 0) {
        hasMore = false;
      } else {
        allPosts = [...allPosts, ...data];
        page++;
      }
    }

    // 🔥 Format data cleanly
    return allPosts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      excerpt: post.excerpt.rendered,
      link: post.link,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
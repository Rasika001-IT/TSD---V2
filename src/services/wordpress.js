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

    // 🔥 Format data cleanly with categories and author info
    return allPosts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      link: post.link,
      date: post.date,
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      categories: post.categories || [],
      author: post._embedded?.author?.[0]?.name || "TSD Staff",
      authorLink: post._embedded?.author?.[0]?.link || "#",
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// 🔥 NEW: Fetch posts by category
export const fetchPostsByCategory = async (categoryId, perPage = 10) => {
  try {
    const response = await fetch(
      `${API_URL}?categories=${categoryId}&per_page=${perPage}&_embed=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      link: post.link,
      date: post.date,
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      categories: post.categories || [],
      author: post._embedded?.author?.[0]?.name || "TSD Staff",
      authorLink: post._embedded?.author?.[0]?.link || "#",
    }));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
};

// 🔥 NEW: Fetch posts with pagination
export const fetchPostsWithPagination = async (page = 1, perPage = 9) => {
  try {
    const response = await fetch(
      `${API_URL}?per_page=${perPage}&page=${page}&_embed=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Get total posts count from headers
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    const formattedPosts = data.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      link: post.link,
      date: post.date,
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      categories: post.categories || [],
      author: post._embedded?.author?.[0]?.name || "TSD Staff",
      authorLink: post._embedded?.author?.[0]?.link || "#",
    }));

    return {
      posts: formattedPosts,
      totalPosts,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error("Error fetching posts with pagination:", error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1
    };
  }
};

// 🔥 NEW: Fetch categories to map IDs to names
export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://thesuccessdigest.com/wp-json/wp/v2/categories"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
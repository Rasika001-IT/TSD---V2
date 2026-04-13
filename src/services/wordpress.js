const API_BASE = "https://thesuccessdigest.com/wp-json/wp/v2";
const POSTS_URL = `${API_BASE}/posts`;

const formatPost = (post) => ({
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
  tags: post.tags || [],

  author: post._embedded?.author?.[0]?.name || "TSD Staff",

  authorId:
    post._embedded?.author?.[0]?.id || null,

  authorSlug:
    post._embedded?.author?.[0]?.slug || "",

  authorAvatar:
    post._embedded?.author?.[0]?.avatar_urls?.["96"] ||
    null,

  authorLink:
    post._embedded?.author?.[0]?.link || "#",
});

export const fetchPosts = async () => {
  try {
    const firstResponse = await fetch(
      `${POSTS_URL}?per_page=100&page=1&_embed=true`
    );

    if (!firstResponse.ok) {
      throw new Error(
        `HTTP error! status: ${firstResponse.status}`
      );
    }

    const totalPages = parseInt(
      firstResponse.headers.get("X-WP-TotalPages") || "1"
    );

    let allPosts = await firstResponse.json();

    for (let page = 2; page <= totalPages; page++) {
      const response = await fetch(
        `${POSTS_URL}?per_page=100&page=${page}&_embed=true`
      );

      if (!response.ok) continue;

      const data = await response.json();

      allPosts = [...allPosts, ...data];
    }

    return allPosts.map(formatPost);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const fetchPostsWithPagination = async (
  page = 1,
  perPage = 9
) => {
  try {
    const response = await fetch(
      `${POSTS_URL}?per_page=${perPage}&page=${page}&_embed=true`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    const totalPosts = parseInt(
      response.headers.get("X-WP-Total") || "0"
    );

    const totalPages = parseInt(
      response.headers.get("X-WP-TotalPages") || "0"
    );

    return {
      posts: data.map(formatPost),
      totalPosts,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error(
      "Error fetching paginated posts:",
      error
    );

    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};

export const fetchPostsByCategory = async (
  categoryId,
  perPage = 50
) => {
  try {
    const response = await fetch(
      `${POSTS_URL}?categories=${categoryId}&per_page=${perPage}&_embed=true`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    return data.map(formatPost);
  } catch (error) {
    console.error(
      "Error fetching posts by category:",
      error
    );
    return [];
  }
};

export const fetchPostsByTag = async (
  tagId,
  perPage = 50
) => {
  try {
    const response = await fetch(
      `${POSTS_URL}?tags=${tagId}&per_page=${perPage}&_embed=true`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    return data.map(formatPost);
  } catch (error) {
    console.error(
      "Error fetching posts by tag:",
      error
    );
    return [];
  }
};

export const fetchPostBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${POSTS_URL}?slug=${slug}&_embed=true`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.length) return null;

    return formatPost(data[0]);
  } catch (error) {
    console.error(
      "Error fetching post by slug:",
      error
    );
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${API_BASE}/categories?per_page=100`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error
    );
    return [];
  }
};

export const fetchTags = async () => {
  try {
    const response = await fetch(
      `${API_BASE}/tags?per_page=100`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Error fetching tags:",
      error
    );
    return [];
  }
};
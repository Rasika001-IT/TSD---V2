import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchTags,
  fetchPostsByCategory,
  fetchPostsByTag,
} from "../services/wordpress";

const useCategoryPosts = (slug) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const categories = await fetchCategories();

        const matchedCategory = categories.find(
          (cat) => cat.slug === slug
        );

        if (matchedCategory) {
          const fetchedPosts = await fetchPostsByCategory(
            matchedCategory.id,
            50
          );

          setPosts(fetchedPosts);
          return;
        }

        const tags = await fetchTags();

        const matchedTag = tags.find(
          (tag) => tag.slug === slug
        );

        if (matchedTag) {
          const fetchedPosts = await fetchPostsByTag(
            matchedTag.id,
            50
          );

          setPosts(fetchedPosts);
          return;
        }

        setPosts([]);
      } catch (error) {
        console.error(error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [slug]);

  return { posts, loading };
};

export default useCategoryPosts;
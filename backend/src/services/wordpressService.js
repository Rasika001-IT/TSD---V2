import axios from 'axios';
import { WORDPRESS_API_URL } from '../config/wordpress.js';
import { logger } from '../utils/logger.js';

const wordpressAxios = axios.create({
    baseURL: WORDPRESS_API_URL,
    timeout: 30000,
});


const formatPost = (post) => ({
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    link: post.link,
    date: post.date,
    modified: post.modified,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    categories: post.categories || [],
    tags: post.tags || [],
    author: post._embedded?.author?.[0]?.name || 'TSD Staff',
    authorId: post._embedded?.author?.[0]?.id || null,
    authorSlug: post._embedded?.author?.[0]?.slug || '',
    authorAvatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || null,
    authorLink: post._embedded?.author?.[0]?.link || '#',
});



export const wordpressService = {
    // Fetch all posts from WordPress
    async fetchAllPosts() {
        try {
        logger.info('Fetching all posts from WordPress');
        
        const firstResponse = await wordpressAxios.get('/posts', {
            params: { per_page: 100, page: 1, _embed: true },
        });

        const totalPages = parseInt(firstResponse.headers['x-wp-totalpages'] || '1');
        let allPosts = firstResponse.data;

        for (let page = 2; page <= totalPages; page++) {
            const response = await wordpressAxios.get('/posts', {
            params: { per_page: 100, page, _embed: true },
            });
            allPosts = [...allPosts, ...response.data];
        }

        const formattedPosts = allPosts.map(formatPost);
        logger.info(`Fetched ${formattedPosts.length} posts from WordPress`);
        return formattedPosts;
        } catch (error) {
        logger.error('Error fetching posts from WordPress', error.message);
        throw error;
        }
    },


    // Fetch posts with pagination
    async fetchPostsWithPagination(page = 1, perPage = 9) {
        try {
        const response = await wordpressAxios.get('/posts', {
            params: { per_page: perPage, page, _embed: true },
        });

        const totalPosts = parseInt(response.headers['x-wp-total'] || '0');
        const totalPages = parseInt(response.headers['x-wp-totalpages'] || '0');

        return {
            posts: response.data.map(formatPost),
            totalPosts,
            totalPages,
            currentPage: page,
        };
        } catch (error) {
        logger.error('Error fetching paginated posts', error.message);
        throw error;
        }
    },


    // Fetch posts by category
    async fetchPostsByCategory(categoryId, perPage = 50) {
        try {
        const response = await wordpressAxios.get('/posts', {
            params: { categories: categoryId, per_page: perPage, _embed: true },
        });
        return response.data.map(formatPost);
        } catch (error) {
        logger.error('Error fetching posts by category', error.message);
        throw error;
        }
    },


    // Fetch posts by tag
    async fetchPostsByTag(tagId, perPage = 50) {
        try {
        const response = await wordpressAxios.get('/posts', {
            params: { tags: tagId, per_page: perPage, _embed: true },
        });
        return response.data.map(formatPost);
        } catch (error) {
        logger.error('Error fetching posts by tag', error.message);
        throw error;
        }
    },


    // Fetch post by slug
    async fetchPostBySlug(slug) {
        try {
        const response = await wordpressAxios.get('/posts', {
            params: { slug, _embed: true },
        });
        if (!response.data.length) return null;
        return formatPost(response.data[0]);
        } catch (error) {
        logger.error('Error fetching post by slug', error.message);
        throw error;
        }
    },


    // Fetch categories
    async fetchCategories() {
        try {
        const response = await wordpressAxios.get('/categories', {
            params: { per_page: 100 },
        });
        return response.data;
        } catch (error) {
        logger.error('Error fetching categories', error.message);
        throw error;
        }
    },

    
    // Fetch tags
    async fetchTags() {
        try {
        const response = await wordpressAxios.get('/tags', {
            params: { per_page: 100 },
        });
        return response.data;
        } catch (error) {
        logger.error('Error fetching tags', error.message);
        throw error;
        }
    },
};
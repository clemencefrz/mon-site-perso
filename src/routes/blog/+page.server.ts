import { posts } from '$lib/server/posts';

export const prerender = true;

export function load() {
	return {
		posts: posts.map(({ slug, title, date, description }) => ({ slug, title, date, description }))
	};
}

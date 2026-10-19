import { error } from '@sveltejs/kit';
import { posts } from '$lib/server/posts';

export const prerender = true;

export function entries() {
	return posts.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
	const post = posts.find(({ slug }) => slug === params.slug);
	if (!post) error(404, 'Article introuvable');
	return { post };
}

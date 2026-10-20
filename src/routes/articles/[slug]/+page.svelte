<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | Clémence Fernandez</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="mx-auto max-w-2xl px-5 py-16">
	<header class="mb-12">
		<time datetime={data.post.date} class="text-sm text-gray-500">
			{formatDate(data.post.date)}
		</time>
		<h1 class="mt-2 leading-tight">
			{data.post.title}
		</h1>
		<p class="mt-4 text-xl leading-relaxed text-gray-600">{data.post.description}</p>
	</header>

	<div class="content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- contenu Markdown du dépôt, écrit par l'autrice -->
		{@html data.post.html}
	</div>

	<p class="mt-16 border-t border-gray-200 pt-8">
		<a href={resolve('/articles')} class="text-gray-600 underline-offset-4 hover:underline">
			<span aria-hidden="true">←</span> Tous les articles
		</a>
	</p>
</article>

<style>
	.content {
		font-size: 1.125rem;
		line-height: 1.8;
		color: #374151;
	}
	.content :global(h2) {
		margin: 3.5rem 0 1.25rem;
		font-size: 1.875rem;
		line-height: 1.25;
		font-weight: 700;
		color: #111827;
	}
	.content :global(h3) {
		margin: 2.5rem 0 1rem;
		font-size: 1.375rem;
		line-height: 1.35;
		font-weight: 600;
		color: #111827;
	}
	.content :global(h4) {
		margin: 2rem 0 0.75rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
	}
	.content :global(:is(h2, h3, h4):first-child) {
		margin-top: 0;
	}
	.content :global(:is(p, ul, ol, blockquote)) {
		margin-bottom: 1.5rem;
	}
	.content :global(ul) {
		list-style: disc;
		padding-left: 1.5rem;
	}
	.content :global(ol) {
		list-style: decimal;
		padding-left: 1.5rem;
	}
	.content :global(li) {
		margin-bottom: 0.5rem;
		padding-left: 0.25rem;
	}
	.content :global(blockquote) {
		padding: 1rem 1.25rem;
		border-left: 4px solid #d1d5db;
		border-radius: 0 0.5rem 0.5rem 0;
		background: #f9fafb;
	}
	.content :global(blockquote p:last-child) {
		margin-bottom: 0;
	}
	.content :global(strong) {
		font-weight: 600;
		color: #111827;
	}
	.content :global(a) {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.content :global(code) {
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		background: #f3f4f6;
		font-size: 0.9em;
	}
</style>

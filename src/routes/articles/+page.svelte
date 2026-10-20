<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>Articles | Clémence Fernandez</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-5 py-16">
	<h1 class="mb-12">Articles</h1>

	{#if data.posts.length === 0}
		<p class="text-gray-600">Aucun article pour le moment.</p>
	{:else}
		<ul class="space-y-12">
			{#each data.posts as post (post.slug)}
				<li>
					<article>
						<time datetime={post.date} class="text-sm text-gray-500">
							{formatDate(post.date)}
						</time>
						<h2 class="mt-1 text-2xl leading-snug font-semibold">
							<a
								href={resolve('/articles/[slug]', { slug: post.slug })}
								class="underline-offset-4 hover:underline"
							>
								{post.title}
							</a>
						</h2>
						<p class="mt-3 leading-relaxed text-gray-700">{post.description}</p>
					</article>
				</li>
			{/each}
		</ul>
	{/if}
</div>

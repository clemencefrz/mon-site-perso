<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Clémence Fernandez</title>
</svelte:head>

<h1>Mes articles</h1>

{#if data.posts.length === 0}
	<p>Aucun article pour le moment.</p>
{:else}
	<ul>
		{#each data.posts as post (post.slug)}
			<li>
				<article>
					<h2><a href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a></h2>
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<p>{post.description}</p>
				</article>
			</li>
		{/each}
	</ul>
{/if}

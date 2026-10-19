<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | Clémence Fernandez</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article>
	<h1>{data.post.title}</h1>
	<time datetime={data.post.date}>{formatDate(data.post.date)}</time>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- contenu Markdown du dépôt, écrit par l'autrice -->
	{@html data.post.html}
</article>

<p><a href={resolve('/blog')}>← Tous les articles</a></p>

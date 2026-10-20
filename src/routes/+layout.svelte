<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex justify-end p-4">
	<nav>
		<ul class="flex flex-row gap-2">
			<li><a href={resolve('/')} class="rounded border px-3 py-1">Accueil</a></li>
			<li><a href={resolve('/experiences')} class="rounded border px-3 py-1">Expériences</a></li>
			<li><a href={resolve('/blog')} class="rounded border px-3 py-1">Articles</a></li>
			<li><a href={resolve('/contact')} class="rounded border px-3 py-1">Contact</a></li>
		</ul>
	</nav>
</header>
<main class="mx-auto max-w-4xl px-4 py-8">
	{@render children()}
</main>

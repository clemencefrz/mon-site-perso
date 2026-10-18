<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<ul>
			<li><a href={resolve('/')}>Accueil</a></li>
			<li><a href={resolve('/blog')}>Blog</a></li>
			<li><a href={resolve('/experiences')}>Expériences</a></li>
			<li><a href={resolve('/contact')}>Contact</a></li>
		</ul>
	</nav>
</header>
<main>
	{@render children()}
</main>

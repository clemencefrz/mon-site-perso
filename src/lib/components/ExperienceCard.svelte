<script lang="ts">
	import { formatDuration, formatMonth } from '$lib/date';
	import type { Experience } from '$lib/experiences';
	import TechTag from './TechTag.svelte';

	let { experience }: { experience: Experience } = $props();

	const today = new Date().toISOString().slice(0, 10);
	const duration = $derived(formatDuration(experience.startDate, experience.endDate ?? today));

	// Le premier paragraphe est toujours visible, les suivants sont dans « Voir plus ».
	const paragraphs = $derived(experience.context.split('\n').filter((p) => p.trim() !== ''));

	const stackGroups = $derived(
		[
			{ label: 'Front', techs: experience.stack.front },
			{ label: 'Back', techs: experience.stack.back },
			{ label: 'Outils', techs: experience.stack.tools }
		].filter((group) => group.techs.length > 0)
	);
</script>

<article class="rounded border p-6">
	<header class="flex items-start gap-4">
		{#if experience.logo}
			<img src={experience.logo} alt="" class="h-12 w-12 rounded object-contain" />
		{/if}
		<div class="flex-1">
			<h2 class="text-xl font-bold">{experience.title}</h2>
			{#if experience.company}
				<p>{experience.company}</p>
			{/if}
			<p class="text-sm text-gray-500">
				{#if experience.endDate}
					{formatMonth(experience.startDate)} – {formatMonth(experience.endDate)}
				{:else}
					Depuis {formatMonth(experience.startDate)}
				{/if}
				· {duration}
			</p>
		</div>
		<span class="rounded-full border px-3 py-1 text-sm whitespace-nowrap">
			{experience.contractType}
		</span>
	</header>

	<div class="mt-4">
		<p>{paragraphs[0]}</p>
		{#if paragraphs.length > 1}
			<details class="mt-2">
				<summary class="cursor-pointer text-sm text-gray-600">Voir plus</summary>
				{#each paragraphs.slice(1) as paragraph, i (i)}
					<p class="mt-2">{paragraph}</p>
				{/each}
			</details>
		{/if}
	</div>

	{#if experience.missions.length > 0}
		<h3 class="mt-4 font-semibold">Missions</h3>
		<ul class="list-disc pl-6">
			{#each experience.missions as mission, i (i)}
				<li>{mission}</li>
			{/each}
		</ul>
	{/if}

	{#if stackGroups.length > 0}
		<div class="mt-4 space-y-2">
			{#each stackGroups as group (group.label)}
				<div class="flex gap-3">
					<span class="w-14 shrink-0 text-sm font-semibold">{group.label}</span>
					<ul class="flex flex-wrap gap-2">
						{#each group.techs as tech (tech)}
							<li><TechTag {tech} /></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}

	<!-- eslint-disable svelte/no-navigation-without-resolve -- liens externes, resolve() ne sert qu'aux pages du site -->
	{#if experience.siteUrl || experience.githubUrl}
		<div class="mt-4 flex gap-2">
			{#if experience.siteUrl}
				<a
					href={experience.siteUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded border px-3 py-1"
				>
					Voir le site <span aria-hidden="true">↗</span>
					<span class="sr-only">(nouvel onglet)</span>
				</a>
			{/if}
			{#if experience.githubUrl}
				<a
					href={experience.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded border px-3 py-1"
				>
					GitHub <span aria-hidden="true">↗</span>
					<span class="sr-only">(nouvel onglet)</span>
				</a>
			{/if}
		</div>
	{/if}
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
</article>

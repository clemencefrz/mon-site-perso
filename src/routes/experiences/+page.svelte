<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import {
		allContractTypes,
		allTechs,
		experiences,
		filterExperiences,
		sortByStartDateDesc
	} from '$lib/experiences';

	const sortedExperiences = sortByStartDateDesc(experiences);
	const techOptions = allTechs(experiences);
	const contractTypeOptions = allContractTypes(experiences);

	let selectedTechs: string[] = $state([]);
	let selectedContractTypes: string[] = $state([]);

	const filteredExperiences = $derived(
		filterExperiences(sortedExperiences, {
			techs: selectedTechs,
			contractTypes: selectedContractTypes
		})
	);
	const hasFilters = $derived(selectedTechs.length > 0 || selectedContractTypes.length > 0);

	function clearFilters() {
		selectedTechs = [];
		selectedContractTypes = [];
	}
</script>

<svelte:head>
	<title>Expériences | Clémence Fernandez</title>
</svelte:head>

<h1>Expériences</h1>

<div class="mb-6 flex flex-wrap items-center gap-2">
	<MultiSelect label="Stack" options={techOptions} bind:selected={selectedTechs} />
	<MultiSelect
		label="Type de travail"
		options={contractTypeOptions}
		bind:selected={selectedContractTypes}
	/>
	{#if hasFilters}
		<button type="button" class="px-3 py-1 text-gray-600 underline" onclick={clearFilters}>
			Effacer
		</button>
	{/if}
	<p class="ml-auto text-sm text-gray-500" aria-live="polite">
		{filteredExperiences.length}
		{filteredExperiences.length > 1 ? 'expériences' : 'expérience'}
	</p>
</div>

{#if filteredExperiences.length === 0}
	<p class="text-gray-600">Aucune expérience ne correspond à ces filtres.</p>
{:else}
	<ul class="space-y-6">
		{#each filteredExperiences as experience (experience.title + experience.startDate)}
			<li><ExperienceCard {experience} /></li>
		{/each}
	</ul>
{/if}

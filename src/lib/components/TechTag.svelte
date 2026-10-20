<script lang="ts">
	import { techIcon } from '$lib/techIcons';

	let { tech }: { tech: string } = $props();

	const icon = $derived(techIcon(tech));
</script>

<span class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-sm">
	{#if icon}
		<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="#{icon.hex}" aria-hidden="true">
			<path d={icon.path} />
		</svg>
	{/if}
	{tech}
</span>

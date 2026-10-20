<script lang="ts">
	let {
		label,
		options,
		selected = $bindable([])
	}: { label: string; options: string[]; selected: string[] } = $props();
</script>

<details class="relative">
	<summary
		class="cursor-pointer list-none rounded border px-3 py-1 select-none [&::-webkit-details-marker]:hidden"
	>
		{label}
		{#if selected.length > 0}({selected.length}){/if}
		<span aria-hidden="true">▾</span>
	</summary>
	<fieldset
		class="absolute z-10 mt-1 max-h-72 w-60 overflow-y-auto rounded border bg-white p-2 shadow"
	>
		<legend class="sr-only">{label}</legend>
		{#each options as option (option)}
			<label class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-100">
				<input type="checkbox" value={option} bind:group={selected} />
				{option}
			</label>
		{/each}
	</fieldset>
</details>

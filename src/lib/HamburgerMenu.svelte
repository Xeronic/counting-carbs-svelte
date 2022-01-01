<script lang="ts">
	export let toggle: () => void;
	export let active: boolean;
</script>

<div class="flex items-center">
	<div on:click={() => toggle()} class="inline-flex flex-col justify-evenly h-6 w-6">
		<div
			class="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transition-all transform"
			class:translate-y-3={active}
			class:rotate-45={active}
		/>

		<div
			class:-rotate-45={active}
			class="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transition-all transform"
		/>

		<div
			class:opacity-0={active}
			class="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transition-all transform"
		/>
	</div>
</div>

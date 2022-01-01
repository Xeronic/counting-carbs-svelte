<script lang="ts">
	import type { Food } from '../lib/types/Food';

	export let onAdd: (food: Food) => void;
	export let onDelete: (food: Food) => void;
	export let editing: boolean;
	export let foods: Food[];

	let selected = '';

	function handleClick(index: number): void {
		const input =
			prompt('Hur mycket ' + foods[index].name.toLowerCase() + ' vill du lägga till?') || '';

		if (input) {
			const newFood = { ...foods[index] };
			const amountToAddToPlate = parseFloat(input.trim());
			if (amountToAddToPlate) {
				newFood.value = amountToAddToPlate;
				onAdd(newFood);
			}
		}
	}

	function handleDeleteClick(food: Food): void {
		onDelete(food);
	}
</script>

<ul class="divide-y">
	{#each foods as food, index}
		<li on:click={() => handleClick(index)} class="py-6">
			<span class="flex-1">
				<div class="flex justify-between items-center">
					<div class="flex flex-col gap-1 text-2xl">
						<span>{food.name}</span>
						<span class="text-xs text-gray-400">
							{food.carbs}g kolhydrater per 100g livsmedel
						</span>
					</div>

					{#if editing}
						<span>
							<svg
								on:click={() => handleDeleteClick(food)}
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-red-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</span>
					{/if}
				</div>
			</span>
		</li>
	{/each}
</ul>

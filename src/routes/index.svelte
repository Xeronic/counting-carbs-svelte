<script lang="ts">
	import { onMount } from 'svelte';
	import FoodList from '../lib/FoodList.svelte';
	import HamburgerMenu from '../lib/HamburgerMenu.svelte';
	import type { Food } from '../lib/types/Food';
	import { getFoodsFromLocalStorage } from '../lib/utils/localStorage';

	let foods: Food[] = [];
	let plate: Food[] = [];
	let showModal = false;
	let editing = false;

	onMount(() => {
		foods = getFoodsFromLocalStorage();
	});

	function addNewFood() {
		const name = window.prompt('Ange namnet på livsmedlet');
		if (name === null) return;

		const carbs = parseFloat(window.prompt('Hur mycket kolhydrater på 100 gram') || '');

		if (name && carbs) {
			foods = [...foods, { name, carbs, value: 50 }];
			localStorage.setItem('foods', JSON.stringify(foods));
		}
	}

	function addToPlate(food: Food) {
		plate = [...plate, food];
	}

	function removeFromPlate(food: Food): void {
		plate = plate.filter((f) => f.name !== food.name);
	}

	function handleDeleteFood(food: Food) {
		foods = foods.filter((f) => f.name !== food.name);
		window.localStorage.setItem('foods', JSON.stringify(this.foods));
	}

	$: totalCarbs = plate.reduce((acc, n) => acc + n.carbs * (n.value / 100), 0);
	$: sortedFoods = foods.sort((a, b) => a.name.localeCompare(b.name));
</script>

<div class="max-w-7xl mx-auto px-6">
	<!-- Modal   -->
	<div
		class="fixed top-0 left-0 w-96 h-full p-8 bg-white transition-all transform"
		class:-translate-x-full={!showModal}
		class:shadow-2xl={showModal}
	>
		<ul on:click={() => (showModal = false)} class="divide-y text-purple-900">
			<li on:click={addNewFood} class="py-3">Lägg till livsmedel</li>
			<li on:click={() => (editing = !editing)} class="py-3">
				{editing ? 'Sluta ändra' : 'Ändra'}
			</li>
		</ul>
	</div>

	<!-- Header  -->
	<header class="flex justify-between items-center">
		<h1
			class="inline-block py-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
		>
			Counting Carbs
		</h1>

		<div class="">
			<HamburgerMenu active={showModal} toggle={() => (showModal = !showModal)} />
		</div>
	</header>

	<div class="text-gray-700">Antal kolhydrater: {totalCarbs.toFixed(1)}</div>

	<div class="flex text-gray-900">
		<div class="px-6 p-8 flex-1">
			<FoodList onAdd={addToPlate} onDelete={handleDeleteFood} {editing} {foods} />
		</div>

		<!-- Plate  -->
		<!-- <div class="p-8 flex-1">
			<h3 class="text-xl text-gray-600 font-semibold">Tallrik</h3>

			{#if plate.length > 0}
				<ul class="pt-4 list-disc">
					{#each plate as food, i}
						<li on:dblclick={() => removeFromPlate(food)} class="ml-8 py-1 text-xl text-gray-700">
							{food.name}
							{food.value}g
							<span>
								ger
								{(food.carbs * (food.value / 100)).toFixed(1).replace('.0', '')}g kolhydrater
							</span>
						</li>
					{/each}
				</ul>
				<hr class="mt-6 mb-4" />
				<h3 class="text-xl">Totalt antal kolhydrater: {totalCarbs.toFixed(1)}</h3>
			{/if}

			{#if plate.length === 0}
				<p class="mt-2 text-gray-500">Inget livsmedel tillagt än</p>
			{/if}
		</div> -->
	</div>
</div>

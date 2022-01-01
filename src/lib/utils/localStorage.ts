import type { Food } from '../types/Food';

export function getFoodsFromLocalStorage(): Food[] {
	const foods = window.localStorage.getItem('foods');

	if (foods) {
		return JSON.parse(foods);
	} else {
		return [];
	}
}

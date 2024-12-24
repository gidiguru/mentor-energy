import { localStorageStore } from '@skeletonlabs/skeleton';
import type { DrawerStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';

// Create drawer store
const drawerStore = localStorageStore<DrawerStore>('app-drawer', {
	open: false,
	position: 'right',
	width: 'w-[280px]',
	height: 'h-full'
});

// Get current state
export const getDrawerState = () => get(drawerStore);

// Set drawer state
export const setDrawerState = (state: Partial<DrawerStore>) => {
	drawerStore.update((curr) => ({ ...curr, ...state }));
};

export default drawerStore;
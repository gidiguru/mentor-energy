// src/lib/stores/auth.ts
import { writable } from 'svelte/store';

import type { User } from '$lib/types/user';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        user: null,
        isAuthenticated: false,
        loading: true
    });

    return {
        subscribe,
        setUser: (user: User) => update(state => ({ ...state, user, isAuthenticated: true, loading: false })),
        clearUser: () => update(state => ({ ...state, user: null, isAuthenticated: false, loading: false })),
        setLoading: (loading: boolean) => update(state => ({ ...state, loading }))
    };
}

export const auth = createAuthStore();
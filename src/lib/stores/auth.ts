// src/lib/stores/auth.ts
import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
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
        setUser: (user: User) => update(state => ({ 
            ...state, 
            user, 
            isAuthenticated: true, 
            loading: false 
        })),
        clearUser: () => update(state => ({ 
            ...state, 
            user: null, 
            isAuthenticated: false, 
            loading: false 
        })),
        setLoading: (loading: boolean) => update(state => ({ 
            ...state, 
            loading 
        })),
        initialize: (session: any) => {
            update(state => ({
                ...state,
                isAuthenticated: !!session,
                loading: false
            }));
        },
        guardRoute: async () => {
            const $page = get(page);
            const state = get({ subscribe });

            const protectedRoutes = ['/dashboard', '/profile'];
            const isProtectedRoute = protectedRoutes.some(route => 
                $page.url.pathname.startsWith(route)
            );

            if (!state.isAuthenticated && !state.loading && isProtectedRoute) {
                // Remove any existing redirectTo to prevent loops
                const currentPath = $page.url.pathname;
                if (!currentPath.includes('/auth')) {
                    goto(`/auth?redirectTo=${encodeURIComponent(currentPath)}`);
                } else {
                    goto('/auth');
                }
                return false;
            }

            return true;
        }
    };
}

export const auth = createAuthStore();
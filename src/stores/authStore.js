// src/stores/authStore.js
import { writable } from 'svelte/store';

// Create a writable store to keep track of authentication state
export const authStore = writable({
    isAuthenticated: !!localStorage.getItem('refreshToken'),
});

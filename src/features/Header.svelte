<!-- Header.svelte -->
<script>
    import { authStore } from '../stores/authStore';
    import { router } from 'tinro';
    import { onDestroy } from 'svelte';
  
    let unsubscribe;
    let auth = { isAuthenticated: false };
  
    unsubscribe = authStore.subscribe(value => {
        auth = value;
    });
  
    function logout() {
        localStorage.removeItem('refreshToken');
        authStore.set({ isAuthenticated: false });
        router.goto('/login');
    }
  
    onDestroy(() => {
        unsubscribe();
    });
  </script>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-4">
    <a class="navbar-brand" href="/">Home</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        {#if auth.isAuthenticated}
          <li class="nav-item">
            <a class="nav-link" href="/dashboard">Dashboard</a>
          </li>
          <li class="nav-item">
            <button class="btn btn-outline-danger" on:click={logout}>Logout</button>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
        {/if}
      </ul>
    </div>
  </nav>
  
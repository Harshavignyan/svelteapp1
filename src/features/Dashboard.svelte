<!-- Dashboard.svelte -->
<script>
    import { onMount } from 'svelte';
    import { router } from 'tinro';

    onMount(() => {
        const token = localStorage.getItem('refreshToken');
        
        if (!token) {
            alert("Please log in to access the dashboard.");
            router.goto("/login");
        }
    });
</script>

<h1 class="text-center my-4">Dashboard</h1>

<p class="text-center">Welcome to your dashboard!</p>

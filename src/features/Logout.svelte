<!-- logout.svelte -->
<script>
    import { router } from "tinro";

    function logout() {
        // Clear tokens
        localStorage.removeItem('refreshToken');
        
        // Redirect to login page
        router.goto("/login");
    }
</script>

<button on:click={logout}>Logout</button>

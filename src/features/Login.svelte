<!-- Login.svelte -->
<script>
    import { router } from "tinro";
    import { authStore } from '../stores/authStore';
  
    let email = '';
    let password = '';
    let isLoading = false;
    let errorMessage = '';
  
    async function login(e) {
        e.preventDefault();
        errorMessage = '';
  
        if (!email || !password) {
            errorMessage = 'Email and password are required.';
            return;
        }
  
        isLoading = true;
  
        try {
            const response = await fetch('http://localhost:3000/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
  
            if (response.ok) {
                const data = await response.json();
                const token = data.tokens.refresh.token;
                localStorage.setItem('refreshToken', token);
  
                authStore.set({ isAuthenticated: true });
  
                router.goto("/dashboard");
            } else {
                const error = await response.json();
                errorMessage = `Login failed: ${error.message}`;
            }
        } catch (error) {
            console.error('Login request failed', error);
            errorMessage = 'An error occurred. Please try again.';
        } finally {
            isLoading = false;
        }
    }
</script>
  
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <h1 class="text-center my-4">Login</h1>
            <form on:submit={login}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" bind:value={email} placeholder="Email" aria-label="Email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" bind:value={password} placeholder="Password" aria-label="Password" required />
                </div>
                <button type="submit" class="btn btn-primary w-100" disabled={isLoading}>
                    {#if isLoading}
                        Logging in...
                    {:else}
                        Login
                    {/if}
                </button>
                {#if errorMessage}
                    <p class="text-danger mt-2">{errorMessage}</p>
                {/if}
            </form>
        </div>
    </div>
</div>

<!-- Register.svelte -->
<script>
    import { router } from "tinro";
    import { authStore } from "../stores/authStore";

    let name = "";
    let email = "";
    let password = "";
    let isLoading = false;
    let errorMessage = "";

    async function register(e) {
        e.preventDefault();
        errorMessage = "";

        if (!name || !email || !password) {
            errorMessage = "All fields are required.";
            return;
        }

        isLoading = true;

        try {
            const response = await fetch(
                "http://localhost:3000/v1/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                },
            );

            if (response.ok) {
                // Registration was successful
                // Optionally: Show a success message or notification
                router.goto("/login");
            } else {
                const error = await response.json();
                errorMessage = `Registration failed: ${error.message}`;
            }
        } catch (error) {
            console.error("Registration request failed", error);
            errorMessage = "An error occurred. Please try again.";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <h1 class="text-center my-4">Register</h1>
            <form on:submit={register}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        class="form-control"
                        bind:value={name}
                        placeholder="Name"
                        aria-label="Name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        class="form-control"
                        bind:value={email}
                        placeholder="Email"
                        aria-label="Email"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        class="form-control"
                        bind:value={password}
                        placeholder="Password"
                        aria-label="Password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="btn btn-primary w-100"
                    disabled={isLoading}
                >
                    {#if isLoading}
                        Registering...
                    {:else}
                        Register
                    {/if}
                </button>
                {#if errorMessage}
                    <p class="text-danger mt-2">{errorMessage}</p>
                {/if}
            </form>
        </div>
    </div>
</div>

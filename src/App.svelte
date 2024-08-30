<script>
  import Header from "./features/Header.svelte";
  import { Route } from "tinro";
  import Home from "./features/Home.svelte";
  import Register from "./features/Register.svelte";
  import Login from "./features/Login.svelte";
  import Dashboard from "./features/Dashboard.svelte";
  import { authStore } from './stores/authStore';

  // Initialize authStore based on localStorage token
  authStore.set({ isAuthenticated: !!localStorage.getItem('refreshToken') });
</script>

<Header />

<main>
  <Route path="/">
      <Home />
  </Route>
  <Route path="/register">
      <Register />
  </Route>
  <Route path="/login">
      <Login />
  </Route>
  <Route path="/dashboard">
      <Dashboard />
  </Route>
</main>

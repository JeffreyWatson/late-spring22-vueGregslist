<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-black px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h2 class="text-success">Gregslist</h2>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'Cars' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Cars
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'Houses' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Houses
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'Jobs' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Jobs
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

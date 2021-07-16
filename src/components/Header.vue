<template>
  <div class="header">
    <h1>Astro Garden</h1>
    <h2>
      Astrophotography by
      <a target="_blank" href="https://jacob.mcswain.dev">Jacob McSwain</a>
    </h2>
    <div id="nav">
      <router-link to="/">Gallery</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>

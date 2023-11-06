<template>
  <div class="header">
    <h1>Astro Garden</h1>
    <img src="../assets/logo.png" alt="Logo" width="128" height="128" style="margin: -20px;"/>
    <h6>
      Astrophotography by
      <a target="_blank" href="https://jacob.mcswain.dev">Jacob McSwain</a>
    </h6>
    <div id="nav">
      <h2>
        <router-link to="/">Gallery</router-link>&nbsp;|
        <router-link to="/about">About</router-link>&nbsp;|
        <router-link to="/equipment">Equipment</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>


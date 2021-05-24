<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c3c3c3;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #c3c3c3;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background-image: url("assets/background.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>

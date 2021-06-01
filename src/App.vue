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
  methods: {
    supportsWebp: async function() {
      if (!self.createImageBitmap) return false;

      const webpData =
        "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
      const blob = await fetch(webpData).then((r) => r.blob());
      return createImageBitmap(blob).then(
        () => true,
        () => false,
      );
    },
  },
  mounted() {
    this.supportsWebp().then((supportsWebp) => {
      document.body.classList.add(supportsWebp ? "webp" : "no-webp");
    });
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
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

body.no-webp {
  background-image: url("assets/background.jpg");
}

body.webp {
  background-image: url("assets/background.webp");
}
</style>

<template>
  <span>
    <StarField />
    <div id="main">
      <AppHeader />
      <RouterView />
    </div>
  </span>
</template>

<script>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import StarField from './effects/StarField.vue';

export default {
  components: {
    RouterView,
    AppHeader,
    StarField,
  },
  methods: {
    supportsWebp: async function() {
      if (!self.createImageBitmap) return false;

      const webpData =
        'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      const blob = await fetch(webpData).then((r) => r.blob());
      return createImageBitmap(blob).then(
        () => true,
        () => false,
      );
    },
  },
  mounted() {
    this.supportsWebp().then((supportsWebp) => {
      document.body.classList.add(supportsWebp ? 'webp' : 'no-webp');
    });
  },
};
</script>

<style>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c3c3c3;
}

html {
  min-height: 100%;
  position: relative;
}

body {
  background-color: #000;
  height: 100%;
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

p {
  font-size: 1.3em;
}

a {
  color: #42b983;
}
</style>

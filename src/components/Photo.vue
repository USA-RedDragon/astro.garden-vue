<template>
  <img :src="src" :alt="text" />
</template>

<script>
export default {
  name: "Photo",
  props: {
    src: String,
    text: String,
  },
};
</script>

<style scoped>
.photos img {
  /* Just in case there are inline attributes */
  width: 100% !important;
  height: auto !important;
}
</style>

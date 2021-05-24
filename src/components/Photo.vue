<template>
  <div>
    <img :src="src" :alt="text" />
  </div>
</template>

<script>
export default {
  name: 'Photo',
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
  margin-bottom: 6pt;
}
</style>

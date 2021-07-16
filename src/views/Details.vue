<template>
  <div class="details">
    <h1>{{ imageData.title }}</h1>
    <h3>{{ imageData.text }}</h3>
    <a :href="pngUrl"
      ><img class="gallery_img" :src="pngUrl" :alt="imageData.title"
    /></a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getData();
  },
  data: function () {
    return {
      imageData: {},
    };
  },
  computed: {
    pngUrl() {
      return (
        `@/assets/gallery/generated/fullres/${this.$route.params.gallery}/${this.$route.params.image}.png` &&
        require(`@/assets/gallery/generated/fullres/${this.$route.params.gallery}/${this.$route.params.image}.png`)
      );
    },
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get(`${this.$route.params.image}.json`);
        this.imageData = resp.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.gallery_img {
  width: 100% !important;
  height: auto !important;
}
</style>

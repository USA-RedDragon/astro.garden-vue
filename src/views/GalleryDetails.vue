<template>
  <div class="details">
    <h1>{{ imageData.title }}</h1>
    <h3>{{ imageData.text }}</h3>
    <a :href="pngUrl"
      ><img class="gallery_img" :src="pngUrl" :alt="imageData.title"
    /></a>
    <table :style="'display: ' + (this.paletteVisible ? 'inline':'none')">
        <tr v-for="(item, index) in this.imageData.theme.a1">
            <td :style="'background-color: ' + imageData.theme.a1[index] + '; color:' + (index > 7 ? '#ffffff':'#000000')">{{ imageData.theme.a1[index] }}</td>
            <td :style="'background-color: ' + imageData.theme.a2[index] + '; color:' + (index > 7 ? '#ffffff':'#000000')">{{ imageData.theme.a2[index] }}</td>
            <td :style="'background-color: ' + imageData.theme.a3[index] + '; color:' + (index > 7 ? '#ffffff':'#000000')">{{ imageData.theme.a3[index] }}</td>
            <td :style="'background-color: ' + imageData.theme.n1[index] + '; color:' + (index > 7 ? '#ffffff':'#000000')">{{ imageData.theme.n1[index] }}</td>
            <td :style="'background-color: ' + imageData.theme.n2[index] + '; color:' + (index > 7 ? '#ffffff':'#000000')">{{ imageData.theme.n2[index] }}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getData();
    document.onkeydown = this.handleKeyDown;
  },
  data: function() {
    return {
      imageData: {},
      paletteVisible: false,
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
    handleKeyDown (e) {
        console.log(e);
        if(e.key === 'p'){
            this.$nextTick(()=>this.paletteVisible = !this.paletteVisible);
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

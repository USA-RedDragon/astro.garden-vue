<template>
  <div class="gallery">
    <h1>Gallery</h1>
    <h2>Datasource: Myself</h2>
    <section class="photos">
      <Photo
        v-for="item in myPhotos"
        :key="item.src"
        :src="item.src"
        :title="item.title"
        :text="item.text"
      />
    </section>
    <h2>Datasource: <a href="https://telescope.live">Telescope.live</a></h2>
    <section class="photos">
      <Photo
        v-for="item in otherPhotos"
        :key="item.src"
        :src="item.src"
        :title="item.title"
        :text="item.text"
      />
    </section>
  </div>
</template>

<script>
import Photo from "../components/Photo";
import axios from "axios";

export default {
  components: {
    Photo,
  },
  created() {
    this.getData();
  },
  data: function() {
    return {
      myPhotos: [],
      otherPhotos: [],
    };
  },
  methods: {
    async getData() {
      try {
        let resp = await axios.get("gallery/my-data.json");
        this.myPhotos = resp.data;

        resp = await axios.get("gallery/other-data.json");
        this.otherPhotos = resp.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.photos {
  /* Prevent vertical gaps */
  line-height: 0;

  -webkit-column-count: 4;
  -webkit-column-gap: 0px;
  -moz-column-count: 4;
  -moz-column-gap: 0px;
  column-count: 4;
  column-gap: 0px;

  padding: 2em;
}

@media (max-width: 2100px) {
  .photos {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }
}
@media (max-width: 1200px) {
  .photos {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .photos {
    -moz-column-count: 1;
    -webkit-column-count: 1;
    column-count: 1;
  }
}
</style>

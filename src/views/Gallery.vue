<template>
  <div class="gallery">
    <h1>Gallery</h1>
    <h2>Datasource: Myself</h2>
    <section class="photos">
      <Photo
        :src="require('@/assets/my-data/milky_way.png')"
        text="The Milky Way"
      />
      <Photo :src="require('@/assets/my-data/moon.png')" text="The Moon" />
    </section>
    <h2>Datasource: <a href="https://telescope.live">Telescope.live</a></h2>
    <section class="photos">
      <Photo
        :src="require('@/assets/other-data/Centaurus_a.png')"
        text="Centaurus A"
      />
      <Photo
        :src="require('@/assets/other-data/rim-nebula.png')"
        text="Rim Nebula"
      />
      <Photo
        :src="require('@/assets/other-data/Rosette.png')"
        text="Rosette Nebula"
      />
      <Photo
        :src="require('@/assets/other-data/tarantula.png')"
        text="Tarantula Nebula"
      />
      <Photo
        :src="require('@/assets/other-data/veil.png')"
        text="Veil Nebula"
      />
      <Photo
        :src="require('@/assets/other-data/vela.png')"
        text="Vela Supernova Remnant"
      />
      <Photo
        :src="require('@/assets/other-data/carina-nebula.png')"
        text="Carina Nebula"
      />
      <Photo :src="require('@/assets/other-data/m22.png')" text="M22" />
      <Photo
        :src="require('@/assets/other-data/statue-of-liberty-nebula.png')"
        text="Statue of Liberty Nebula"
      />
      <Photo
        :src="require('@/assets/other-data/eagle-nebula.png')"
        text="Eagle Nebula"
      />
    </section>
  </div>
</template>

<script>
import Photo from "../components/Photo";
export default {
  components: {
    Photo,
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

<template>
  <div class="gallery">
    <h1>Gallery</h1>
    <h2>Datasource: Myself</h2>
    <section class="photos">
      <div>
        <p><img src="../assets/my-data/milky_way.png" /><br />The Milky Way</p>
      </div>
      <div>
        <p><img src="../assets/my-data/moon.png" /><br />The Moon</p>
      </div>
    </section>
    <h2>Datasource: <a href="https://telescope.live">Telescope.live</a></h2>
    <section class="photos">
      <div>
        <p>
          <img src="../assets/other-data/Centaurus_a.png" /><br />Centaurus A
        </p>
      </div>
      <div>
        <p><img src="../assets/other-data/rim-nebula.png" /><br />Rim Nebula</p>
      </div>
      <div>
        <p>
          <img src="../assets/other-data/Rosette.png" /><br />Rosette Nebula
        </p>
      </div>
      <div>
        <p>
          <img src="../assets/other-data/tarantula.png" /><br />Tarantula Nebula
        </p>
      </div>
      <div>
        <p><img src="../assets/other-data/veil.png" /><br />Veil Nebula</p>
      </div>
      <div>
        <p>
          <img src="../assets/other-data/vela.png" /><br />Vela Supernova
          Remnant
        </p>
      </div>
    </section>
  </div>
</template>

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

.photos img {
  /* Just in case there are inline attributes */
  width: 100% !important;
  height: auto !important;
  margin-bottom: 6pt;
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
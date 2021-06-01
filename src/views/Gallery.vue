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
export default {
  components: {
    Photo,
  },
  data: function() {
    return {
      myPhotos: [
        {
          title: "Milky Way",
          text:
            // eslint-disable-next-line max-len
            "The Milky Way is the galaxy that contains our Solar System, with the name describing the galaxy's appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye.",
          src: "my-data/milky_way",
        },
        {
          title: "Moon",
          text:
            // eslint-disable-next-line max-len
            "The Moon is Earth's only natural satellite. At about one-quarter the diameter of Earth (comparable to the width of Australia), it is the largest natural satellite in the Solar System relative to the size of its planet, the fifth largest satellite in the Solar System overall, and is larger than any dwarf planet.",
          src: "my-data/moon",
        },
      ],
      otherPhotos: [
        {
          title: "Centaurus A",
          text:
            // eslint-disable-next-line max-len
            "Centaurus A (also known as NGC 5128 or Caldwell 77) is a galaxy in the constellation of Centaurus. It was discovered in 1826 by Scottish astronomer James Dunlop from his home in Parramatta, in New South Wales, Australia.",
          src: "other-data/Centaurus_a",
        },
        {
          title: "Rim Nebula",
          text:
            // eslint-disable-next-line max-len
            "NGC 6188 is an emission nebula located about 4,000 light years away in the constellation Ara. The bright open cluster NGC 6193, visible to the naked eye, is responsible for a region of reflection nebulosity within NGC 6188.NGC 6188 is a star forming nebula, and is sculpted by the massive, young stars that have recently formed there",
          src: "other-data/rim-nebula",
        },
        {
          title: "Rosette Nebula",
          text:
            // eslint-disable-next-line max-len
            "The Rosette Nebula (also known as Caldwell 49) is an H II region located near one end of a giant molecular cloud in the Monoceros region of the Milky Way Galaxy. The open cluster NGC 2244 (Caldwell 50) is closely associated with the nebulosity, the stars of the cluster having been formed from the nebula's matter.",
          src: "other-data/Rosette",
        },
        {
          title: "Tarantula Nebula",
          text:
            // eslint-disable-next-line max-len
            "The Tarantula Nebula (also known as 30 Doradus) is an H II region in the Large Magellanic Cloud (LMC), from the Solar System's perspective forming its south-east corner. The Tarantula Nebula was observed by Nicolas-Louis de Lacaille during an expedition to the Cape of Good Hope between 1751 and 1753.",
          src: "other-data/tarantula",
        },
        {
          title: "Veil Nebula",
          text:
            // eslint-disable-next-line max-len
            "The Veil Nebula is a cloud of heated and ionized gas and dust in the constellation Cygnus. It constitutes the visible portions of the Cygnus Loop, a supernova remnant, many portions of which have acquired their own individual names and catalogue identifiers.",
          src: "other-data/veil",
        },
        {
          title: "Vela Supernova Remnant",
          text:
            // eslint-disable-next-line max-len
            "The Vela supernova remnant is a supernova remnant in the southern constellation Vela. Its source Type II supernova exploded approximately 11,000–12,300 years ago (and was about 800 light-years away).",
          src: "other-data/vela",
        },
        {
          title: "Carina Nebula",
          text:
            // eslint-disable-next-line max-len
            "The Carina Nebula or Eta Carinae Nebula (catalogued as NGC 3372; also known as the Great Carina Nebula) is a large, complex area of bright and dark nebulosity in the constellation Carina, and is located in the Carina–Sagittarius Arm.",
          src: "other-data/carina-nebula",
        },
        {
          title: "M22",
          text:
            // eslint-disable-next-line max-len
            "M22, also known as NGC 6656, is an elliptical globular cluster of stars in the constellation Sagittarius, near the Galactic bulge region. It is one of the brightest globulars visible in the night sky.",
          src: "other-data/m22",
        },
        {
          title: "Statue of Liberty Nebula",
          text:
            // eslint-disable-next-line max-len
            "NGC 3576 is a bright emission nebula in the Sagittarius arm of the galaxy a few thousand light-years away from the Eta Carinae nebula. It is also approximately 100 light years across and 9000 light-years away from Earth.",
          src: "other-data/statue-of-liberty-nebula",
        },
        {
          title: "Eagle Nebula (M16)",
          text:
            // eslint-disable-next-line max-len
            "The Eagle Nebula (catalogued as Messier 16 or M16, and as NGC 6611, and also known as the Star Queen Nebula and The Spire) is a young open cluster of stars in the constellation Serpens, discovered by Jean-Philippe de Cheseaux in 1745–46.",
          src: "other-data/eagle-nebula",
        },
        {
          title: "NGC 3324",
          text:
            // eslint-disable-next-line max-len
            "NGC 3324 is an open cluster in the southern constellation Carina, located northwest of the Carina Nebula (NGC 3372) at a distance of 7,560 light-years from Earth.",
          src: "other-data/NGC-3324",
        },
        {
          title: "IC 2948",
          text:
            // eslint-disable-next-line max-len
            "IC 2944, also known as the Running Chicken Nebula or the λ Centauri Nebula, is an open cluster with an associated emission nebula found in the constellation Centaurus, near the star λ Centauri.",
          src: "other-data/IC2948",
        },
        {
          title: "NGC 3293",
          text:
            // eslint-disable-next-line max-len
            "NGC 3293 is an open cluster in the Carina constellation. It was discovered by Nicolas-Louis de Lacaille in 1751. It consists of more than 100 stars brighter than 14th magnitude in a 10 arc minute field, the brightest of which are blue supergiants.",
          src: "other-data/NGC-3293",
        },
      ],
    };
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

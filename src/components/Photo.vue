<template>
  <div class="photo_container">
    <div class="card">
      <div class="more_info">
        <p>{{ text }}</p>
      </div>
      <article class="text-left line-height-1">
        <h2>{{ title }}</h2>
      </article>
      <img :src="src" :alt="title" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: {
    src: String,
    title: String,
    text: String,
  },
};
</script>

<style scoped>
h1 {
  color: #fcfbfa;
}

.card {
  float: left;
  position: relative;
}

.line-height-1 {
  line-height: 1;
}

.photo_container {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.photo_container article {
  padding-bottom: 0%;
  padding-left: 3%;
  position: absolute;
  bottom: 0;
  z-index: 1;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
  width: 100%;
}

.photo_container h2 {
  color: #fff;
  font-weight: 800;
  font-size: 25px;
}

.photo_container img {
  top: 0;
  left: 0;
  width: 100% !important;
  height: auto !important;
  -webkit-transition: all 4s ease;
  -moz-transition: all 4s ease;
  -o-transition: all 4s ease;
  -ms-transition: all 4s ease;
  transition: all 4s ease;
}

.more_info {
  background-color: #feb66c;
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transform: translate(0px, 70px);
  -webkit-transform: translate(0px, 70px);
  -moz-transform: translate(0px, 70px);
  -o-transform: translate(0px, 70px);
  -ms-transform: translate(0px, 70px);
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.more_info p {
  font-size: 14px;
  color: #fff;
  position: relative;
  margin: 0 auto;
  width: 100%;
  top: 13px;
  line-height: 1;
}

.photo_container:hover img {
  transform: scale(1.5);
}

.photo_container:hover article {
  transform: translate(2px, -100px);
  -webkit-transform: translate(2px, -100px);
  -moz-transform: translate(2px, -100px);
  -o-transform: translate(2px, -100px);
  -ms-transform: translate(2px, -100px);
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.photo_container:hover .more_info {
  transform: translate(0px, 0px);
  -webkit-transform: translate(0px, 0px);
  -moz-transform: translate(0px, 0px);
  -o-transform: translate(0px, 0px);
  -ms-transform: translate(0px, 0px);
  opacity: 1;
}

.text-left {
  text-align: left;
}
</style>

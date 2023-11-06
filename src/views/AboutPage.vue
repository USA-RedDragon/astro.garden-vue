<template>
  <div class="about">
    <h1>About Me</h1>

    <picture class="rounded img-responsive" style="width: 100%">
      <source :srcset="meWebp" type="image/webp" />
      <source :srcset="mePng" type="image/png" />
      <img
        style="width: 20%; border-radius: 16rem"
        :src="mePng"
        alt="Me, Jacob McSwain"
      />
    </picture>

    <p>
      Astro Garden is my personal gallery website for showcasing my
      astrophotography work. I started astrophotography in May of 2021 with a
      Nikon D5500 and a tripod. Now, I've got a dedicated astrophotography rig
      and soon some space for a remote observatory in western Oklahoma. This is
      the only place you can view my photos at full resolution for free.
    </p>
  </div>
</template>
<script setup>
import meWebp from '../assets/me.webp';
import mePng from '../assets/me.png';
</script>

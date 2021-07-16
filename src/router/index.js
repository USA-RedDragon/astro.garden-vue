import Vue from 'vue';
import VueRouter from 'vue-router';
import Gallery from '../views/Gallery.vue';
import About from '../views/About.vue';
import Details from '../views/Details.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/gallery/:gallery/:image',
    name: 'Gallery Details',
    component: Details,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

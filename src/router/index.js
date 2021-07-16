import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: () => import(/* webpackChunkName: "Gallery" */ '../views/Gallery.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/gallery/:gallery/:image',
    name: 'Gallery Image Details',
    component: () => import(/* webpackChunkName: "GalleryDetails" */ '../views/GalleryDetails.vue'),
  },
  {
    path: '/equipment',
    name: 'Equipment',
    component: () => import(/* webpackChunkName: "Equipment" */ '../views/Equipment.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

export default [
  {
    path: '/',
    name: 'Gallery',
    sitemap: {
      changefreq: 'daily',
      priority: 1,
    },
    component: () => import(/* webpackChunkName: "Gallery" */ '../views/Gallery.vue'),
  },
  {
    path: '/about',
    name: 'About',
    sitemap: {
      changefreq: 'monthly',
      priority: 0.75,
    },
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/gallery/:gallery/:image',
    name: 'Gallery Image Details',
    sitemap: {
      changefreq: 'weekly',
      priority: 0.5,
    },
    component: () => import(/* webpackChunkName: "GalleryDetails" */ '../views/GalleryDetails.vue'),
  },
  {
    path: '/equipment',
    name: 'Equipment',
    sitemap: {
      changefreq: 'monthly',
      priority: 0.75,
    },
    component: () => import(/* webpackChunkName: "Equipment" */ '../views/Equipment.vue'),
  },
];

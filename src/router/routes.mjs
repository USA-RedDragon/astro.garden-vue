export default [
  {
    path: '/',
    name: 'GalleryPage',
    sitemap: {
      changefreq: 'daily',
      priority: 1,
    },
    component: () => import(/* webpackChunkName: "GalleryPage" */ '../views/GalleryPage.vue'),
  },
  {
    path: '/about',
    name: 'AboutPage',
    sitemap: {
      changefreq: 'monthly',
      priority: 0.75,
    },
    component: () => import(/* webpackChunkName: "AboutPage" */ '../views/AboutPage.vue'),
  },
  {
    path: '/gallery/:gallery/:image',
    name: 'GalleryDetailsPage',
    sitemap: {
      changefreq: 'weekly',
      priority: 0.5,
    },
    component: () => import(/* webpackChunkName: "GalleryDetailsPage" */ '../views/GalleryDetailsPage.vue'),
  },
  {
    path: '/equipment',
    name: 'EquipmentPage',
    sitemap: {
      changefreq: 'monthly',
      priority: 0.75,
    },
    component: () => import(/* webpackChunkName: "EquipmentPage" */ '../views/EquipmentPage.vue'),
  },
];

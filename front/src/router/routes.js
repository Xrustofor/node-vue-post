
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/post/create', component: () => import('pages/CreateUpdatePage.vue') },
      { path: '/post/:idCard', component: () => import('pages/CardPage.vue') },
      { path: '/post/:idCard/update', component: () => import('pages/CreateUpdatePage.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

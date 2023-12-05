
const routes = [
  {
    path: '/',
    meta: { title: "Головнка" },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      {
        path: '/post/create',
        meta: { title: "Сворити картку" },
        component: () => import('pages/CreateUpdatePage.vue'),
      },
      {
        path: '/post/:idCard',
        meta: { title: "Картка" },
        component: () => import('pages/CardPage.vue')
      },
      {
        path: '/post/:idCard/update',
        meta: { title: "Редагувати картку" },
        component: () => import('pages/CreateUpdatePage.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]


export default routes

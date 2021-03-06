import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'dashboard',
    children: [
      { path: 'dashboard', component: () => import('pages/dashboard.vue') },
      { path: 'plugins', component: () => import('pages/plugins.vue') },
      { path: 'chat', component: () => import('pages/chat.vue') },
    ],
  },
];

export default routes;

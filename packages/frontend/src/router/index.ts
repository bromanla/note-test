import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import MainPage from '~/views/MainPage.vue';

export const enum RouteName {
  Main = 'main',
  Editor = 'editor',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.Main,
    component: MainPage,
  },
  {
    path: '/editor/:id?',
    name: RouteName.Editor,
    component: () => import('~/views/EditorPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

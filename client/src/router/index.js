import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import EditorView from '@/views/EditorView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
  },
  {
    path: '/editor',
    component: EditorView,
    name: 'ediror'
  },
  {
    path: '/editor/:id',
    component: EditorView,
    name: 'note'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

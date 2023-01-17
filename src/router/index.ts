import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Listview from '../views/ListView.vue'
import AddView from '../views/AddView.vue'
import EditView from '../views/EditView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Listview
  },
  {
    path: '/add',
    name: 'add',    
    component: AddView
  },
  {
    path: '/edit/:id',
    name: 'edit',    
    component: EditView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

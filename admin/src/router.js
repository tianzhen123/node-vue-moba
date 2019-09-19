import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import CategoryEdit from './views/CategoryEdit'
import CategoryList from './views/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path: 'categories/create',
          component: CategoryEdit,
        },
        {
          path: 'categories/edit/:id',
          component: CategoryEdit,
          props:true,
        },
        {
          path: 'categories/list',
          component: CategoryList,
        }
      ]
    },
  ]
})

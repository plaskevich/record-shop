import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import EditRelease from '@/components/EditRelease'
import ViewRelease from '@/components/ViewRelease'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'new-release',
      component: EditRelease
    },
    {
      path: '/edit/:id',
      name: 'edit-release',
      component: EditRelease,
      props: { editable: true }
    },
    {
      path: '/view/:id',
      name: 'view-release',
      component: ViewRelease,
      props: { editable: true }
    }
  ]
})
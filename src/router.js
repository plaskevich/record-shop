import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import Collection from '@/components/Collection'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import EditRelease from '@/components/EditRelease'
import ViewRelease from '@/components/ViewRelease'
import Settings from '@/components/Settings'
import Management from '@/components/Management'
import Statistics from '@/components/Statistics'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/collection/:page?',
      name: 'collection',
      component: Collection,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/management',
      name: 'management',
      component: Management,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.authenticated && to.path !== '/login' && to.path !== '/signup' && to.path !== '/') next('/login')
  else next()
})

export default router;
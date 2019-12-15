import Vue from 'vue'
import Router from 'vue-router'
import Collection from '@/components/Collection'
import Login from '@/components/Login'
import EditRelease from '@/components/EditRelease'
import ViewRelease from '@/components/ViewRelease'
import Settings from '@/components/Settings'
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'collection'
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user && to.path !== '/login') next('/login')
    else next()
  });
})

export default router;
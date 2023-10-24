import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // routes for the navbar
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/grafik',
      name: 'grafik',
      component: () => import('../views/grafikView.vue')
    },
    {
      path: '/tøj',
      name: 'tøj',
      component: () => import('../views/tøjView.vue')
    },
    {
      path: '/køkken',
      name: 'køkken',
      component: () => import('../views/køkkenView.vue')
    },
    {
      path: '/bøger',
      name: 'bøger',
      component: () => import('../views/bøgerView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/blogView.vue')
    },

    // routes for the footer
    {
      path: '/fragtsinfo',
      name: 'fragtsinfo',
      component: () => import('../views/fragtsinfoView.vue')
    },
    {
      path: '/betalingsmetoder',
      name: 'betalingsmetoder',
      component: () => import('../views/betalingsmetoderView.vue')
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: () => import('../views/cookiesView.vue')
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: () => import('../views/kontaktView.vue')
    },


    // ahhhm I'll have to find out what this is for
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, 
    {
      path: '/navguard',
      name: 'navguard',
      component: () => import ('../views/NavGuardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/LoginView.vue')
    },
  ]
})

router.beforeEach(async(to, from, next) => {
  if(to.matched.some(record => record.meta.requiredAuth)) {
    if (await getCurrentUser()) {
      next()
    }
    else {
      next({ path: 'login' })
    }
  }
  else {
    next()
  }
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    console.log("test currentUSer", getCurrentUser)
    const removeListener = onAuthstateChanged(
      getAuth(),
      user => {
        removeListener()
        resolve(user)
      },
      reject  
    )
  })
}

export default router

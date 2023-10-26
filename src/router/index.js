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
      component: () => import('../views/GrafikView.vue')
    },
    {
      path: '/tøj',
      name: 'tøj',
      component: () => import('../views/TøjView.vue')
    },
    {
      path: '/køkken',
      name: 'køkken',
      component: () => import('../views/KøkkenView.vue')
    },
    {
      path: '/bøger',
      name: 'bøger',
      component: () => import('../views/BøgerView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },

    // routes for the footer
    {
      path: '/fragtsinfo',
      name: 'fragtsinfo',
      component: () => import('../views/FragtsinfoView.vue')
    },
    {
      path: '/betalingsmetoder',
      name: 'betalingsmetoder',
      component: () => import('../views/BetalingsmetoderView.vue')
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: () => import('../views/CookiesView.vue')
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: () => import('../views/KontaktView.vue')
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


    // Admin routes for login system
    {
      path: '/navguard',
      name: 'navguard',
      component: () => import ('../views/NavGuardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/log-ind',
      name: 'log-ind',
      component: () => import ('../views/LogindView.vue')
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

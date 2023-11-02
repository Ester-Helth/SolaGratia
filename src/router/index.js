import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [

    // routes for the navbar
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/grafisk',
      name: 'grafisk',
      component: () => import('../views/GrafiskView.vue')
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
    // route for Produkt details
    {
      path: '/produktdetaljer/:id',
      name: 'produktdetaljer',
      component: () => import('../views/ProduktDetaljerView.vue'),
      props:true
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


    // Example - but delete when we have the real pages
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
      path: '/VIP',
      name: 'VIP',
      component: () => import ('../views/VIP-NavGuardView.vue'),
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

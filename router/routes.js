
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },

  {
    path: '/userprofile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Profile.vue') ,
    
    }
    ]
  },
  

  

  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') ,
    
    }
    ]
  },

  {
    path: '/register',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/Register.vue'),
         
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

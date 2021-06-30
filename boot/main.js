import { colors } from 'quasar'

colors.setBrand("primary", "black");

export default async ({ app, router, Vue }) => {


  router.beforeEach((to, from, next) => {
    console.log("hgdjhdhgdjhajshgdjhasgd")
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      (async () => {
        try {
            const isAuthenticate = await isAuthenticated()
            console.log("isAuthenticate-- ",isAuthenticate)
            if (!isAuthenticate) {
              clearValues(next);
            } else {
              next()
            }
        }
        catch (err) {
          clearValues(next);
        }
      })();
    } else {
      next()
    }
  })
  router.afterEach((to, from) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      
    }
  })


  function clearValues(next){
    router.push({path : "/"});
    localStorage.clear();
    sessionStorage.clear();
  }

  async function isAuthenticated() {
    return new Promise((resolve, reject) => {
      (async () => {
        if (store.state.token) {
          resolve(true);
        } else {
          reject(false);
        }
      })();
    })
  }

  Vue.prototype.$ROUTER = router
 
}

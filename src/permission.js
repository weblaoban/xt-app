import router from './router/'
import store from './store'
import { validatenull } from '@/utils/validate'
import { getToken } from '@/utils/auth'
console.log(getToken())
const lockPage = '/lock'; //锁屏页
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  store.commit('SET_IS_MENU', isMenu === undefined);
  if (getToken()) {
    if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockPage })
    } else if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
      next({ path: '/' })
    } else {
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      if (!store.getters.userInfo.id) {
        store.dispatch('GetUserInfo').then(() => {
          next({ ...to, replace: true })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        const meta = to.meta || {}
        const query = to.query || {}
        if (meta.target) {
          window.open(query.url.replace(/#/g, "&"))
          return
        } else if (meta.isTab !== false) {
          store.commit('ADD_TAG', {
            name: query.name || to.name,
            path: to.path,
            fullPath: to.fullPath,
            params: to.params,
            query: to.query,
            meta: meta
          });
        }
        next()
      }
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === true) {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  let title = router.$avueRouter.generateTitle(to)
  if(to.query.isInsurance=='1'){
    router.$avueRouter.setTitle('保险');
  }else if(to.query.isDirect=='1'){
    router.$avueRouter.setTitle('直融资产');
  }else if(to.query.isPrivate=='1'){
    router.$avueRouter.setTitle('私募基金');
  }else if(to.query.isDebt=='1'){
    router.$avueRouter.setTitle('境外债');
  }else{
    router.$avueRouter.setTitle(title);
  }
  store.commit('SET_IS_SEARCH', false)
});

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import ViewsRouter from './views/'
import AvueRouter from './avue-router';
import i18n from '@/lang'
import Store from '@/store/'
//创建路由
const Router = createRouter({
    base: import.meta.env.VITE_APP_BASE,
    history: createWebHashHistory(),
    routes: [...ViewsRouter],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})
AvueRouter.install({
    store: Store,
    router: Router,
    i18n: i18n
});

// Router.$avueRouter.formatRoutes(Store.getters.menuAll, true);

export default Router
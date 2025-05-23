export default [
    {
        path: "/",
        component: () => import("@/page/index/index.vue"),
        redirect: "/index",
        children: [
            {
                path: "index",
                name: "首页",
                meta: {
                    title: "首页",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/index.vue"),
            },
            {
                path: "xtcombine",
                name: "集合信托",
                meta: {
                    title: "集合信托",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/xtCombine.vue"),
            },
            {
                path: "ziguan",
                name: "集合资管",
                meta: {
                    title: "集合资管",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/jeZi.vue"),
            },
            {
                path: "privateFund",
                name: "私募基金",
                meta: {
                    title: "私募基金",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/jijin.vue"),
            },
            {
                path: "prodDetail/:id",
                name: "产品详情",
                meta: {
                    title: "产品详情",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/prodDetail.vue"),
            },
            {
                path: "oProdDetail/:id",
                name: "产品详情（境外债）",
                meta: {
                    title: "产品详情（境外债）",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/oProdDetail.vue"),
            },
            {
                path: "bProdDetail/:id",
                name: "产品详情（保险）",
                meta: {
                    title: "产品详情（保险）",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/bProdDetail.vue"),
            },
            {
                path: "bItemDetail",
                name: "产品购买详情（保险）",
                meta: {
                    title: "产品购买详情（保险）",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/bItemDetail.vue"),
            },
            {
                path: "trustQa",
                name: "信托问答",
                meta: {
                    title: "信托问答",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/qa.vue"),
            },
            {
                path: "trustQaDetail/:id",
                name: "信托问答详情",
                meta: {
                    title: "信托问答详情",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/qaDetail.vue"),
            },
            {
                path: "information",
                name: "财经资讯",
                meta: {
                    title: "财经资讯",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/zixun.vue"),
            },
            {
                path: "informationDetail/:id",
                name: "财经资讯详情",
                meta: {
                    title: "财经资讯详情",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/zixunDetail.vue"),
            },
            {
                path: "aboutUs",
                name: "关于我们",
                meta: {
                    title: "关于我们",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/aboutUs.vue"),
            },
            {
                path: "register",
                name: "注册",
                meta: {
                    title: "注册",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/register.vue"),
            },
            {
                path: "login",
                name: "登录",
                meta: {
                    title: "登录",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/register.vue"),
            },
            {
                path: "updatePassword",
                name: "修改密码",
                meta: {
                    title: "修改密码",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/updatePassword.vue"
                    ),
            },
            {
                path: "forgetPassword",
                name: "忘记密码",
                meta: {
                    title: "忘记密码",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/forgetPassword.vue"
                    ),
            }, {
                path: 'linkus',
                name: "联系我们",
                meta: {
                    title: "联系我们",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/linkus.vue"
                    ),
            }, {
                path: 'account',
                name: "我的账户",
                meta: {
                    title: "我的账户",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/account.vue"
                    ),
            }, {
                path: 'buyDetail',
                name: "购买详情",
                meta: {
                    title: "购买详情",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/buyDetail.vue"
                    ),
            }, {
                path: 'customList',
                name: "客户列表",
                meta: {
                    title: "客户列表",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/customList.vue"
                    ),
            },
            {
                path: "buyDetailInfo/:id",
                name: "产品购买详情",
                meta: {
                    title: "产品购买详情",
                },
                component: () =>
                    import(/* webpackChunkName: "views" */ "@/views/wel/buyDetailInfo.vue"),
            }, {
                path: 'plannerDetail',
                name: "客户购买详情",
                meta: {
                    title: "客户购买详情",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/plannerDetail.vue"
                    ),
            }, {
                path: 'bDetail',
                name: "保险详情",
                meta: {
                    title: "保险详情",
                },
                component: () =>
                    import(
						/* webpackChunkName: "views" */ "@/views/wel/bDetail.vue"
                    ),
            }

        ],
    },
];

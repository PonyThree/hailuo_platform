import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/manager'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/manager',
                    component: resolve => require(['../components/page/Manager.vue'], resolve),
                    meta: { title: '项目管理' }
                },
                {
                    path: '/banner',
                    component: resolve => require(['../components/page/Banner.vue'], resolve),
                    meta: { title: '首页banner' }
                },
                {
                    path: '/activity',
                    component: resolve => require(['../components/page/Activity.vue'], resolve),
                    meta: { title: '活动管理' }
                },
                {
                    path: '/colonel',
                    component: resolve => require(['../components/page/Colonel.vue'], resolve),
                    meta: { title: '我要当团长管理' }
                },
                {
                    path: '/many',
                    component: resolve => require(['../components/page/Many.vue'], resolve),
                    meta: { title: '多人拼团'}
                },
                {
                    path: '/thousand',
                    component: resolve => require(['../components/page/Thousand.vue'], resolve),
                    meta: { title: '万人众筹' }
                },
                {
                    path: '/list',
                    component: resolve => require(['../components/page/List.vue'], resolve),
                    meta: { title: '团列表 '}
                },
                {
                    path: '/colonel_details',
                    component: resolve => require(['../components/page/Colonel_details.vue'], resolve),
                    meta: { title: '我要当团长活动详情页' }
                },
                {
                    path: '/many_details',
                    component: resolve => require(['../components/page/Many_details.vue'], resolve),
                    meta: { title: '多人拼团活动详情页' }
                },
                {
                    path: '/thousand_details',
                    component: resolve => require(['../components/page/Thousand_details.vue'], resolve),
                    meta: { title: '万人众筹活动详情页' }
                },
                {
                    path: '/member',
                    component: resolve => require(['../components/page/Member.vue'], resolve),
                    meta: { title: '团成员管理' }
                },
                {
                    path: '/coupon_manage',
                    component: resolve => require(['../components/page/Coupon_manage.vue'], resolve),
                    meta: { title: '礼券包管理' }
                },
                {
                    path: '/added',
                    component: resolve => require(['../components/page/Added.vue'], resolve),
                    meta: { title: '新增礼券包' }
                },
                {path: '/check_coupons',
                    component: resolve => require(['../components/page/Check_coupons.vue'], resolve),
                    meta: { title: '查看礼券包' }
                },
                {
                    path: '/coupon_list',
                    component: resolve => require(['../components/page/Coupon_list.vue'], resolve),
                    meta: { title: '礼券列表' }
                },
                {
                    path: '/self_support',
                    component: resolve => require(['../components/page/Self_support.vue'], resolve),
                    meta: { title: '查看礼券详情—自营活动' }
                },
                {
                    path: '/third_party',
                    component: resolve => require(['../components/page/Third_party.vue'], resolve),
                    meta: { title: '查看礼券详情—第三方活动' }
                },
                {
                    path: '/cancelled',
                    component: resolve => require(['../components/page/Cancelled.vue'], resolve),
                    meta: { title: '查看礼券详情—已核销' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})

import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',//默认跳转页面

        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/项目管理',
                    component: resolve => require(['../components/page/ProjectManagement/项目管理.vue'], resolve),
                    meta: { title: '项目管理' }
                },
                {
                    path: '/项目详情',
                    name:'项目详情',
                    component: resolve => require(['../components/page/ProjectManagement/项目详情.vue'], resolve),
                    meta: { title: '项目详情' }
                },
                {
                    path: '/设置',
                    component: resolve => require(['../components/page/personalCenter/设置.vue'], resolve),
                    meta: { title: '设置' }
                },
                {
                    path: '/城市管理',
                    component: resolve => require(['../components/page/areaCenter/城市管理.vue'], resolve),
                    meta: { title: '城市管理' }
                },
                {
                    path: '/首页banner',
                    component: resolve => require(['../components/page/clientMange/首页banner.vue'], resolve),
                    meta: { title: '首页banner' }
                },
                {
                    path: '/合作项目',
                    component: resolve => require(['../components/page/clientMange/合作项目.vue'], resolve),
                    meta: { title: '合作项目' }
                },
                {
                    path: '/客户端管理',
                    component: resolve => require(['../components/page/clientMange/客户端管理.vue'], resolve),
                    meta: { title: '客户端管理' }
                },
                {
                    path: '/用户钱包管理',
                    component: resolve => require(['../components/page/financeCenter/用户钱包管理.vue'], resolve),
                    meta: { title: '用户钱包管理' }
                },
                {
                    path: '/钱包使用详情',
                    component: resolve => require(['../components/page/financeCenter/钱包使用详情.vue'], resolve),
                    meta: { title: '钱包使用详情' }
                },
                {
                    path: '/零钱提现',
                    component: resolve => require(['../components/page/financeCenter/零钱提现.vue'], resolve),
                    meta: { title: '零钱提现' }
                },
                {
                    path: '/提现详情',
                    name:"提现详情",
                    component: resolve => require(['../components/page/financeCenter/提现详情.vue'], resolve),
                    meta: { title: '提现详情' }
                },
                {
                    path: '/项目财务管理',
                    component: resolve => require(['../components/page/financeCenter/项目财务管理.vue'], resolve),
                    meta: { title: '项目财务管理' }
                },
                {
                    path: '/项目申请提现',
                    component: resolve => require(['../components/page/financeCenter/项目申请提现.vue'], resolve),
                    meta: { title: '项目申请提现' }
                },
                {
                    path: '/审核提现',
                    component: resolve => require(['../components/page/financeCenter/审核提现.vue'], resolve),
                    meta: { title: '审核提现' }
                },
                {
                    path: '/审核状态',
                    component: resolve => require(['../components/page/financeCenter/审核状态.vue'], resolve),
                    meta: { title: '审核状态' }
                },
                
                // {
                //     path: '/地图',
                //     component: resolve => require(['../components/page/areaCenter/map.vue'], resolve),
                //     meta: { title: '地图' }
                // }
                
                
                // {
                //     path:'/修改密码',
                //     component: resolve => require(['../components/page/personalCenter/修改密码.vue'], resolve),
                //     meta: { title: '修改密码' }
                // },
                // {
                //     path:'/修改绑定手机',
                //     component: resolve => require(['../components/page/personalCenter/修改绑定手机.vue'], resolve),
                //     meta: { title: '修改绑定手机' }
                // },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/Index',
            component: resolve => require(['../components/common/Index.vue'], resolve)
        },
        
    ]
})

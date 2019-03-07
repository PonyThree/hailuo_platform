import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";


//引入全局配置服务器域名
import request from './api/request.js'
global.request=request;


//引入axiosde post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;



new Vue({
    router,
    render: h => h(App)
}).$mount('#app')





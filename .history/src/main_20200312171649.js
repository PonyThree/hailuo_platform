import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/color-green.css';       // 浅绿色主题
// import './assets/css/theme-green/color-green.css';       // 浅蓝色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import './assets/fonts/iconfont.css'; //引入阿里图标
import {
	Message,
	Loading
} from 'element-ui'; //引入element的loading
//引入百度地图
import BaiduMap from 'vue-baidu-map'
import qs from 'qs'; //qs 用来解决vue中post请求以 a=a&b=b 的格式

//引入全局配置服务器域名
import request from './api/request.js'
global.request = request;

axios.defaults.withCredentials = true; //解决跨域问题
//引入axios的 post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


Vue.config.productionTip = false
Vue.use(ElementUI, {
	size: 'small'
});
Vue.use(BaiduMap, {
	// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
	ak: 'RWH9ZFBykv6AjsDurEoj62wKvoVStp9P'
})
Vue.prototype.$axios = axios;


let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法 
	loading = Loading.service({
		lock: true,
		text: '加载中……',
		background: 'rgba(0, 0, 0, 0.7)'
	})
}

function endLoading() { //使用Element loading-close 方法
	loading.close()
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。 
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。 
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading()
	}
	needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return
	needLoadingRequestCount--
	if (needLoadingRequestCount === 0) {
		endLoading()
	}
}





// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	//console.log("response",response);
	return response
}, function (error) {
	// 对响应错误做点什么
	if (error.response.status == 401) {
		router.push({
			path: '/login'
		})
		return;
	}
	//console.log("Promise.reject(error)",Promise.reject(error));
	return Promise.reject(error)
});
//请求设置token
axios.interceptors.request.use(
	config => {
		if (localStorage.token) { //判断token是否存在
			//    console.log(localStorage.token)
			config.headers.token = localStorage.token; //将token设置成请求头
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
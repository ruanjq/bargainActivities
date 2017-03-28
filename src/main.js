//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueTouch from 'vue-touch';
import VueResource from 'vue-resource';
import App from './App';
import { configRouter } from './modules/route-config';
import FastClick from 'fastclick';

/* eslint-disable no-new */
Vue.use(VueRouter);

Vue.use(VueResource);

// Vue.use(VueTouch);
// 
// 
// register filters
Vue.filter('date', require('./modules/filters/dateFormat.js'));
Vue.directive('position', require('./modules/directive.js'));



const router = new VueRouter({
    saveScrollPosition: false,   //只在 HTML5 history 模式下可用
    history: true
});

const app = Vue.extend({
    components: { App }
});


Vue.http.options.emulateJSON = true;

FastClick.attach(document.body);


configRouter(router);



router.start(app, 'body');

    


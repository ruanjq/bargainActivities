/**
 * [路由配置]
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
export function configRouter(router) {
    router.map({
        '/wap/splash': {
            name: 'home',
            component(resolve) {
                require(['../components/home'], resolve);
            }
        },
        '/wap/splash-help': {
            name: 'help',
            component(resolve) {
                require(['../components/help'], resolve);
            }
        },
        '/wap/splash-details': {
            name: 'details',
            component(resolve) {
                require(['../components/details'], resolve);
            }
        },
        '/about': {
            name: 'about',
            component(resolve) {
                require(['../components/about'], resolve);
            }
        }
    });
    // 默认重定向到 home 页面
    router.redirect({
        '*': '/wap/splash'
    });

    router.beforeEach(transition => {
        window.scrollTo(0, 0);
        transition.next();
    });
}

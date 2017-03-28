
/**
 * @desc 常量配置
 * @time 2016-08-23
 * @author  ruanjq
 * @version 0.1
 */

export default {
    version:'0.1',
    author:'ruanjq',
    desc:'a test webpack demo',
    appId:'500588386792107',
    // apiUrl:'static/bargainActivities/static/JSON/',
    // apiUrl:'/v4_1/bargain-activities/',
    apiUrl:'http://app.yoshop.com',
    yoshopDownloadUrl:"https://yoshop.onelink.me/118270307?pid=Marketing&c=kanjia",
    userInfo:{
        isLogin:false,
        user_id:''
        // user_id:'Alw3Pa+gGcI='
        // user_id:'nMtO4Ji6sRM='
        // user_id:'bwpDrpCYUyE=' 
    },
    isApp:false,
    path:"relase",
    deepLink:'yoshop://action?actiontype=5&url=http://www.yoshop.com&name=yoshop&source=deeplink',   //yoshop 打开连接
    loginCheck:'webAction://login?callback=userinfo()&isAlert=1',   // 登录接口
    isAppCheck:'webAction://isApp?callback=isAppRes()'   // app 检测接口
};
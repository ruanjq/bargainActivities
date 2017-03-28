import config from './config';
import httpService from './services';
/**
 * [ 倒计时 ]
 * @param  {[type]}   endTime  [ 结束日期 ]
 * @param  {[type]}   nowTime  [ 服务器时间 ]
 * @param  {Function} callback [ 回调函数 ]
 * @return {[type]}            [description]
 */
let countdown = function(endTime, nowTime, callback) {
    let end = new Date(parseInt(endTime) * 1000),
        _second = 1000,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24,
        timer;

    function showRemaining() {
        let now = new Date(parseInt(nowTime) * 1000);
        let distance = end - now;
        if (distance < 0) {
            clearInterval(timer); // stop the timer from continuing ..
            callback({
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00'
            });
            return;
        }
        let days = Math.floor(distance / _day),
            hours = Math.floor((distance % _day) / _hour),
            minutes = Math.floor((distance % _hour) / _minute),
            seconds = Math.floor((distance % _minute) / _second),
            milliseconds = distance % _second;

        if (days < 10) {
            days = '0' + days;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        nowTime = parseInt(nowTime) + 1;
        callback({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
    }
    timer = setInterval(showRemaining, 1000);
};

/**
 * [ 注册FB 分享SDK ]
 * @return {[type]} [description]
 */
let registerFBShare = function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '500588386792107',
            xfbml: true,
            cookie: true, // enable cookies to allow the server to access 
            version: 'v2.5'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
};


/**
 * [FB 分享平台判断]
 * @param  {[type]}   shareUrl [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
let doFBShare = function(param) {
    // console.log("分享参数",param);

    let shareUrl = param.shareUrl;
    if (config.isApp == true) {

        // 客户端分享url编码处理，解决客户端无法解密问题。
        shareUrl = encodeURIComponent(shareUrl);
        location.href = `webAction://sharing?shareUrl=${shareUrl}&shareContent=Slash Price Down to $0&shareTitle=Slash Price Down to $0&imageUrl=http://uidesign.yoshop.com/YOSHOP/images/index/cutpriceg.jpg&callback=shareSuccess()`;

        // app客户端分享成功执行的回调函数
        window.shareSuccess = function(res) {
            if(param.user_id){
                httpService.isShare({
                    user_id:param.user_id,
                    bargain_id:param.bargain_id
                });
            }
        };
    } else {
        FB.ui({
            method: 'share',
            // mobile_iframe: true,
            display: 'popup',
            picture: "http://uidesign.yoshop.com/YOSHOP/images/index/cutpriceg.jpg",
            href: shareUrl,
            description: 'Slash Price Down to $0'
        }, res => {});
    }
};


/**
 * [FBLogin description]
 * @param {Function} callback [description]
 */
let FBLogin = function(callback) {
    FB.login(function(response) {
        if (response.status === 'connected') {
            if (response.authResponse) {
                FB.api('/me?fields=name,first_name,last_name,email', function(res) {
                    let info = {
                        fb_id: res.id,
                        name: res.name,
                        token: response.authResponse.accessToken,
                        email: ''
                    };
                    // 判断是否有 Email,
                    if (res.email != undefined && res.email != "") {
                        info.email = res.email;
                    }
                    // console.log("=======================");
                    // console.log(res, response);
                    callback(info);
                    // console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                alert('User cancelled login or did not fully authorize');
                // console.log('User cancelled login or did not fully authorize.');
            }
        } else if (response.status === 'not_authorized') {
            alert("error");
            // The person is logged into Facebook, but not your app.
        } else {
            alert("error");
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
        }
    }, { scope: 'public_profile,email' });
};

/**
 * [getParameterByName description]
 * @param  {[type]} name [description]
 * @param  {[type]} url  [description]
 * @return {[type]}      [description]
 */
let getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    // return decodeURIComponent(results[2].replace(/\+/g, " "));
    return decodeURIComponent(results[2]);
};

/**
 * @description 数组分页获取数据
 */
class PageData {

    /**
     * [constructor 初始化数组对象和分页数量]
     * @param  {[type]} array     [description]
     * @param  {[type]} pageCount [description]
     * @return {[type]}           [description]
     */
    constructor(array, pageCount) {
            this.pageIndex = 0;
            this.data = array;
            this.pageCount = pageCount;
            this.pageSize = array.length % pageCount == 0 ? parseInt(array.length / pageCount) : parseInt(array.length / pageCount) + 1;
        }
        /**
         * [获取分页数据]
         * @return {[type]} [description]
         */
    getItem() {
        if (!this.data) return [];
        return this.data.slice(this.pageCount * this.pageIndex, this.pageCount * (this.pageIndex + 1));
    }
}


module.exports = {
    countdown,
    registerFBShare,
    doFBShare,
    getParameterByName,
    FBLogin,
    PageData
};


import Vue from 'vue';
import config from './config';

const httpService = {};

httpService.apiUrl = config.apiUrl;

/**
 * [ 获取砍价商品列表 ]
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
httpService.getSlashList = function (argument) {
    // return Vue.http.get(`${this.apiUrl}list`); 
    return Vue.http.get(`${this.apiUrl}/bargain-activities/list`); 
    // return Vue.http.get("/static/bargainActivities/static/JSON/shopList.json"); 
};


/**
 * [ 获取砍价商品详细信息 ]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
httpService.getSlashDetail = function(param){
    return Vue.http.post(`${this.apiUrl}/bargain-activities/good-dateils`,{
    	user_id:param.user_id,
    	bargain_id:param.bargain_id
    }); 
};


/**
 * [spalsh description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
httpService.spalsh = function(param){
    return Vue.http.post(`${this.apiUrl}/bargain-activities/bargain`,{
        user_id:param.user_id,
        bargain_id:param.bargain_id,
        help_id:param.help_id
    }); 
};


/**
 * [help spalsh description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
httpService.spalshHelp = function(param){
    return Vue.http.post(`${this.apiUrl}/bargain-activities/helpbargain`,{
        user_id:param.user_id,
        bargain_id:param.bargain_id,
        help_id:param.help_id,
    }); 
};

/**
 * [ 获取加密后的user_id ]
 * @return {[type]} [description]
 */
httpService.getUserId = function(param){
    return Vue.http.post(`${this.apiUrl}/bargain-activities/api-login`,{
        fb_id:param.fb_id,
        email:param.email,
        token:param.token,
        name:param.name
    }); 
};


/**
 * [ 分享成功执行的回调函数 ]
 * @param  {[type]}  param [description]
 * @return {Boolean}       [description]
 */
httpService.isShare = function(param){
    return Vue.http.post(`${this.apiUrl}/wap/isshare`,{
        user_id:param.user_id,
        bargain_id:param.bargain_id
    }); 
};


export default httpService;
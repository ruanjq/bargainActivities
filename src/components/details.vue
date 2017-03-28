<template>
    <section class="scroll-box">
        <div class="box2">
            <section class="details-timer" v-if="detailsInfo.goods_state == 1">
                Pro End in:
                <span>{{timerVla.days}}</span>:<span>{{timerVla.hours}}</span>:<span>{{timerVla.minutes}}</span>:<span>{{timerVla.seconds}}</span>
            </section>
            <!-- 砍价结束提示 start  -->
            <section class="details-timer game-end-warning" v-else>
                GAME IS OVER!!!
            </section>
            <!-- 砍价结束提示 end   -->
            <section class="details-info">
                <div class="pic">
                    <img :src="detailsInfo.imgUrl" onload="this.style.opacity='1';"/>
                </div>
                <div class="desc">
                    <p class="config">{{detailsInfo.desc}}</p>
                    <div class="bottom">
                        <div class="info-left">
                            <span class="price">${{detailsInfo.price}}</span>
                            <span class="item"><span>{{detailsInfo.remain}}</span> Item(S) Left</span>
                        </div>
                        <a class="info-right" @click="viewDetails" href="javascript:void(0)">View Details&nbsp;&gt;</a>
                    </div>
                    <div class="no">
                      <p>No. of winners: <strong>{{detailsInfo.winnernum}}</strong></p>
                      <p>No. of participants: <strong>{{detailsInfo.joinnum}}</strong></p>
                    </div>
                    <div class="splash-desc" v-if="detailsInfo.user_state != 0">
                        <!-- 旧提示文案 -->
                        <!-- <p class="splash-txt">
                            You have cut ${{detailsInfo.help_bargain.price}}! Keep going! Invite friends to help you. First come, first served!
                        </p> -->

                        <p class="splash-txt margin-bottom-10">
                            You still need <strong>{{detailsInfo.bargainnum}}</strong> friends before slash successfully.
                        </p>
                        <div class="sd-top">
                            <img :src="detailsInfo.help_bargain.help_avatar" onload="this.style.opacity='1';"/>
                            <!-- <img src="'http://www.baidu.com/abc/index.jpg'" /> -->
                            <h2>{{detailsInfo.help_bargain.help_nickname}}</h2>
                            <p>{{detailsInfo.help_bargain.b_time | date 'HH:mm MM/dd/YYYY'}}</p>
                            <div class="sp-pice">
                                -${{detailsInfo.help_bargain.price}}
                            </div>
                        </div>
                        
                    </div>
                    <!-- 砍价结束提示语 start -->
                    <div class="splash-desc splash-end" v-if="detailsInfo.goods_state == 0 && detailsInfo.user_state == 0">
                        <p>ReWard Collected!</p>
                        <p>Thank you for your participation!</p>
                    </div>
                    <!-- 砍价结束提示语 end -->
                    <!-- 砍价成功start -->
                    <div class="splash-desc splash-success" v-if="detailsInfo.user_state == 2">
                        <p>GET MASSIVE SAVINGS!</p>
                        <p>Your Coupon Code: {{detailsInfo.coupon_code}} Coupon code sent to your account. View coupon in “My Coupon”.</p>
                    </div>
                    <!-- 砍价成功end -->
                    <div class="progress-box" v-if="detailsInfo.user_state != 0">
                        <progress :style="'candy'" :value="parseFloat(detailsInfo.splashProgress) * 100" v-position="detailsInfo.splashProgress">
                            <span class="triangle"></span>
                            <span slot class="circle"></span>
                            <span class="progress-tip" slot>Total Price Cut:${{detailsInfo.splashTotal}}</span>
                        </progress>
                    </div>
                </div>
                <div class="fb-share">
                    <a href="javascript:void(0)" @click="splash()" class="slash-btn" v-if="detailsInfo.user_state == 0 && detailsInfo.goods_state == 1">SLASH PRICE</a>
                    <a href="javascript:void(0)" class="fb-share-btn" @click="FBShare"><strong>f</strong> Share on Facebook</a>
                    <p>Share on Facebook, invite friends to cut the price down!</p>
                </div>
            </section>
            <!-- 好友砍价 -->
            <section class="friend-lead" v-if="bargain_record.length != 0">
                <h2 class="fl-title">Friend Leaderboard</h2>
                <div class="fl-list">
                    <div class="fl-item" v-for="item in bargain_record" track-by="$index">
                        <img :src="item.help_avatar"  onload="this.style.opacity='1';"/>
                        <h3>{{item.help_nickname}}</h3>
                        <p>{{item.b_time | date 'HH:mm MM/dd/YYYY'}}</p>
                        <span>-${{item.price}}</span>
                    </div>
                </div>
                <!--  <div class="more-btn">
                   <a href="javascript:void(0)">
                     More
                   </a>
                 </div> -->
            </section>
        </div>
        <toast :show.sync="toast.toastShow" class="customerToast" type="text" :width="' '" :time="1500">{{toast.toastMsg}}</toast>
        <alert :show.sync="alertObj.isShow" title="yoshop" button-text="OK" class="customer-alert">
            <p style="text-align:center;">{{alertObj.txt}}</p>
        </alert>
        <loading :show="isLoading" :text="'loading...'" class="customer-loading"></loading>
    </section>
</template>


 
<style lang="less">
  @import '../styleSheet/less/utility.less';
  @import '../styleSheet/less/common.less';
  @import '../styleSheet/less/slash.less';
  
  
   
</style>

<script>
import Alert from 'vux-components/alert/index';
import Progress from './progress';
import Spinner from 'vux-components/spinner/index';
import Toast from 'vux-components/toast/index';
import httpService from '../modules/services';
import {countdown,doFBShare,getParameterByName,PageData} from '../modules/common';
import Loading from 'vux-components/loading/index';
import config from '../modules/config';
export default{
    data() {
        return {
          timerVla:{
            days:'00',
            hours:'00',
            minutes:'00',
            seconds:'00'
          },
          toast:{
            toastShow:false,
            toastMsg:''
          },
          isLoading:false,
          pullupStatus: 'default',
          pullupConfig:{},
          alertObj:{
            isShow:false,
            txt:''
          },
          detailsInfo:{
            splashProgress:0,
            help_bargain:{}
          },
          bargain_record:[],
          pageData:{},
          vHeight:'0px'
        }
    },
    computed:{
      pullupConfig:function(){
        let fontSize = parseFloat(document.getElementsByTagName("html")[0].style.fontSize);
        return {
          height: parseInt(1.066667 * fontSize),
        }
      }
    },
    components:{
      Alert,Progress,Spinner,Toast,Loading
    },
    methods:{
        alert(txt){
          this.alertObj.isShow = true;
          this.alertObj.txt = txt;
        },
        FBShare(){

          let shareUrl = "";
          // 登录和未登录分享的链接地址不一致
          if(config.userInfo.isLogin == false){
            shareUrl = `${window.location.href}`;
          } else{
            // alert("已登录");
            let href = window.location.href.replace("splash-details", "splash-help");
            shareUrl = `${href}&rootUid=${config.userInfo.user_id}`;
          }
          doFBShare({
            shareUrl:shareUrl,
            user_id:config.userInfo.user_id,
            bargain_id:this.$route.query.bargain_id
          });
        },
        viewDetails(){
          if(config.isApp == true){
            console.log(true);
            window.location.href = `yoshop://action?actiontype=3&url=${this.detailsInfo.goods_id},${this.detailsInfo.wid}&name=women&source=banner`;//打开某手机上的某个app应用
          } else{
            setTimeout(function(){
              window.location.href = config.yoshopDownloadUrl;//如果超时就跳转到app下载页
            },800);
            window.location.href = `yoshop://action?actiontype=3&url=${this.detailsInfo.goods_id},${this.detailsInfo.wid}&name=women&source=banner`;//打开某手机上的某个app应用
          }
        },
        splash(){
          let self = this;
          // 判断是否为app环境
          if(config.isApp === true){

            // 检测是否登录
            location.href = config.loginCheck;
            
            // 登录成功回调
            window.userinfo = function (userRes) {
              config.userInfo.isLogin = true;
              config.userInfo.user_id = userRes;
              // 执行砍价操作
              self.isLoading = true;
              httpService.spalsh({
                user_id:config.userInfo.user_id,
                bargain_id:self.detailsInfo.bargain_id,
                help_id:config.userInfo.user_id
              }).then((res) => {
                if(res.status != 200){
                  self.alert('Service connection failed');
                  return;
                }
                if(res.json().status != 1){
                  self.alert(res.json().msg);
                  return;
                }
                self.$set('detailsInfo',res.json().msg);
                self.bargain_record = [];
                // 实例化分页对象
                self.pageData = new PageData(self.detailsInfo.bargain_record,10);
              },(err) => {
                self.alert('Access failed');
              }).finally(() =>{
                self.isLoading = false;
              });
            }
            if(config.path === 'test'){
              window.userinfo(config.userInfo.user_id);
            }
          } else{
            window.location=`yoshop://action?actiontype=5&url=${encodeURIComponent(window.location.href)}&name=yoshop&source=deeplink`;//打开某手机上的某个app应用
            setTimeout(function(){
                window.location.href = config.yoshopDownloadUrl;//如果超时就跳转到app下载页
            },800);
          }
        },
        initData(){
          let self = this;
          // 获取商品详细信息
          if(!this.$route.query.bargain_id) return;
          this.isLoading = true;
          httpService.getSlashDetail({
            user_id:config.userInfo.user_id,
            bargain_id:this.$route.query.bargain_id
          }).then((res) => {
            if(res.status != 200){
              this.alert('Service connection failed');
              return;
            }
            if(res.json().status != 1){
              this.alert(res.json().msg);
              return;
            }
            self.$set('detailsInfo',res.json().msg);
            // 实例化分页对象
            self.pageData = new PageData(self.detailsInfo.bargain_record,10);
            // 倒计时 goods_state 不为0 或者 商品不为0
            if(self.detailsInfo.goods_state == 0){
              // console.log("活动结束");
              // console.log("不倒计时");
            } else{
              // console.log("倒计时");
              countdown(res.json().msg.endTime,res.json().msg.nowTime,(resTime) => {
                self.$set('timerVla',resTime);
              });
            }
          },(err) => {
            self.alert('Service connection failed');
          }).finally(() => {
            this.isLoading = false;
          });
        }
    },
    ready(){

      let self = this;
      this.initData();
      setTimeout(function(){
        window.location.href = config.isAppCheck;
      })
      window.isAppRes = function (argument) {
        config.isApp = true;
        setTimeout(function(){
          location.href = config.loginCheck;
        })
        window.userinfo = function (res_uid) {
          config.userInfo.isLogin = true;
          config.userInfo.user_id = res_uid;
          self.initData();
        }
        if(config.path === 'test'){
          window.userinfo.apply(this,[config.userInfo.user_id]);
        }
      }

      if(config.path === 'test'){
          window.isAppRes.call(this);
      }

      /**
       * [ 滚动加载 ]
       * @param  {[type]} ) {                   let scrollTop [description]
       * @return {[type]}   [description]
       */
      window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop + window.innerHeight >= document.body.clientHeight) {
            try{
              getPageData();
            }catch(e){

            }
        }
      });

      function getPageData(){
          if(self.pageData.pageIndex >= self.pageData.pageSize){
              // console.log("没有数据");
              return;
          }
          self.bargain_record = self.bargain_record.concat(self.pageData.getItem());
          self.pageData.pageIndex++;
      }
    }

}
</script>
<template>
    <section class="scroll-box">
        <!-- 好友帮砍价页面  -->
        <div class="box2">
            <section class="details-timer" v-if="detailsInfo.goods_state == 1">
                Pro End in:
                <span>{{timerVla.days}}</span>:<span>{{timerVla.hours}}</span>:<span>{{timerVla.minutes}}</span>:<span>{{timerVla.seconds}}</span>
            </section>
            <!-- 砍价结束提示 start  -->
            <section class="details-timer game-end-warning" v-else>
                GAME IS OVER!!!
            </section>
            <!-- 砍价结束提示 end  -->
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
                    <div class="splash-desc" v-if="detailsInfo.user_state == 1 || detailsInfo.user_state == 2">
                        <div class="sd-top">
                            <img :src="detailsInfo.help_bargain.help_avatar" onload="this.style.opacity='1';"/>
                            <h2>{{detailsInfo.help_bargain.help_nickname}} </h2>
                            <p>{{detailsInfo.help_bargain.b_time | date 'HH:mm MM/dd/YYYY'}}</p>
                            <div class="sp-pice">
                                -${{detailsInfo.help_bargain.price}}
                            </div>
                        </div>
                        <p class="splash-txt margin-top-10">
                            You helped to cut ${{detailsInfo.help_bargain.price}}. Invite more friends to help!
                        </p>
                    </div>
                    <!-- 砍价结束提示语 start -->
                    <div class="splash-desc splash-end" v-if="detailsInfo.goods_state == 0 && detailsInfo.user_state == 0">
                        <p>ReWard Collected!</p>
                        <p>Thank you for your participation!</p>
                    </div>
                    <div class="splash-desc help-success" v-if="detailsInfo.user_state == 2">
                        <p>Helped cut price successfully!</p>
                    </div>
                    <a class="download-app" :href="appDownloadUrl">
                        <span>Download YoShop App! Join the game!</span>
                        <img src="../images/logo_03.png" />
                    </a>
                    <div class="progress-box" v-if="detailsInfo.goods_state != 0 && detailsInfo.user_state != 0">
                        <progress :style="'candy'" :value="parseFloat(detailsInfo.splashProgress) * 100" v-position="detailsInfo.splashProgress">
                            <span class="triangle"></span>
                            <span slot class="circle"></span>
                            <span class="progress-tip" slot>Total Price Cut:${{detailsInfo.splashTotal}}</span>
                        </progress>
                    </div>
                </div>
                <div class="fb-share">
                    <a href="javascript:void(0)" @click="helpSplash()" class="slash-btn" v-if="detailsInfo.user_state == 0 && detailsInfo.goods_state == 1">Help cut the price</a>
                    <!-- <a href="javascript:void(0)" @click="helpSplash()" class="slash-btn">Help cut the price</a> -->
                    <a href="javascript:void(0)" class="fb-share-btn" @click="FBShare()">
                        <strong>f</strong> Share on Facebook
                    </a>
                    <p>Share on Facebook, invite friends to cut the price down!</p>
                </div>
            </section>
            <section class="friend-lead" v-if="bargain_record.length != 0">
                <h2 class="fl-title">Friend Leaderboard</h2>
                <div class="fl-list">
                    <div class="fl-item" v-for="item in bargain_record" track-by="$index">
                        <img :src="item.help_avatar" onload="this.style.opacity='1';"/>
                        <h3>{{item.help_nickname}}</h3>
                        <p>{{item.b_time | date 'HH:mm MM/dd/YYYY'}}</p>
                        <span>-${{item.price}}</span>
                    </div>
                </div>
               
            </section>
        </div>
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
import Loading from 'vux-components/loading/index';
import Alert from 'vux-components/alert/index';
import Progress from './progress';
import httpService from '../modules/services';
import {countdown,doFBShare,FBLogin,getParameterByName,PageData} from '../modules/common';
import config from '../modules/config';
import Spinner from 'vux-components/spinner/index';
export default{
    data() {
        return {
          timerVla:{
            days:'00',
            hours:'00',
            minutes:'00',
            seconds:'00'
          },
          isLoading:false,
          pullupStatus: 'default',
          pullupConfig:{},
          alertObj:{
            isShow:false,
            txt:''
          },
          detailsInfo:{
            splashProgress:'0',
            help_bargain:{}
          },
          pageData:{},
          bargain_record:[]
        }
    },
    components:{
      Alert,Progress,Loading,Spinner
    },
    computed:{
      pullupConfig:function(){
        let fontSize = parseFloat(document.getElementsByTagName("html")[0].style.fontSize);
        return {
          height: parseInt(1.066667 * fontSize),
        }
      },
      appDownloadUrl:function(){
        return config.yoshopDownloadUrl;
      }
    },
    methods:{
      alert(txt){
        this.alertObj.isShow = true;
        this.alertObj.txt = txt;
      },
      viewDetails(){
          if(config.isApp == true){
            window.location.href = `yoshop://action?actiontype=3&url=${this.detailsInfo.goods_id},${this.detailsInfo.wid}&name=women&source=banner`;//打开某手机上的某个app应用
          } else{
            setTimeout(function(){
              window.location.href = config.yoshopDownloadUrl;//如果超时就跳转到app下载页
            },800);
            window.location.href = `yoshop://action?actiontype=3&url=${this.detailsInfo.goods_id},${this.detailsInfo.wid}&name=women&source=banner`;//打开某手机上的某个app应用
          }
      },
      FBShare(){
        let shareUrl = `${window.location.href}`;

        // 
        doFBShare({
          shareUrl:shareUrl,
          user_id:config.userInfo.user_id,
          bargain_id:this.$route.query.bargain_id
        });
      },
      loadMore(){
        
      },
      helpSplash(){
        FBLogin((fbInfo) =>{
          let self = this;
          getUserId(fbInfo,self);
        });

        /**
         * [getUserId description]
         * @return {[type]} [description]
         */
        function getUserId(fbInfo,self){
          self.isLoading = true;
          httpService.getUserId(fbInfo).then((user_id_res)=>{
            if(user_id_res.status != 200){
              self.alert('Service connection failed');
              return;
            }
            if(user_id_res.json().status != 1){
              // 邮箱未绑定
              if(user_id_res.json().msg == 'EmailNotFound'){
                  let emailPrompt = prompt("Bound Your Email !");
                  if (!(emailPrompt != null && emailPrompt != "")) return;
                  let regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                  if (regEmail.test(emailPrompt) == false) return;
                  fbInfo.email = emailPrompt;
                  // 递归调用
                  getUserId(fbInfo,self);
              }else{
                self.alert(user_id_res.json().msg);
              }
              return;
            }

            // 执行砍价操作********************************************************
            // let rootUid = decodeURIComponent(self.$route.query.rootUid);
            let rootUid = decodeURIComponent(getParameterByName("rootUid"));
            if(rootUid == 'undefined' || rootUid == ""){
                self.alert("Url Not verified");
                return;
            }
            // 帮帮好友砍价操作(())
            httpService.spalshHelp({
              user_id:rootUid,
              bargain_id:self.detailsInfo.bargain_id,
              help_id:user_id_res.json().msg.user_id
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
              // 提示语
              if(self.detailsInfo.tishi && self.detailsInfo.tishi != "") self.alert(self.detailsInfo.tishi);
            },(err) => {
              self.alert('Access failed');
            });
          },(err) => {
            self.alert("services failed");
          }).finally(() =>{
             self.isLoading = false;
          });
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
          // 倒计时 砍价状态为0，或者状态为1
          if(self.detailsInfo.goods_state == 1){
            countdown(res.json().msg.endTime,res.json().msg.nowTime,(resTime) => {
              self.$set('timerVla',resTime);
            });
          } else{
            // console.log("不倒计时");
          }
        },(err) => {
          this.alert('Service connection failed');
        }).finally(() => {
          self.isLoading = false;
        });
      }
    },
    ready(){
      let self = this;
      this.initData();

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
              return;
          }
          self.bargain_record = self.bargain_record.concat(self.pageData.getItem());
          self.pageData.pageIndex++;
      }
    }
}
</script>
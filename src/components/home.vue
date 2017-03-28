<template>
    <section class="scroll-box">
        <div class="scroller-container">
          <section class="baner">
            <img src="../images/home-baner.png" alt="" />
            <img src="../images/home-head.png" alt="" class="head-img" />
            <a href="javascript:;" class="game-rules" @click="gameRules()"></a>
          </section>
          <section class="shop-list">
            <div class="shop-item" :class="{'shop-item-gray':item.remain == 0 || item.goods_state == 0}" v-for="item in slashList">
                <div class="shop-img">
                  <img :src="item.imgUrl" onload="this.style.opacity='1';"/>
                </div>
                <div class="shop-info">
                  <p>{{item.desc}}</p>
                  <p>${{item.price}}</p>
                </div>
                <a href="javascript:void(0)" disabled="item.goods_state == 0" @click="goDetails(item)" class="slash-price-btn">
                  <span v-show="item.goods_state != 0">SLASH PRICE</span>
                  <span v-show="item.goods_state == 0">SNAPPED UP</span>
                </a>
            </div>
          </section>
        </div>
    </section>
    <alert :show.sync="showAlert" title="yoshop" button-text="OK" class="customer-alert">
      <p style="text-align:center;">{{alertMsg}}</p>
    </alert>

    <alert :show.sync="showRules"  title="" button-text=""  class="rulesAlert">
      <section>
        <scroller lock-x :scrollbar-y="false" :height="scrollerRules" :bounce="false" v-ref:scroller-rules>
            <div class="rules-box">
              <a href="javascript:;" class="rules-close" @click="showRules = false"></a>
              <img src="../images/rules.png" v-el:rules class="rules"/>
            </div>
        </scroller>
      </section>
    </alert>

    <loading :show="isLoading" :text="'loading...'" class="customer-loading"></loading>
</template>

<style lang="less">
    @import '../styleSheet/less/utility.less';
    @import '../styleSheet/less/common.less';
    .img-style{
        width: 100%;height: auto;vertical-align: bottom; border: none;display: block;
    }
  
    .rulesAlert{
        .weui_dialog{
          width:8.826667rem; height: 8.16rem;  background: transparent;
        }
        .vux-dialog-transition{
          
        }
        .weui_dialog_hd{padding: 0}
        .weui_dialog_bd{
          padding: 0; overflow: hidden;max-height:70vh; 
        }
        .weui_dialog_ft{ margin-top: 0}
        .rules{ display: block; width: 100%; height: auto;}
        .rules-box{
          position:  relative;
          .rules-close{
            display: inline-block; position: absolute;top: 0;right: 0;width:0.666667rem; height: 0.666667rem;
          }
        }

    }
   .scroller-container{
      .baner{
          position: relative;
          img{
            .img-style;
            &:first-child{
              width: 10.0rem; height: 6.613333rem;border:none; margin:0 auto;
            }
            &:last-child{
              width: 10.0rem;height: 4.026667rem;border:none; margin:0 auto;
            }
          }
          .head-img{
            margin-top: -1.6rem;
          }

      }
      .game-rules{
        display: block; position: absolute; 
        width: 3.733333rem; 
        height: 0.6rem; 
        -webkit-tap-highlight-color:transparent;     
        -webkit-user-select:none;  
        bottom: 0.133333rem; z-index: 2; left: 50%; margin-left: -1.84rem;
        &:active{
          background-color: rgba(0, 0, 0, 0.15);
        }
      }

      
      .shop-list{
          background: url(../images/item-bg.png) #FFF;
          background-repeat: repeat-y;
          background-size: 100% auto;
          padding-bottom:  0.666667rem;
          .shop-item{
             position: relative;
             margin: 0.6rem 0.426667rem 0.666667rem 0.426667rem;
             background:url(../images/bargain-1.png);
             background-repeat: no-repeat;
             background-size: 100% 4.146667rem;
             height: 4.146667rem;
             &:last-child{
              margin-bottom: 0;
             }
             &.shop-item-gray{
                background:url(../images/bargain-2.png);
                background-repeat: no-repeat;
             background-size: 100% 4.146667rem;
             }
             .shop-img{
                display: flex;
                display: -webkit-box;
                align-items:center;
                justify-content: center;
                left: 1rem;
                width: 2.773333rem;
                height: 2.333333rem;
                position: absolute;
                top: 0.866667rem;
                img{
                  height: auto;max-width: 2.773333rem; max-height: 2.333333rem;
                  .img-opacity;
                }
             }
             .shop-info{
                position: absolute; top: 0.666667rem; width: 4.533333rem;
                right:0.333333rem;  .px2px(font-size,24px); color:#000;
                p:first-child{
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-weight: bold; line-height: 0.4rem; 
                }
                p:last-child{
                  margin-top: 0.133333rem;
                  .px2px(font-size,32px);
                  font-weight: bolder;
                }
             }
             .slash-price-btn{
                display: inline-block; width: 4.0rem;  position: absolute;bottom: 0.733333rem; right: 0.853333rem;
                color: #ffffff;  text-align: center; 
                line-height: 0.933333rem;
                background: url(../images/forward.png);
                background-repeat: no-repeat;
                background-position: 3.6rem 0.266667rem ;background-size: 0.24rem 0.4rem;
                 font-weight: bold; font-size: 0.373333rem;
                &:active{
                  background-color: rgba(0, 0, 0, 0.15); border-radius: 0.533333rem;
                }
                span{ 
                   display:inline-block; text-align: center; padding-right: 0.213333rem }
             }
          }
      }  
   }
</style>

<script>
import Scroller from 'vux-components/scroller/index';
import httpService from '../modules/services';
import Alert from 'vux-components/alert/index';
import Loading from 'vux-components/loading/index';
export default{
    data() {
        return {
            slashList:[],
            showAlert:false,
            alertMsg:'',
            showRules:false,
            isLoading:false,
            scrollerRules:'100px'
        }
    },
    components:{
      Scroller,
      Alert,Loading
    },
    methods:{
        alert(txt){
          this.showAlert = true;
          this.alertMsg = txt;
        },
        gameRules(){
          let self = this;
          let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          this.showRules = true;
          setTimeout(function () {
            if(self.$els.rules.clientHeight > vh){
              self.$set('scrollerRules', Math.round(vh * 0.7) +'px');
            } else{
              self.$set('scrollerRules', self.$els.rules.clientHeight +'px');
            }
            self.$refs.scrollerRules.reset();
          })
        },
        goDetails(item){
          // if(item.remain == 0) return;
          this.$router.go({ name: 'details', query: { bargain_id: item.bargain_id }});
        }
    },
    ready(){
      this.isLoading = true;
      // 获取数据列表
      // 
      // {"status":2,"msg":"NoGoods"}
      httpService.getSlashList().then((res) =>{
        if(res.status === 200){
          // console.log("加载中");
          if(res.json().status == 1){
            this.$set('slashList', res.json().msg);
          } else{
            this.alert(res.json().msg);
          }
        } else{
          this.alert('yoshop failed');
        }
      },(err) => {
        this.alert('No server connection means no YoShop!');
      }).finally(() => {
        this.isLoading = false;
      });

    },
    events:{

    }
}
</script>
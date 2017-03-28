<template>
 
    <router-view>
  
    </router-view>
</template>

<script>
import {registerFBShare} from './modules/common';



export default {
  
  data () {
    return {
      
    }
  },
  ready(){

  },
  init(){

    // 注册分享sdk
    registerFBShare();
  
  }
}
</script>

<style lang="less">
  @import './styleSheet/css/reset.css';
  @import './styleSheet/css/vux.css';
  // @import './styleSheet/css/animate.css';
  html{
   /*  width: 100%;
   height: 100%;
   overflow: hidden; */
    font-family: Helvetica,Helvetica-Bold;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

 @font-face {
  font-family: 'Helvetica';
  src: url('../static/fonts/Helvetica.eot?#iefix') format('embedded-opentype'),  
  url('../static/fonts/Helvetica.woff') format('woff'), 
  url('../static/fonts/Helvetica.ttf')  format('truetype'), 
  url('../static/fonts/Helvetica.svg#Helvetica') format('svg');
}


@font-face {
  font-family: 'Helvetica-Bold';
  src: url('../static/fonts/Helvetica-Bold.eot?#iefix') format('embedded-opentype'),  
  url('../static/fonts/Helvetica-Bold.woff') format('woff'), url('../static/fonts/Helvetica-Bold.ttf')  format('truetype'),
  url('../static/fonts/Helvetica-Bold.svg#Helvetica-Bold') format('svg');
}






</style>

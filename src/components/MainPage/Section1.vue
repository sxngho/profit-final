<template>
  <div class="section">
    <button class="next" @click="$refs.fullpage.api.moveSectionDown()" style="position: absolute; bottom: 15%; z-index: 999; right: 3%; cursor:pointer; text-decoration:none;">
      <div class="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

      <v-layout row wrap justify-center style="height:55%">
          <v-flex xs10 text-center>
            <div>
              <v-layout row wrap justify-center>
                <v-flex class="text-xs-center">
                  <span class="text-xs-center display-2"> <span class="fontjua"> 개발자 포트폴리오를 쉽고 빠르게 <br/><br/></span> </span>
                  <span class="title">
                    <span class="fontjua">
                      나만의 포트폴리오 생성부터 아웃소싱 지원까지 손쉽게. <br/>
                      [prof:it]을 통한 당신의 Profit이 시작됩니다. <br/><br/>
                    </span>
                  </span>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>

        <!-- <router-link :to="{ name: 'story', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==2" class="bannerBtn">
          <div class="bannerBtn bl-link bl-link_padding-all bl-link1" style="float: left;">
              <div class="bl-link__label">
                <i class="fas fa-user-edit fa-7x" style="color:black"></i>
                <br/>
                <span class="content"> <span class="fontjua" style="color:black">마이 페이지</span></span>
            </div>
          </div>
        </router-link> -->

      </v-layout>
      <v-layout row justify-center>
        <img src="../../assets/section1_img.png" style="position:absolute; width:30%; bottom:0%;"/>
      </v-layout>
<!-- <img src="../../assets/section1_img.png" style="position:absolute; left:29%; width:40%; bottom:0%;"/> -->
      <!-- <div v-bind:style="{ 'backgroundImage': 'url(' + wallpaper   + ')'}" >
        <div style="padding:100%;"></div>
      </div> -->
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";

export default {
  name: "section1",
  components: {
  },
  data() {
    return {
      wallpaper:"https://i.imgur.com/8tFN1Zj.jpg",
    }
  },
  created() {},
  methods: {}
};
</script>

<style>
.arrow{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.arrow span{
    display: block;
    width: 30px;
    height: 30px;
    border-bottom: 5px solid #fcffd2;
    border-right: 5px solid #fcffd2;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
}
.arrow span:nth-child(2){
    animation-delay: -0.2s;
}
.arrow span:nth-child(3){
    animation-delay: -0.4s;
}
@keyframes animate {
    0%{
        opacity: 0;
        transform: rotate(45deg) translate(-20px,-20px);
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
        transform: rotate(45deg) translate(20px,20px);
    }
}
</style>

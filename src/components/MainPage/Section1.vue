<template>
  <div class="section">
    <button class="next" @click="$refs.fullpage.api.moveSectionDown()" style="position: absolute; bottom: 15%; z-index: 999; right: 3%; cursor:pointer;">
      <div class="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

      <v-layout row wrap justify-center style="height:55%">
          <v-flex sm5 xs10 offset-sm1 xs2 v-if="this.$store.getters.getLevel==2 || this.$store.getters.getLevel==3">
          <div style="color:black" v-if="this.$store.getters.getLevel==2">
            <span class="display-2"> <span class="fontjua"> 당신의 프로젝트를 공유해보세요!</span> </span>
            <span class="title">
              <span class="fontjua">
                <br/><br/>
                간단한 프로젝트 작성을 통해 <br/>
                포트폴리오를 만들 수 있고 <br/>
                포트폴리오를 기반으로 외주를 구할 수도 있습니다.<br/>
                지금 프로젝트를 작성하러 가세요!<br/>
              </span>
            </span>
            </div>
            <div v-else-if="this.$store.getters.getLevel==3">
              <h1>Take users Portfolio!</h1>
              많은기업이 있다<br/>
              기업에겐 뭐라 설명하지<br/>
              지금 작성하러 가볼까요?<br/>
            </div>
          </v-flex>
          <v-flex xs10 v-else text-center>
            <div>
              <v-layout row wrap justify-center>
                <v-flex class="text-xs-center">
                  <span class="text-xs-center display-2"> <span class="fontjua"> 개발자 포트폴리오를 위한 [prof:it] <br/><br/></span> </span>
                  <span class="title">
                    <span class="fontjua">
                      모든 프로젝트를 등록하고, 당신의 이력을 작성할 수 있습니다. <br/>
                      다양한 개발자들의 폭넓은 스펙트럼을 확인하세요! <br/><br/>
                    </span>
                  </span>
                  <span class="content">
                    #발전하는 #열정적인 #개발자
                  </span>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>

        <v-flex sm5 xs12 style="text-align: center;">
          <!-- 유저일때 -->
          <router-link :to="{ name: 'story', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==2" class="bannerBtn">
            <div class="bannerBtn bl-link bl-link_padding-all bl-link1" style="float: left;  margin-left: 20%; margin-top: 6%;">
                <div class="bl-link__label">
                  <i class="fas fa-user-edit fa-7x" style="color:black"></i>
                  <br/>
                  <span class="headline"><span class="fontjua" style="color:black">스토리</span></span>
              </div>
            </div>
          </router-link>

          <!-- 기업일때 -->
          <router-link :to="{ name: 'company', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==3"  class="bannerBtn">
            <div class="bannerBtn bl-link bl-link_padding-all bl-link1">
                <div class="bl-link__label">
                <i class="far fa-keyboard fa-7x"/>
                <br/><br/>
                <span>기업</span>
                </div>
            </div>
          </router-link>

        </v-flex>
      </v-flex>
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

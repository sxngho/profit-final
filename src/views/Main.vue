<template>
  <div class="MainPage">

    <full-page ref="fullpage" :options="options" id="fullpage">

      <template>
        <div class="section">
          <button class="next" @click="$refs.fullpage.api.moveSectionDown()" style="position: absolute; bottom: 15%; z-index: 999; right: 5%; cursor:pointer; text-decoration:none;">
            <div class="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <div class="slide">
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
                          <router-link :to="{ name: 'story', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==2" style="text-decoration:none; cursor:pointer;">
                          <v-chip x-large style="background: white;border: 3px solid #primary;padding: 0 30px 0 20px; cursor:pointer;">
                            <span class="fontjua" style="margin-left: 10px;">
                              지금 무료로 시작하기&nbsp;&nbsp;
                            </span>
                            <i class="fas fa-arrow-alt-circle-right fa-2x"></i>
                          </v-chip>
                        </router-link>
                        <router-link :to="{ name: 'company', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==3" style="text-decoration:none; cursor:pointer;">
                          <v-chip x-large style="background: white;border: 3px solid #primary;padding: 0 30px 0 20px; cursor:pointer;">
                            <span class="fontjua" style="margin-left: 10px;">
                              지금 무료로 시작하기&nbsp;&nbsp;
                            </span>
                            <i class="fas fa-arrow-alt-circle-right fa-2x"></i>
                          </v-chip>
                        </router-link>
                        <v-chip x-large style="background: white;border: 3px solid #primary;padding: 0 30px 0 20px; cursor:pointer;" v-if="this.$store.getters.getLevel!==2 &&this.$store.getters.getLevel!==3" @click="requiredLogin()">
                          <span class="fontjua" style="margin-left: 10px;">
                            지금 무료로 시작하기&nbsp;&nbsp;
                          </span>
                          <i class="fas fa-arrow-alt-circle-right fa-2x"></i>
                        </v-chip>
                      </span>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
            </v-layout>
          </div>

          <div class="slide">
            <v-layout row wrap justify-center style="height:55%">
                <v-flex xs10 text-center>
                  <div>
                    <v-layout row wrap justify-center>
                      <v-flex class="text-xs-center">
                        <span class="text-xs-center display-2">
                          <span class="fontjua">
                            [prof:it]은 개발자를 위한 무료 포트폴리오 플랫폼입니다
                           <br/><br/></span>
                         </span>
                        <span class="title">
                          <span class="fontjua">
                            [prof:it]은 실제 프로젝트를 포트폴리오로 만드는데 어려움을 겪던<br/>
                            4명의 개발자가 직접 만든 포트폴리오 플랫폼입니다. <br/>
                            [prof:it]과 함께라면 포트폴리오를 손쉽게 만들고 편하게 관리할 수 있는 것은 물론, <br/>
                            다양한 아웃소싱 작업에 이력서를 지원할 수도 있습니다.
                          </span>
                        </span>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
            </v-layout>
          </div>

          <div class="slide">
            <v-layout row wrap justify-center style="height:55%">
                <v-flex xs10 text-center>
                  <div>
                    <v-layout row wrap justify-center>
                      <v-flex class="text-xs-center">
                        <span class="text-xs-center display-2">
                          <span class="fontjua">
                            <!-- TODO -->
                            이미 {{leng}}명의 개발자가 [prof:it]하고 있습니다.
                           <br/><br/></span>
                         </span>
                        <span class="title">
                          <span class="fontjua">
                            [prof:it]을 사용하면 여러 개발자들의 폭넓은 스펙트럼을 한 눈에 확인할 수 있습니다.<br/>
                            지금 시작하세요.
                          </span>
                          <br/><br/>
                          <span class="fontDoHyeon">
                            #발전하는 &nbsp;&nbsp;#열정적인 &nbsp;&nbsp;#개발자
                          </span>
                        </span>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
            </v-layout>
          </div>

          <v-layout row justify-center>
            <img src="../assets/section1_img.png" style="position:absolute; width:30%; bottom:0%;"/>
          </v-layout>
          <!-- <router-link :to="{ name: 'story', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==2" class="bannerBtn">
          <div class="bannerBtn bl-link bl-link_padding-all bl-link1" style="float: left;">
          <div class="bl-link__label">
          <i class="fas fa-user-edit fa-7x" style="color:black"></i>
          <br/>
          <span class="content"> <span class="fontjua" style="color:black">마이 페이지</span></span>
        </div>
      </div>
      </router-link> -->


      <!-- <img src="../../assets/section1_img.png" style="position:absolute; left:29%; width:40%; bottom:0%;"/> -->
            <!-- <div v-bind:style="{ 'backgroundImage': 'url(' + wallpaper   + ')'}" >
              <div style="padding:100%;"></div>
            </div> -->
        </div>
      </template>


      <Section2/>
      <Section3/>
      <Section4/>
    </full-page>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
// import Banner from "../components/MainPage/Banner";
// import Filters from "../components/MainPage/Filters";
// import PortfolioList from "../components/MainPage/PortfolioList";
import Vue from "vue";
import Section1 from "../components/MainPage/Section1";
import Section2 from "../components/MainPage/Section2";
import Section3 from "../components/MainPage/Section3";
import Section4 from "../components/MainPage/Section4";

export default {
  name: "Main",
  components: {
    Section1,
    Section2,
    Section3,
    Section4,
  },
  data() {
    return {
      options:{
        licenseKey: 'YOUR_KEY_HERE',
        sectionsColor: ['#D0D9F2','#91A9D9','#99B1BF','#F2F2F2',],
      },
      wallpaper:"https://i.imgur.com/8tFN1Zj.jpg",
      leng : "",
    }
  },
  created() {},
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.userdata = await FirebaseService.SELECT_UserIdData();
      this.company = await FirebaseService.SELECT_CompanyIdData();
      console.log(this.userdata,"qwe")
      console.log(this.company,"asd")
      this.leng = this.userdata.length + this.company.length;
      this.$store.commit("changeLevel", this.$session.get("level"));
      // var result = Math.floor(Math.random() * this.userdata.length);
      // this.randId = this.userdata[result].nickname;
    },
    requiredLogin() {
      this.$swal(
         '권한이 없습니다.',
         '로그인이 필요한 기능입니다',
         'error'
       )
    },
    isUserCheck() {
      if (this.level === 2) {
        return true;
      } else {
        return false;
      }
    },
    alert_message_user() {
      this.$swal(
         '권한이 없습니다.',
         '로그인이 필요한 기능입니다',
         'error'
       )
    },
  }
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

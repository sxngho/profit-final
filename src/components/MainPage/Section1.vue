<template>
  <div class="section">
      <v-layout row wrap justify-center style="height:46%">
          <v-flex sm5 xs10 offset-sm1 xs2 v-if="this.$store.getters.getLevel==2 || this.$store.getters.getLevel==3">
          <div style="color:black" v-if="this.$store.getters.getLevel==2">
            <h1>당신의 프로젝트를 공유해보세요!</h1>
              <br/>
              간단한 프로젝트 작성을 통해 <br/>
              포트폴리오를 만들 수 있고 <br/>
              포트폴리오를 기반으로 외주를 구할 수도 있습니다.<br/>
              지금 프로젝트를 작성하러 가세요!<br/>
            </div>
            <div v-else-if="this.$store.getters.getLevel==3">
              <h1>Take users Portfolio!</h1>
              많은기업이 있다<br/>
              기업에겐 뭐라 설명하지<br/>
              지금 작성하러 가볼까요?<br/>
            </div>
          </v-flex>
          <v-flex sm5 xs10 offset-sm1 xs2 v-else text-center>
            <div>
              <h1>당신의 포트폴리오를 공유하세요!</h1>
              우리사이트는 멋진 사이트다~ 이말이야!
            </div>
          </v-flex>

        <v-flex sm5 xs10 offset-sm1 xs2 style="text-align: center;">
          <!-- 유저일때 -->
          <router-link :to="{ name: 'story', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==2" class="bannerBtn">
            <div class="bannerBtn sm-link sm-link_padding-all sm-link1">
                <div class="sm-link__label">
                <i class="far fa-keyboard fa-7x"/><br/>
                <span>Stroy</span>
              </div>
            </div>
          </router-link>

          <!-- 기업일때 -->
          <router-link :to="{ name: 'company', params: { id: this.$session.get('session_id') }}" v-if="this.$store.getters.getLevel==3"  class="bannerBtn">
            <div class="bannerBtn sm-link sm-link_padding-all sm-link1">
                <div class="sm-link__label">
                <i class="far fa-keyboard fa-7x"/><br/>
                <span>Company</span>
              </div>
            </div>
          </router-link>

        </v-flex>
      </v-flex>
      </v-layout>
      <img src="../../assets/section1_img.png" style="position:absolute; left:29%; width:40%; bottom:0%;"/>

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

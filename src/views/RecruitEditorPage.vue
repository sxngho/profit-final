<template>
  <div class="recruit__container" v-if="this.$store.getters.getLevel==3">
    <!-- <RecruitBanner />
    <RecruitEditor /> -->
    <RecruitEditor2/>
  </div>

  <div v-else="this.$store.getters.getLevel!=3" style="margin:10px;">
    <v-layout row wrap justify-center style="margin:80px;">
      <h1>로그인이 필요한 서비스입니다.</h1>
    </v-layout>

    <v-layout wrap row justify-center>
        <router-link to="/" class="bannerBox" style="text-decoration:none">
          <div class="bannerBtnBlack">
            <div class="iconBox">
              <i class="fas fa-home fa-7x" style=""></i>
            </div>
            <br />
            <div class="studio_title titleBox">
              <h1><span class="fontStyle">홈페이지로 돌아가기</span></h1>
            </div>
          </div>
        </router-link>
    </v-layout>
  </div>

</template>

<script>
// import RecruitBanner from "../components/Recruit/InputForm/RecruitBanner";
// import RecruitEditor from "../components/Recruit/InputForm/RecruitEditor";
import RecruitEditor2 from "../components/Recruit/InputForm/RecruitEditor2";
import FirebaseService from "@/services/FirebaseService";

export default {
  components: {
    // RecruitBanner,
    // RecruitEditor,
    RecruitEditor2,
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('setSession', this.$session.get('session_id'))
    this.$store.commit('changeLevel', this.$session.get('level'))
    this.companycheck()
  },
  methods: {
    async companycheck() {
      if (this.$store.getters.getLevel == 3) {
        var check = await FirebaseService.SELECT_Companynickname(this.$store.getters.getSession)
        if (!check) {
          // 로그인 했지만, 기업이 아닌 경우
          alert('권한이 없습니다. 필요 level : 3 (기업)')
          location.href=`${document.location.origin}`
        }
      } else {
        // 로그인 안한 경우이다
        alert('권한이 없습니다. 필요 level : 3 (기업)')
        location.href=`${document.location.origin}`
      }

    }
  }
};
</script>

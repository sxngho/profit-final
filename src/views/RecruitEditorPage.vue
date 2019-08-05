<template>
  <div class="recruit__container">
    <RecruitBanner />
    <RecruitEditor />
  </div>
</template>

<script>
import RecruitBanner from "../components/Recruit/InputForm/RecruitBanner";
import RecruitEditor from "../components/Recruit/InputForm/RecruitEditor";
import FirebaseService from "@/services/FirebaseService";

export default {
  components: {
    RecruitBanner,
    RecruitEditor
  },
  data() {
    return {
      company : ""
    }
  },
  mounted() {
    this.company = this.$session.get('session_id')
    this.companycheck()
  },
  methods: {
    async companycheck() {
      if (this.company) {
        var check = await FirebaseService.SELECT_Companynickname(this.company)
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

<style>
</style>

<template>

    <!-- 비 로그인 유저라면 아래 레이아웃 출력 -->
    <!-- <v-layout v-if=" user== '' || user == undefined ">
      <h1>로그인해야 이용 가능한 서비스 입니다</h1>
      <v-btn>로그인하기</v-btn>
      <v-btn>회원가입하기</v-btn>
      <v-btn>메인으로</v-btn>
    </v-layout>-->

    <!-- 개발자라면 아래 레이아웃 출력 -->
    <v-container wrap>
      <!-- 모집중공고 리스트 -->
      <div>
        <v-layout wrap row>
          <h1>모집중인 공고 리스트</h1>
        </v-layout>

        <v-layout wrap row>
          <v-flex xs12 sm6 md4 v-for="recruit in myRecruits">
            <v-card outlined>
              <v-card-title>{{ recruit.data.title }}</v-card-title>
              <v-card-text>
                {{recruit.data.companyId}}회사,필요스택 :  {{recruit.data.requireSkills}}, 요약, 마감기간
              </v-card-text>
              <v-card-actions justify-center>
                <v-spacer/>
                <v-btn @click="popRecruitDetail(recruit.id)" text outlined>자세히보기</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

      </div>
    </v-container>

    <!-- 회사라면 아래 레이아웃 출력 -->
    <!-- <v-container></v-container> -->

</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import RecuritBanner from "../components/Recruit/InputForm/RecruitBanner";
import RecruitEditor from "../components/Recruit/InputForm/RecruitEditor";
export default {
  name: "Recruit",
  components: {
    RecuritBanner,
    RecruitEditor
  },
  data() {
      return {
        recruits : "",
        mySkills : "",
        myRecruits : [],
      };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.recruits = await FirebaseService.SELECT_Recruit();
      this.mySkills = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      for(var i in this.recruits) {
        if (this.recruits[i].data.requireSkills.length == 0) {
          this.myRecruits.push(this.recruits[i]);
          continue;
        }
        for(var j in this.mySkills[0].userSkills) {
          var uc = this.mySkills[0].userSkills[j].toUpperCase();
          if( !this.recruits[i].data.requireSkills.includes(uc) ) {
            console.log("이거안나와야해")
            break;
          } else if( j == (this.mySkills[0].userSkills.length-1) ) {
            console.log("푸시",this.recruits[i])
            this.myRecruits.push(this.recruits[i]);
          }
        }
      }
    },

    popRecruitDetail(rdcode) {
      window.open(
        "../recruit/" + rdcode,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    }
  },


};
</script>

<style>
</style>

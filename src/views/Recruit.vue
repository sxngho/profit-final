<template>
  <v-container wrap>
    <!-- 개발자라면 아래 레이아웃 출력 -->
      <!-- 모집중공고 리스트 -->
      <div v-if='nowLevel == "2"'>
        <v-layout wrap row>
          <h1>지원할 수 있는 공고 리스트</h1>
        </v-layout>

        <v-layout wrap row>
          <v-flex xs12 sm6 md4 v-for="recruit in myRecruits" style="padding:10px;">
            <v-card outlined class="text-center" style="padding:25px 10px 5px 10px;">
                <p class="display-1" style="font-size: 24px; font-weight: bold;">{{ recruit.data.projectTitle }}</p>
              <div>
                <div>
                  <v-chip v-for="skill in recruit.data.requiredSkills" outlined small class="pa-2" color="indigo">{{skill}}</v-chip>
                </div>
                <span class="indigo--text headline">{{recruit.data.closingDate}}</span>
                <p class="grey--text">{{recruit.data.projectSummary}}</p>
                <span class="caption">
                  {{recruit.data.companyId}} 
                  {{recruit.data.endDay}}</span>
              </div>
              <v-card-actions justify-center>
                <v-spacer/>
                <v-btn @click="popRecruitDetail(recruit.id)" text outlined>자세히보기</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

      </div>

    <!-- 회사라면 아래 레이아웃 출력 -->
    <div v-else-if='nowLevel == "0" || nowLevel=="1" || nowLevel=="3"'>
      <v-layout wrap row>
        <h1>회사당!</h1>
      </v-layout>
    </div>

    <!-- 비 로그인 유저라면 아래 레이아웃 출력 -->
    <div v-else>
      <v-layout wrap row>
        <h1>비로그인이당</h1>
      </v-layout>
    </div>

  </v-container>
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
        userlevel:"",
        nowLevel:"-1",
      };
  },
  mounted() {

    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      console.log("내 렙은? : ",this.noewLevel);
      this.recruits = await FirebaseService.SELECT_RecruitInfo();
      this.mySkills = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      console.log(this.recruits,"공고들")
      for(var i in this.recruits) {
        console.log(this.recruits[i],"공고정보")
        if (this.recruits[i].data.requiredSkills.length == 0) {
          this.myRecruits.push(this.recruits[i]);
          console.log("기업이 요구하는 스킬이없으면 바로출력")
          continue;
        }
        for(var ii in this.mySkills[0].userSkills) {
          this.mySkills[0].userSkills[ii] = this.mySkills[0].userSkills[ii].toUpperCase();
        }
        for(var j in this.recruits[i].data.requiredSkills) {
          var rs = this.recruits[i].data.requiredSkills[j].toUpperCase();
          if( !this.mySkills[0].userSkills.includes(rs) ) {
            console.log(rs,"이거안나와야해")
            break;
          } else if( j == (this.recruits[i].data.requiredSkills.length-1) ) {
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

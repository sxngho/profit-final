<template>
  <v-container wrap>
    <!-- 개발자라면 아래 레이아웃 출력 -->
      <!-- 모집중공고 리스트 -->
      <div v-if='nowLevel == "2"'>
        <v-layout wrap row>
          <h1>지원할 수 있는 공고 리스트</h1>
          <p> 총 {{recruits.length}}개의 공고 중에 {{myRecruits.length}}개의 공고 지원가능합니다.</p>
        </v-layout>

        <v-layout wrap row>
          <v-flex xs12 sm6 md4 v-for="recruit in myRecruits" style="padding:10px;" v-if="!isEmpty">
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
          <v-flex v-if="isEmpty">
            <p> 지원 할 수 있는 공고가 존재하지 않습니다. </p>
            <v-btn :to="{ name: 'story', params: { id: user }}" style="height:100%;"> 프로젝트 작성하러가기 </v-btn>
          </v-flex>
        </v-layout>

      </div>

    <!-- 회사라면 아래 레이아웃 출력 -->
    <div v-else-if='nowLevel == "0" || nowLevel=="1" || nowLevel=="3"'>
      <v-layout wrap row>
        <v-flex xs12 sm6 md4 v-for="recruit in recruits" style="padding:10px;">
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
import RecruitBanner from "../components/Recruit/InputForm/RecruitBanner";
import RecruitEditor from "../components/Recruit/InputForm/RecruitEditor";
export default {
  name: "Recruit",
  components: {
    RecruitBanner,
    RecruitEditor
  },
  data() {
      return {
        recruits : "",
        mySkills : "",
        myRecruits : [],
        userlevel:"",
        nowLevel:"-1",
        isEmpty : false,
        user : "",
      };
  },
  mounted() {

    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      this.user = this.$session.get('session_id');
      this.recruits = await FirebaseService.SELECT_RecruitInfo();
      this.mySkills = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      console.log(this.recruits,"공고들");
      //일단 모든 나의 스킬을 대문자로 만들어준다.
      for(var ii in this.mySkills[0].userSkills) {
        this.mySkills[0].userSkills[ii] = this.mySkills[0].userSkills[ii].toUpperCase();
      }
      //모든 공고를 탐색하는데,
      for(var i in this.recruits) {
        var notIncludeExist = this.recruits[i].data.contract; //공고 요구 스킬중, 나한테 없는 스킬이 있는지 여부판단          if(notIncludeExist) continue; //만약 누군가와 계약이 성상된 공고라면, 출력할 필요가 없다
          for(var j in this.recruits[i].data.requiredSkills) {
            var rs = this.recruits[i].data.requiredSkills[j].toUpperCase();
            if( !this.mySkills[0].userSkills.includes(rs) ) {
              notIncludeExist = true;
              break;
            }
          }
          if(!notIncludeExist){
            var flag = false;
            if (this.mySkills[0].dibs.includes(this.recruits[i].id)){
              flag = true;
            }
            this.myRecruits.push({id:this.recruits[i].id, data:this.recruits[i].data, flag: flag})
            // this.myRecruits.push(this.recruits[i]);

          }
        }
        if ( this.myRecruits.length == 0 ) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
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

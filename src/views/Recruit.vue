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
          <v-flex xs12 sm6 md4>
            <v-card outlined>
              <v-card-title>프젝이름</v-card-title>
              <v-card-text>
                <span style="color:red"> 마감기간 </span>
                <span>회사명</span>
                <p>요약 :: Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituper</p>
                <div class="tech d-inline">C</div>
                <div class="tech d-inline">java</div>
                <div class="tech d-inline">something</div>
              </v-card-text>
              <v-card-actions justify-center>
                <v-spacer/>
                <v-btn @click="popRecruitDetail('test')" text outlined>자세히보기</v-btn>
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
  methods: {
    popRecruitDetail(rdcode) {
      window.open(
        "../recruit/" + rdcode,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
</style>

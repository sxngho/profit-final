<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout>
      <v-flex style="margin:30px;" />
    </v-layout>
    <div class="recurit__container">
      <RecuritBanner />
      <!-- <RecruitEditor /> -->
    </div>

    <!-- 비 로그인 유저라면 아래 레이아웃 출력 -->
    <!-- <v-layout v-if=" user== '' || user == undefined ">
      <h1>로그인해야 이용 가능한 서비스 입니다</h1>
      <v-btn>로그인하기</v-btn>
      <v-btn>회원가입하기</v-btn>
      <v-btn>메인으로</v-btn>
    </v-layout>-->

    <!-- 개발자라면 아래 레이아웃 출력 -->
    <v-container row wrap>
      <!-- 모집중공고 리스트 -->
      <div>
        <h1>모집중인 공고 리스트</h1>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card>
              <v-card-title>프젝이름</v-card-title>
              <v-card-text>회사명, 기술 스택들, 요약, 마감기간</v-card-text>
              <v-card-actions>
                <v-btn @click="popRecruitDetail('test')">자세히보기</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>

    <!-- 회사라면 아래 레이아웃 출력 -->
    <v-container></v-container>
  </div>
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

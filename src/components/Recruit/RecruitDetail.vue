<template>
  <v-container>

    <v-layout row style="margin:20px"/>

    <v-layout row wrap justify-ceneter>
      <v-flex xs12>
        <p class="text-center font-weight-bold display-1">{{recruit.data.projectTitle}}</p>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-ceneter>
      <v-flex xs12>
        <p class="text-center grey--text">{{recruit.data.projectSummary}}</p>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <span class="grey--text">{{projectSummary}}</span>
      </v-flex>

      <v-flex xs12 class="text-xs-center">
        <p>모집 마감일 : <span class="red--text">{{recruit.data.closingDate}}</span>,
          현재 신청자 수 : <span class="red--text">{{recruit.data.applicationStack}}</span></p>
      </v-flex>

      <v-flex xs12 class="text-xs-center ">
        <v-chip color="red" outlined>{{recruit.data.category}}</v-chip>
        <v-chip color="orange" outlined>{{recruit.data.endDay}}</v-chip>
        <v-chip color="blue" outlined>{{recruit.data.budget}}원</v-chip>
      </v-flex>

      <v-flex xs12 style="height:40px"/>

      <v-flex xs12>
        <p v-html="recruit.data.projectContent"></p>
      </v-flex>

      <v-btn @click="dib(recruit_id)">
        찜!
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "RecruitDetail",
  components: {
  },
  created() {
    this.$store.state.no_header = true;
  },
  mounted() {
    this.fetchData(this.$route.params.rcode);
    this.recruit_id = this.$route.params.rcode;
  },
  methods: {
    async fetchData(recruitId) {
      console.log(recruitId,"이공고를찾아라");
      this.recruit = await FirebaseService.SELECT_RecruitInfoByRecruitId(recruitId);
      this.userdata = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      console.log(this.recruit,"공고좀보자");
    },
    dib(recruit_id) {
      if ( !this.userdata[0].dibs.includes(recruit_id) ) {
        this.userdata[0].dibs.push(recruit_id);
        FirebaseService.UPDATE_userDibs(this.userdata[0].dibs, this.$session.get('session_id'));
      } else {
        console.log("이미 찜!되어있는 공고입니다");
      }
    },
  },
  data() {
    return {
      recruit : "",
      recruit_id : "",
      category:"웹", //웹 / 앱 등 분류
      closingDate:"2019-10-12", //모집 마감 날짜
      projectTitle:"이거해주실분~", // 제목
      duration:"1달", //개발 기간
      budget:"1,000,000", // 예산
      projectContent:"<h1>해야만합니다!!!</h1> 무언가를 어떻게해서 저렇게 해주세요!",//프로젝트 완전 정밀 설명
      techlist:['c','bluetooth','java'], //필수 스킬 리스트
      projectSummary : "누구 이 프로젝트 해주실분 계신가요~~~~", //프로젝틍 요약설명
      applicationStack : 4,
    };
  },
};
</script>

<!-- UserSideInfo -->
<template>
  <div style="margin-top:7%;">


    <!-- 여기서부터 슬기가 꾸미는 중 -->
    <v-layout row wrap>
      <v-flex>
        <div class="fontjua" style="margin:10px;">
          <h1 class="fontjua">관리자 페이지</h1>
          <br>

            <h2 style="display:inline-block;">Weblog</h2><br>
            시간별 방문자 추이, 게시판별 방문자 추이 등을 표시합니다.
            <br><br>

            <h2 style="display:inline-block;">Users</h2><br>
            회원가입한 유저들을 나열합니다.<br>
            운영자 : 일반 유저를 관리자로 조정 가능하고, 다시 유저로 되돌릴 수 있습니다.<br>
            관리자 : 일반 유저를 탈퇴처리 할 수 있습니다.
            <br><br>
            <h2 style="display:inline-block;">Company</h2><br>
            회원가입한 기업들을 나열합니다.
            <br><br>
            <h2 style="display:inline-block;">Siren</h2><br>
            유저가 프로젝트 혹은 댓글을 <v-icon small class="fa fa-bell fa-1x" v-on="on" color="#ffa76a"></v-icon>
            신고 처리하면 Siren 페이지에 관련 내용이 등록됩니다.<br>
            신고 처리된 내용들을 판단하고 나서 신고 stack을 적용시킬 수 있습니다.<br>
            신고 stack이 일정한 수준(3)을 넘어서면 별도의 블라인드 처리가 됩니다.


        </div>
    </v-flex>
    </v-layout>

    <!-- 여기까지 슬기가 꾸미는 중 -->


  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      // projects : '',
      // recruitinfo : '',
    }
  },
  props: {

  },
  components:{

  },
  created() {
    // this.SELECT_ALLProjects()
    // this.SELECT_RecruitInfo()
  },
  methods: {
    // async SELECT_ALLProjects() {
    //   this.projects = await FirebaseService.SELECT_ALLProjects()
    //   // console.log(this.projects)
    // },
    // async SELECT_RecruitInfo() {
    //   this.recruitinfo = await FirebaseService.SELECT_RecruitInfo()
    // }
  },
  watch: {
  }

};
</script>

<!-- UserSideInfo -->
<template>
  <div>
    <!-- <v-layout wrap  justify-space-around  align-center>
      <v-flex justify-center>
        <img src="../../assets/icon_set/delete.png"/>
      </v-flex>
    </v-layout> -->



    <!-- 여기서부터 슬기가 꾸미는 중 -->
    <v-layout row wrap>
      <h1 class="headline">관리자 페이지</h1>

      <h2>Weblog</h2>
      <br>
      <h2>Users</h2>
      <br>
      <h2>Company</h2>
      <br>
      <h2>Siren</h2>
      <br>
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

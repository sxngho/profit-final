<!-- UserSideInfo -->
<template>
  <div>
    <v-layout wrap  justify-space-around  align-center>
      <v-flex justify-center>
        <img src="../../assets/icon_set/delete.png"/>
      </v-flex>
    </v-layout>

    <div style="margin:30%"/>
    <hr/>
    {{projects.length}} 개의 프로젝트를 가져왔습니다.
    <!-- 이것저것의 차트 -->
    <v-layout row wrap>
      <v-flex xs4>
        <div style="background:#cecece; height:130px; padding:1vw; margin:1vw;">
        </div>
      </v-flex>
      <v-flex xs4>
        <div style="background:#cecece; height:130px; padding:1vw; margin:1vw;">
        </div>
      </v-flex>
      <v-flex xs4>
        <div style="background:#cecece; height:130px; padding:1vw; margin:1vw;">
        </div>
      </v-flex>
      <v-flex xs4>
        <div style="background:#cecece; height:130px; padding:1vw; margin:1vw;">
        </div>
      </v-flex>
      <v-flex xs4>
        <div style="background:#cecece; height:130px; padding:1vw; margin:1vw;">
        </div>
      </v-flex>
      <v-flex xs4>
        <div style="background:#cecece; height:130px; padding:1vw; margin:1vw;">
        </div>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      projects : '',
    }
  },
  props: {

  },
  components:{

  },
  created() {
    this.SELECT_ALLProjects()
  },
  methods: {
    async SELECT_ALLProjects() {
      this.projects = await FirebaseService.SELECT_ALLProjects()
      // console.log(this.projects)
    },
  },
  watch: {
  }

};
</script>

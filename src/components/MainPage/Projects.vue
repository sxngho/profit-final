<!--GetProjectByUserId-->
<template>
  <v-container>
    <v-layout row wrap mw-700>
      <!-- {{amount_projects}} -->
      {{projects.length}}<br>
        <!-- <v-flex v-if="projects.length > 3" v-for="i in 3" > -->
        <v-flex v-if="projects.length > 1" v-for='i in amount_projects'>
          <div>

          <!-- <ProjectDetail
            :projectimage="projects[i-1][1].projectimage">
          </ProjectDetail> -->


            <!-- {{projects[i-1][1].date}}<br> -->
            <img :src="projects[i-1][1].projectimage" width=300px height=300px style="padding:10px;">
            <!-- <ProjectDetail/> -->
            <!-- <ProjectDetail
              :projectimage="projects[i-1][1].projectimage"
              :projecttitle="projects[i-1][1].projecttitle"
              :projectdescription="projects[i-1][1].projectdescription"
              :projectterm="projects[i-1][1].projectterm"
              :projectcontent="projects[i-1][1].projectcontent"
              :projecttech="projects[i-1][1].projecttech"
              :projectrank="projects[i-1][1].projectrank" width=300px height=300px>
          </ProjectDetail> -->
          </div>


          <v-divider></v-divider>
        </v-flex>
      </v-if>
    </v-layout>
  <v-btn @click="more_projects">더 보기</v-btn>
</v-container>

</template>

<script>
import FirebaseService from "@/services/FirebaseService";

import ProjectDetail from "../Project/ProjectDetail";

export default {
  name: "Projects",
  components : {
    ProjectDetail
  },
  data() {
    return {
      projects: [],
      amount_projects : 3,
    };
  },
  created() {
    this.getmainProjects()
  },
  methods: {
    async getmainProjects() {
      this.projects = await FirebaseService.getmainProjects()
      // console.log(this.projects)
      // this.amount_projects = this.projects.length
      // console.log(this.amount_projects, '떳냐?')
    },
    more_projects() {
      this.amount_projects += 1;

    }
  }
};
</script>

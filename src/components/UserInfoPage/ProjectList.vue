<!--GetProjectByUserId-->
<template>
  <v-container>
    <v-layout wrap justify-center>
      <div v-if="!projects.length">
        <div style="height:100px"></div>
        프로젝트를 추가해주세요.
      </div>
      <v-flex
        v-for="i in projects.length > max_project ? max_project : projects.length" xs12 sm6 lg4 v-if="( projects[i-1].data.state < 3 || projects[i-1].data.session_id==$store.getters.getSession ) && filtering(i,techfilter) && layout==1 "
        style="padding:30px 5px;" v-bind:class="[`project_${i-1}`]">
        <ProjectDetail v-on:popdetail="toStory"
          v-on:UPDATE_Project="toStoryUpdate"
          v-on:delete="DELETE_project"

          :projectstate="projects[i-1].data.state"

          :projectimage="projects[i-1].data.projectimage || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'"
          :projecttitle="projects[i-1].data.projecttitle"
          :projectdescription="projects[i-1].data.projectdescription"
          :project_id="projects[i-1].project_id"
          :project_writer="projects[i-1].data.session_id"
          :index="i-1"
          >

        </ProjectDetail>
      </v-flex>

      <v-flex v-for="i in projects.length > max_project ? max_project : projects.length" xs12 v-if="( projects[i-1].data.state < 3 || projects[i-1].data.session_id==$store.getters.getSession ) && filtering(i,techfilter) && layout==2">
        <ProjectDetail0 v-on:popdetail="toStory"
          :projectimage="projects[i-1].data.projectimage"
          :projecttitle="projects[i-1].data.projecttitle"
          :projectdescription="projects[i-1].data.projectdescription"
          :project_id="projects[i-1].project_id"
          :project_writer="projects[i-1].data.session_id"
          :projectrank="projects[i-1].data.projectrank"
          :projectterm="projects[i-1].data.projectterm"
          :projecttech="projects[i-1].data.projecttech"
          :projectcontent="projects[i-1].data.projectcontent"
          >
        </ProjectDetail0>
        <v-divider></v-divider>
      </v-flex>

      <v-flex v-for="i in projects.length > max_project ? max_project : projects.length" xs12 v-if="( projects[i-1].data.state < 3 || projects[i-1].data.session_id==$store.getters.getSession ) && filtering(i,techfilter) && layout==3">
        <ProjectDetail1 v-on:popdetail="toStory"
          :projectimage="projects[i-1].data.projectimage"
          :projecttitle="projects[i-1].data.projecttitle"
          :projectdescription="projects[i-1].data.projectdescription"
          :project_id="projects[i-1].project_id"
          :project_writer="projects[i-1].data.session_id"
          :projectrank="projects[i-1].data.projectrank"
          :projectterm="projects[i-1].data.projectterm"
          :projecttech="projects[i-1].data.projecttech"
          :projectcontent="projects[i-1].data.projectcontent"
          >
        </ProjectDetail1>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
<!--
    <v-layout justify-center>
      <v-btn
        v-if="more"
        @click="moreproject(max_project)"
        outlined text
        >
        더보기
      </v-btn>
    </v-layout> -->

  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Project from "../Project/Project";
import ProjectDetail from "../Project/ProjectDetail";
import ProjectDetail0 from "../Project/ProjectDetail0";
import ProjectDetail1 from "../Project/ProjectDetail1";
import ProjectUpdator from "./ProjectUpdator";

export default {
  name: "ProjectList",
  data() {
    return {
      projects: [{data: {projectimage: "", projecttitle:"", session_id:"", projectdescription:"",}, project_id:""}],
      max_project : 3,
      more : true,
      techs : ["전체보기", "c", "c#", "javascript", "android", "jquery"],
      techfilter:[],
      filter_projects:[],
    };
  },
  components: {
    Project,
    ProjectDetail,
    ProjectDetail0,
    ProjectDetail1,
    ProjectUpdator,
  },
  mounted() {
    this.SELECT_Projects();
    this.user = this.$route.params.id;
    this.$store.commit('setSession', this.$session.get('session_id'))
    this.amount_Projects();
  },
  props: {
    layout : {type:String, default:"1"},
    toFilter : {type:String, default:"aasdasnkdasdaskl"},
  },
  methods: {
    showNotification (group, type ,title, text) {
       this.$notify({
         group,
         title,
         text,
         type,
       })
     },
    async SELECT_Projects() {
      this.projects = await FirebaseService.SELECT_Projects(this.$route.params.id);
    },
    toStory(pcode) {
      this.$emit('toStory',pcode);
    },
    moreproject(max_project) {
      var interval = 2
      if (this.projects.length <= max_project + interval) {
        this.max_project = this.projects.length
        this.more = false
        alert('마지막 프로젝트가 나옵니다.')
      } else {
        this.max_project += interval
      }
    },
    toStoryUpdate(pcode) {
      this.$emit('toStoryUpdate', pcode)
    },
    filterFunction() {
    let self = this;
    if ( self.toFilter !== "" && this.techfilter.includes(self.toFilter) ) {
      this.techfilter.splice(this.techfilter.indexOf(self.toFilter), 1);
      if ( this.techfilter.length == 0 ) {
        this.showNotification('foo-css','warn','스킬 필터링','프로젝트 필터링 기능이 비활성화되었습니다.')
      }
    } else if( self.toFilter !== "" && !this.techfilter.includes(self.toFilter) ) {
      this.techfilter.push(self.toFilter);
      if ( this.techfilter.length == 1 ) {
        this.showNotification('foo-css','success','스킬 필터링','프로젝트 필터링 기능이 활성화되었습니다.')
      }
    }

    self.toFilter = "";
    this.$emit('toStoryList')
  },
  filtering(index,user_filter) {
    if ( user_filter.length == 0 ) {
      return true;
    }
    var tech = this.projects[index-1].data.projecttech;
    for(let i=0; i<user_filter.length; i++) {
      if (tech.includes(user_filter[i]) ) {
        if( i == (user_filter.length-1) ) {
          return true;
        }
      } else {
        return false;
        }
      }
    },
    async amount_Projects() {
      this.max_project = await FirebaseService.amount_Projects(this.user);
    },
    DELETE_project(project_id, index) {
      // 1. 단순한 방법인데 안돼서 2안으로 진행중.
      // this.projects.splice(index, 1);

      // 2. 자체 클래스를 통해 display:none 으로 해결했습니다.
      var box = document.querySelector(`.project_${index}`)
      box.style.display = 'none';
      this.showNotification('foo-css','success','Project 삭제','프로젝트 삭제를 완료하였습니다.')
    }
  },
  watch: {
    toFilter: function(newVal, oldVal) { // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.filterFunction();
    }
  }
};
</script>

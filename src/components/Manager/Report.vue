<!-- UserSideInfo -->
<template>
  <div>
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <h1> 신고리스트 !! </h1>
          <v-btn @click="setTag('Siren_Project')">
            Siren_Project
          </v-btn>
          <v-btn @click="setTag('Siren_Comment')">
            Siren_Comment
          </v-btn>
          <v-btn @click="setTag('Objection')">
            Objection
          </v-btn>
          <!-- 프로젝트를 신고한 경우 -->
          <v-list v-if="tag =='Siren_Project'">
          <v-list-item
            v-for="(report) in reportList"
            v-if="report.data.tag == tag"
          >

            <v-list-item-content>
             {{ report.data.reportUser }} 가 신고한  {{ report.data.reportedUser }} 의 {{ report.data.projecttitle }} 프로젝트
             {{ report.data.reportTitle }} {{ report.data.reportContent }} 의 사유로 신고가 접수되었습니다.
            </v-list-item-content>

            <v-list-item-action>
              <div>
                <v-btn text outlined color="#00f" small @click="greenBtn(report, tag)">기각</v-btn>
                <v-btn text outlined color="#ff0" small @click="oragneBtn(report, tag)">경고</v-btn>
                <v-btn text outlined color="#f00" small @click="redBtn(report, tag)">블라인드</v-btn>
              </div>
            </v-list-item-action>

          </v-list-item>
        </v-list>

        <!-- 댓글신고를 한 경우 -->
        <v-list v-if="tag =='Siren_Comment'">
        <v-list-item
          v-for="(report) in reportList"
          v-if="report.data.tag == tag"
        >

          <v-list-item-content>
            {{ report.data.reportUser }} 가 신고한  {{ report.data.reportedUser }} 의 {{ report.data.projecttitle }} 프로젝트의
             {{ report.data.reportContent }} 내용이 {{report.data.reportTitle}} 사유로 신고가 접수되었습니다.
          </v-list-item-content>

          <v-list-item-action>
            <div>
              <v-btn text outlined color="#00f" small @click="greenBtn(report, tag)">기각</v-btn>
              <v-btn text outlined color="#ff0" small @click="oragneBtn(report, tag)">경고</v-btn>
              <v-btn text outlined color="#f00" small @click="redBtn(report, tag)">블라인드</v-btn>
            </div>
          </v-list-item-action>

        </v-list-item>
      </v-list>

        <!-- 이의제기를 한 경우 -->
        <v-list v-if="tag =='Objection'">
        <v-list-item
          v-for="(report) in reportList"
          v-if="report.data.tag == tag"
        >

          <v-list-item-content>
          {{ report.data.projectTitle }}
          </v-list-item-content>

          <v-list-item-action>
            <div>
              <v-btn text outlined color="#0ff" small @click="goProject(report.data.projectId)"> 확인하러 가기 </v-btn>
              <v-btn text outlined color="#00f" small @click="greenBtn2(report.data.projectId,report.data.state,report.id)">이의제기 받아들이기</v-btn>
              <v-btn text outlined color="#f00" small @click="redBtn2(report.data.projectId,report.data.state,report.id)">기각</v-btn>
            </div>
          </v-list-item-action>

        </v-list-item>
      </v-list>



        </v-flex>
      </v-layout>
    </template>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      reportList:[],
      tag:"Siren",
    }
  },
  props: {

  },
  components:{

  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData(){
      this.reportList = await FirebaseService.SELECT_AllReport();
      // console.log(this.reportList);
    },
    async greenBtn(report, tag) {
      var projectId = report.data.projectId
      var reportStack = report.data.reportStack
      var id = report.id
      var degree = '기각'
      FirebaseService.DELETE_report(id);
      this.reportList = await FirebaseService.SELECT_AllReport();
      if (tag === 'Siren_Project') {
        var project_data = await FirebaseService.SELECT_Project(projectId)
        var user_data = await FirebaseService.SELECT_Userdata(project_data.session_id)
        FirebaseService.UPDATE_projectState(projectId, reportStack);
        FirebaseService.INSERT_alert_manager(project_data.session_id, projectId, user_data[0], degree, reportStack, tag)
      } else {
        console.log('여기왔냐')
        var project_data = await FirebaseService.SELECT_Project(projectId)
        var user_data = await FirebaseService.SELECT_Userdata(project_data.session_id)
        var comments_data = project_data.comments
        // comments_data[report.data.index].reportUserList = []
        FirebaseService.UPDATE_commentState(projectId, comments_data);
        console.log(report.data.reportUser, '얘가 댓글쓴사람 맞음??')
        FirebaseService.INSERT_alert_manager(report.data.reportUser, projectId, user_data[0], degree, reportStack, tag)
      }

    },
    async oragneBtn(report, tag) {
      var projectId = report.data.projectId
      var reportStack = report.data.reportStack + 1;

      if (reportStack === 3) {
        this.redBtn(report, tag)
      } else {
        var id = report.id
        var degree = '경고'
        // console.log(reportStack)
        FirebaseService.DELETE_report(id);
        this.reportList = await FirebaseService.SELECT_AllReport();

        if (tag === 'Siren_Project') {
          var project_data = await FirebaseService.SELECT_Project(projectId)
          var user_data = await FirebaseService.SELECT_Userdata(project_data.session_id)
          FirebaseService.UPDATE_projectState(projectId, reportStack);
          FirebaseService.INSERT_alert_manager(project_data.session_id, projectId, user_data[0], degree, reportStack, tag)
        } else {
          console.log(report)
          var project_data = await FirebaseService.SELECT_Project(projectId)
          var user_data = await FirebaseService.SELECT_Userdata(project_data.session_id)
          var comments_data = project_data.comments
          comments_data[report.data.index].state = reportStack
          FirebaseService.UPDATE_commentState(projectId, comments_data);
          FirebaseService.INSERT_alert_manager(report.data.reportUser, projectId, user_data[0], degree, reportStack, tag)
        }
      }

    },
    async redBtn(report, tag) {
      var projectId = report.data.projectId
      var reportStack = 3
      var id = report.id
      var degree = '블라인드'
      // console.log(reportStack)
      FirebaseService.DELETE_report(id);
      this.reportList = await FirebaseService.SELECT_AllReport();

      if (tag === 'Siren_Project') {
        var project_data = await FirebaseService.SELECT_Project(projectId)
        var user_data = await FirebaseService.SELECT_Userdata(project_data.session_id)
        FirebaseService.UPDATE_projectState(projectId, reportStack);
        FirebaseService.INSERT_alert_manager(project_data.session_id, projectId, user_data[0], degree, reportStack, tag)
      } else {
        var project_data = await FirebaseService.SELECT_Project(projectId)
        var user_data = await FirebaseService.SELECT_Userdata(project_data.session_id)
        var comments_data = project_data.comments
        comments_data[report.data.index].state = reportStack
        FirebaseService.UPDATE_commentState(projectId, comments_data);
        FirebaseService.INSERT_alert_manager(report.data.reportUser, projectId, user_data[0], degree, reportStack, tag)
      }

    },
    setTag(tag) {
      this.tag = tag;
    },
    goProject(projectId) {
      window.open(
        "../project/" + projectId,
        "projectId",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    },
    async greenBtn2(projectId,state,id) {
      FirebaseService.DELETE_report(id);
      FirebaseService.UPDATE_projectState(projectId,0);
      this.reportList = await FirebaseService.SELECT_AllReport();
    },
    async redBtn2(projectId,state,id) {
      FirebaseService.DELETE_report(id);
      this.reportList = await FirebaseService.SELECT_AllReport();
    },
  },
  watch: {
  }

};
</script>

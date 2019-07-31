<!-- UserSideInfo -->
<template>
  <div>
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <h1> 신고리스트 !! </h1>
          <v-btn @click="setTag('Siren')">
            Siren
          </v-btn>
          <v-btn @click="setTag('Objection')">
            Objection
          </v-btn>
          <v-list v-if="tag =='Siren'">
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
                <v-btn text outlined color="#00f" small @click="greenBtn(report.data.projectId,report.data.reportStack,report.id)">허용</v-btn>
                <v-btn text outlined color="#ff0" small @click="oragneBtn(report.data.projectId,report.data.reportStack,report.id)">경고</v-btn>
                <v-btn text outlined color="#f00" small @click="redBtn(report.data.projectId,report.data.reportStack,report.id)">블라인드</v-btn>
              </div>
            </v-list-item-action>

          </v-list-item>
        </v-list>

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
      console.log(this.reportList);
    },
    async greenBtn(projectId,reportStack,id) {
      FirebaseService.DELETE_report(id);
      FirebaseService.UPDATE_projectState(projectId,reportStack);
      this.reportList = await FirebaseService.SELECT_AllReport();
    },
    async oragneBtn(projectId,reportStack,id) {
      reportStack = reportStack + 1;
      FirebaseService.DELETE_report(id);
      FirebaseService.UPDATE_projectState(projectId,reportStack);
      this.reportList = await FirebaseService.SELECT_AllReport();
    },
    async redBtn(projectId,reportStack,id) {
      reportStack = 3;
      FirebaseService.DELETE_report(id);
      FirebaseService.UPDATE_projectState(projectId,reportStack);
      this.reportList = await FirebaseService.SELECT_AllReport();
    },
    setTag(tag) {
      this.tag = tag;
    },
    goProject(projectId) {
      window.open(
        "../project/" + projectId,
        "name(이름지정)",
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

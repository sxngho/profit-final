<template>
  <v-layout justify-center d-inline>
    <v-dialog v-model="Commentdialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-icon small class="fa fa-bell fa-1x" v-on="on" color="#ffa76a"></v-icon>
        <!-- <v-btn v-if="$store.getters.getSession" text color="primary" dark v-on="on"><i class="fa fa-bell" style="color:orange"></i></v-btn> -->
      </template>

      <v-card>
        <v-card-title class="headline">
          <span class="headline">신고하기</span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-combobox
              v-model="reportCommentSelect"
              :items="reportCommentItems"
              label="댓글신고 사유를 선택해주세요."
              ></v-combobox>
            </v-flex>
            <v-flex xs12 v-if="reportCommentSelect=='기타'">
              <input type="text" v-model="reportCommentText"/>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="reportCommentDesc" required @keyup.enter="Commentdialog = false, submitCommentReport(reportCommentSelect,reportCommentText,reportCommentDesc, index)"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="Commentdialog = false">취소</v-btn>
          <v-btn color="blue darken-1" text @click="Commentdialog = false, submitCommentReport(reportCommentSelect,reportCommentText,reportCommentDesc, index)">신고하기</v-btn>
          <br />
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-layout>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Comment",
  components: {
  },
  mounted() {

  },
  methods: {
    submitCommentReport(reportCommentSelect,reportCommentText,reportCommentDesc, index) {
      console.log(this.comments,"살려줘..")
      var upperUser = this.$session.get('session_id').toUpperCase();
      if ( !this.comments[index].reportUserList.includes(upperUser) ) {
        if ( reportCommentSelect !== "기타" ) {
          FirebaseService.INSERT_commentReport(reportCommentSelect,reportCommentDesc,this.project_id,this.$session.get('session_id')
          ,this.project.session_id,this.project.projecttitle,this.project.state,index,"Siren_Comment");
        } else {
          FirebaseService.INSERT_commentReport(reportCommentText,reportCommentDesc,this.project_id,this.$session.get('session_id')
          ,this.project.session_id,this.project.projecttitle,this.project.state,index,"Siren_Comment");
        }
        this.comments[index].reportUserList.push(upperUser);
        FirebaseService.UPDATE_commentReportUserList(this.project_id,this.comments);
        this.$swal("댓글 신고 성공!", "성공적으로 신고내용이 접수되었습니다.", "success");
      } else {
        this.$swal("댓글 신고 오류!", "이미 신고한 이력이 있는 댓글입니다.", "error");
      }
      this.reportCommentSelect = "";
      this.reportCommentText = "";
      this.reportCommentDesc = "";
    },
  },
  data() {
    return {
      Commentdialog : false,
      reportCommentSelect: '비속어 사용',
      reportCommentItems: [
        '비속어 사용',
        '무분별한 비난',
        '기타',
      ],
      reportCommentText: "",
      reportCommentDesc: "",
    };
  },
  props: {
    com: { type: Object },
    comments: {type :Array },
    project_id: {type: String},
    project : {type :Object},
    index : {type: Number},
  },

};
</script>

<template>
  <v-dialog v-model="edumodal" max-width="600px">
    <template v-slot:activator="{ on }">
      <img src="../../../assets/icon_set/pencil.png" alt="edit" style="cursor:pointer;" v-on="on" />
    </template>

    <v-container class="inputmodal">
      <v-layout row wrap style="padding:10px 20px;">
        <v-spacer />
        <span class="font-weight-regular headline">교육 추가</span>
        <v-spacer />
        <div @click="clearEdu">
          <i class="fa fa-close" />
        </div>
      </v-layout>

      <v-layout row justify-center wrap>
        <v-flex xs10 sm5>
          <p class="subheading font-weight-bold text-center">*기관명</p>
          <v-text-field single-line v-model="eduagency" />
        </v-flex>
        <v-flex xs10 sm5 offset-sm1>
          <p class="subheading font-weight-bold text-center">학위</p>
          <v-text-field single-line v-model="edudegree" />
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center>
        <v-flex xs5>
          <span class="subheading font-weight-bold">시작일</span>
          &nbsp;&nbsp;&nbsp;
          <input type="date" v-model="edustartday" />
        </v-flex>
        <v-flex xs5 offset-sm1>
          <span class="subheading font-weight-bold">종료일</span>
          &nbsp;&nbsp;&nbsp;
          <input type="date" v-model="eduendday" />
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center style="margin-top:60px;">
        <v-btn v-on:click="sendEdu(eduagency,edudegree,edustartday,eduendday)" text outlined>등록</v-btn>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    edumodal: false,
    eduagency: "", //프로젝트 메인 이미지
    edudegree: "", // 프로젝트 이름
    edustartday: "", //프로젝트 간단 설명
    eduendday: "" // 프로젝트 기간
  }),
  methods: {
    sendEdu(eduagency, edudegree, edustartday, eduendday) {
      var Json = new Object();
      Json.Agency = eduagency;
      Json.Degree = edudegree;
      Json.Startday = edustartday;
      Json.Endday = eduendday;
      this.$emit("sendEdu", Json);

      this.eduagency = "";
      this.edudegree = "";
      this.edustartday = "";
      this.eduendday = "";
      this.edumodal = false;
    },
    clearEdu() {
      this.eduagency = "";
      this.edudegree = "";
      this.edustartday = "";
      this.eduendday = "";
      this.edumodal = false;
    }
  },
  watch: {
    eduendday() {
      if (this.edustartday > this.eduendday) {
        alert("교육 종료일은 시작일 이후로 선택해주세요.");
        this.eduendday = this.edustartday;
      }
    }
  }
};
</script>

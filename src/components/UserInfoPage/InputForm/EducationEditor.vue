<template>
    <v-dialog v-model="edumodal"  max-width="600px">

      <template v-slot:activator="{ on }">
        <img src="../../../assets/icon_set/pencil.png" alt="edit" style="cursor:pointer;" v-on="on"/>
      </template>


      <v-card>
        <v-toolbar>
          <span class="font-weight-regular headline">교육 추가</span>
          <v-spacer/>
          <div @click="clearEdu"><i class="fa fa-close"/></div>
        </v-toolbar>

        <v-card-text>
            <v-layout row justify-center wrap>
              <v-flex xs10 sm5>
                <span class="subheading font-weight-bold">*기관명</span>
                <v-text-field
                  single-line
                  outline
                  required
                  v-model="eduagency"
                  ></v-text-field>
              </v-flex>
              <v-flex hidden-only-xs sm1/>
              <v-flex xs10 sm5>
                <span class="subheading font-weight-bold">학위</span>
                <v-text-field
                  single-line
                  outline
                  v-model="edudegree"
                  ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row justify-center wrap>
              <v-flex xs10 sm5>
                <span class="subheading font-weight-bold">시작일</span>
                <div><input type="date"
                  single-line
                  outline
                  v-model="edustartday"
                  ></input></div>
              </v-flex>
              <v-flex hidden-xs-only sm1/>
              <v-flex xs10 sm5>
                <span class="subheading font-weight-bold">종료일</span>
                <div><input type="date"
                  single-line
                  outline
                  v-model="eduendday"
                  ></input></div>
              </v-flex>
            </v-layout>

          <v-layout row wrap justify-center>
            <v-btn v-on:click="sendEdu(eduagency,edudegree,edustartday,eduendday)"  flat outline>등록</v-btn>
          </v-layout>
        </v-card-text>

      </v-card>
    </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

  export default {
    data: () => ({
      edumodal:false,
      eduagency : '', //프로젝트 메인 이미지
      edudegree : '',  // 프로젝트 이름
      edustartday : '', //프로젝트 간단 설명
      eduendday : '', // 프로젝트 기간
    }),
    methods : {
      sendEdu(eduagency,edudegree,edustartday,eduendday) {
        var Json = new Object();
        Json.Agency = eduagency;
        Json.Degree = edudegree;
        Json.Startday = edustartday;
        Json.Endday = eduendday;
        this.$emit('sendEdu',Json);

        this.eduagency = '';
        this.edudegree = '';
        this.edustartday = '';
        this.eduendday = '';
        this.edumodal = false;
      },
      clearEdu() {
        this.eduagency = '';
        this.edudegree = '';
        this.edustartday = '';
        this.eduendday = '';
        this.edumodal = false;
      }
    },
  }
</script>

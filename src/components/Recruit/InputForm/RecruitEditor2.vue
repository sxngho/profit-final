<template>
  <v-container>
    <v-layout row wrap style="margin:10vw 0 5vw 0;" text-center justify-center>
      <span class="display-1">공고 Editor</span>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm11 md10>
      <v-stepper v-model="subidx" vertical style="width:100%;">
        <v-stepper-step :complete="subidx > 1" step="1" style="display: inline-block;" editable>
          프로젝트 기본 정보
          <small>공고의 기본 정보를입력합니다.</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-container>
            <v-layout row wrap justify-center>
              <v-flex xs12 sm10 md8>
                <v-text-field rounded filled label="프로젝트 제목" v-model="projectTitle">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm10 md8>
                <v-text-field rounded filled label="프로젝트 책임자" v-model="chief">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm10 md8>
                <v-autocomplete label="카테고리" v-model="category" :items="categoryList" placeholder="선택하세요." rounded filled>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm10 md8>
                <v-textarea rounded filled label="프로젝트 요약" v-model="projectSummary"/>
              </v-flex>
            </v-layout>
          </v-container>

          <div>
            <v-btn color="primary" @click="subidx = 2">다음</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="subidx > 2" step="2" style="display: inline-block;" editable>
          프로젝트 규모
          <small>공고에 책정된 규모를 입력합니다.</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <div>
            <v-container>
              <v-layout row wrap justify-center>
                <v-flex xs12 sm10 md8>
                  프로젝트 예상기간 : {{this.createDay}}&nbsp;~&nbsp;{{this.endDay}}
                  <br/>
                  <v-date-picker v-model="endDay" color="green" full-width/>
                </v-flex>
                <v-flex xs12 sm10 md8 style="margin-top:30px;">
                  <v-text-field rounded filled label="예산" v-model="budget" number suffix="원"/>
                  <v-text-field rounded filled label="위약금" v-model="penalty" number suffix="원"/>
                </v-flex>
              </v-layout>
            </v-container>
          </div>

          <v-btn color="primary" @click="subidx = 1">이전</v-btn>
          <v-btn color="primary" @click="subidx = 3">다음</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="subidx > 3" step="3" style="display: inline-block;" editable>
          상세정보 입력
          <small>공고의 상세정보를 입력합니다</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-container>
            <v-layout row wrap justify-center>
              <v-flex xs12 sm10 md8>
                <div>
                  <h3>현재 추가된 스킬</h3>
                  <div style="padding:15px; border:2px solid #3f51b51a; border-radius:15px;" v-if="techList.length>0">
                    <v-chip
                     v-for="(item,index) in techList"
                     text-color="white"
                     color="indigo light-3"
                     style="margin:3px;"
                     small @click="deleteTech(index)"> <!-- @click:close="deleteTech(index) -->
                     {{ item }}</v-chip>
                   </div>
                </div>
                <v-divider/>
                <div>
                  <h3>직접 입력</h3>
                  <v-flex xs6>
                    <v-text-field
                    v-model="tech"
                    v-on:keyup.enter="addNewTech()"
                    />
                  </v-flex>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider/>
          <div>
              <vue-editor v-model="projectContent"/>
          </div>
            <v-btn color="primary" @click="subidx = 2">이전</v-btn>
        </div>

        <v-layout row wrap justify-center>
          <v-btn @click="submit" text outlined>완성하기</v-btn>
        </v-layout>
        </v-stepper-content>


      </v-stepper>
    </v-flex>
    </v-layout>
</v-container>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  import FirebaseService from "@/services/FirebaseService";

  export default {
    name: "ProjectEditor",
    data () {
        return {
          subidx:0,
          categoryList: [
            "앱",
            "웹",
            "임베디드",
            "빅데이터",
            "블록체인",
            "인공지능"
          ],
          closingDateList: ["7일 후", "14일 후", "21일 후", "28일 후", "50일 후"],
          category: "",
          projectTitle: "",
          budget: "",
          projectContent: "",
          projectSummary: "",
          endDay: new Date().toISOString().substr(0, 10),
          createDay: new Date().toISOString().slice(0, 10),
          techName: "",
          showTechList: [],
          user: "",
          recruitImage: "",
          chief: "",
          penalty: "",
          tech:"",
          techList:[],
        }
      },
    created() {
      this.user = this.$session.get("session_id");
    },
    watch: {
      techName(to, from) {
        this.showTechList = [];
        if (this.techName === "") {
          this.showTechList = [];
        } else {
          for (let i = 0; i < this.$store.state.techList.length; i++) {
            if (
              this.$store.state.techList[i].indexOf(
                this.techName.toLowerCase()
              ) !== -1
            ) {
              this.showTechList.push(this.$store.state.techList[i]);
            }
          }
        }
        this.$store.commit("showingSameTechList", this.showTechList);
      },
      budget: function(newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.$nextTick(() => (this.budget = result));
      },
      penalty: function(newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.$nextTick(() => (this.penalty = result));
      }
    },
    methods: {
        showNotification(group, type, title, text) {
          this.$notify({
            group,
            title,
            text,
            type
          });
        },
        async submit() {
          this.$swal('Created!','공고가 등록되었습니다.','success')

          const recruitInfo = {
            category: this.category,
            projectTitle: this.projectTitle,
            createDay: this.createDay,
            endDay: this.endDay,
            budget: this.budget,
            projectSummary: this.projectSummary,
            projectContent: this.projectContent,
            requiredSkills: this.techList,
            session_id: this.user,
            chief: this.chief,
            penalty: this.penalty
          };
          // console.log("infotest");
          // console.log(recruitInfo);
          if (this.$session.get("session_id")) {
            var result = await FirebaseService.INSERT_recruitInfo(recruitInfo);
            this.showNotification(
              "foo-css",
              "success",
              `${this.$session.get("session_id")}님`,
              `recruitInfo 내용이 올라갔습니다.!`,
              // console.log(recruitInfo)
            );
            this.$router.push(`/company/${this.$session.get('session_id')}`)
          } else {
            alert("권한이 없습니다.");
          }
        },
        deleteTech(index){
          this.techList.splice(index,1);
        },
        addNewTech(){
          if (this.techList.includes((this.tech).toUpperCase())) {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','이미 추가되어있는 TECH입니다')
          } else if (this.tech) {
              this.techList.push(this.tech.toUpperCase());
              this.tech = '';
          } else {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','추가할 TECH를 입력해주세요')
          }
        },
      },
    components: {
      VueEditor
    },
    props: {
     },
  };
</script>

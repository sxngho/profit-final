<template>
  <v-container>
    <v-layout row wrap style="margin:10vw 0 5vw 0;" text-center justify-center>
      <span class="display-2 font-weight-bold">
        <span class="fontNanum">공고 작성</span>
      </span>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm11 md10>
      <v-stepper v-model="subidx" vertical style="width:100%;">
        <v-stepper-step :complete="subidx > 1" step="1" style="display: inline-block;" editable>
          <span class="headline font-weight-bold">
            <span class="fontNanum">
              프로젝트 기본 정보
            </span>
          </span>
          <small><span class="fontNanum">공고의 기본 정보를입력합니다.</span></small>
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

            <v-layout row wrap justify-center>
              <v-flex xs12 sm10 md8>
                <div>
                  <p style="width:100%;" class="title text-center font-weight-bold">
                    <span class="fontHannaAir">
                      필수 스킬 입력<br/>
                      <small class="grey--text fontNanum caption">
                        ※아래 입력창에 해당 공고 지원자가 필수적으로 갖춰야할 스킬들을 입력해 주세요!
                      </small>
                    </span>
                  </p>
                  <v-layout row wrap justify-center>
                    <v-flex xs6>
                      <v-text-field v-model="tech" v-on:keyup.enter="addNewTech()" hint="필수스킬 입력후 엔터!"/>
                    </v-flex>
                  </v-layout>
                </div>
                <div>
                  <!-- <p style="width:100%;" class="title text-center font-weight-bold"><span class="fontHannaAir">필수스킬</span></p>
                  <small class="grey--text fontNanum caption">※아래 입력창에 해당 공고 지원자가 필수적으로 갖춰야할 스킬들을 입력해 주세요!</small> -->
                  <div style="padding:15px; border:2px solid #3f51b51a; border-radius:15px; margin-bottom:20px;" justify-center >
                    <p style="width:100%;" class="text-center">
                      <small v-if="techList.length==0" class="grey--text fontNanum">
                        필수 스킬이 없습니다!
                      </small>
                    </p>
                    <v-chip
                       v-for="(item,index) in techList"
                       text-color="white"
                       color="indigo light-3"
                       style="margin:3px;"
                       small @click="deleteTech(index)"> <!-- @click:close="deleteTech(index) -->
                       {{ item }}
                     </v-chip>
                   </div>
                </div>

              </v-flex>
            </v-layout>
          </v-container>

          <v-layout row>
            <v-spacer/>
            <v-btn color="primary" rounded @click="subidx = 2" style="margin:2px 0;">다음</v-btn>
            <v-spacer/>
          </v-layout>
        </v-stepper-content>

        <v-stepper-step :complete="subidx > 2" step="2" style="display: inline-block;" editable>
          <span class="headline font-weight-bold">
            <span class="fontNanum">
              프로젝트 규모
            </span>
          </span>
          <small><span class="fontNanum">공고에 책정된 규모를 입력합니다.</span></small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <div>
            <v-container>
              <v-layout row wrap justify-center>
                <v-flex xs12 style="margin-bottom:20px;">
                  <p class="text-center title font-weight-bold" style="width:100%;">
                    <span class="fontHannaAir ">
                      프로젝트 예상기간<br/>
                    </span>
                  </p>
                  <p class="text-center headline font-weight-bold" style="width:100%;">
                      {{this.createDay}}&nbsp;~&nbsp;{{this.endDay}}
                  </p>
                </v-flex>
                <v-flex xs12 sm10 md5>
                  <p class="text-center title font-weight-bold" style="width:100%;">
                    <span class="fontHannaAir ">
                      시작일
                    </span>
                  </p>
                  <v-date-picker v-model="createDay" color="#91A9D9" full-width/>
                </v-flex>
                <v-flex xs12 sm10 md5 offset-md1>
                  <p class="text-center title font-weight-bold" style="width:100%;">
                    <span class="fontHannaAir ">
                      종료일
                    </span>
                  </p>
                  <v-date-picker v-model="endDay" color="#99b1bf" full-width/>
                </v-flex>

                <v-flex xs12 sm10 md8 style="margin-top:30px;">
                  <v-text-field rounded filled label="예산" v-model="budget" number suffix="원"/>
                  <v-text-field rounded filled label="위약금" v-model="penalty" number suffix="원"/>
                </v-flex>
              </v-layout>
            </v-container>
          </div>

          <v-layout row>
            <v-spacer/>
            <v-btn color="primary" @click="subidx = 1" style="margin:2px 0;" rounded>이전</v-btn>
            <v-btn color="primary" @click="subidx = 3" style="margin:2px 0;" rounded>다음</v-btn>
            <v-spacer/>
          </v-layout>
        </v-stepper-content>

        <v-stepper-step :complete="subidx > 3" step="3" style="display: inline-block;" editable>
          <span class="headline font-weight-bold">
            <span class="fontNanum">
              상세정보 입력
            </span>
          </span>
          <small><span class="fontNanum">공고의 상세정보를 입력합니다</span></small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-container>
            <div>
              <vue-editor v-model="projectContent"/>
            </div>
          </v-container>


            <v-layout row justify-center>
              <v-btn color="primary" rounded @click="subidx = 2" style="margin:2px 0;">이전</v-btn>
              <v-btn @click="submit" rounded color="success">완성하기</v-btn>
            </v-layout>
        </div>

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
          //프로젝트 제목, 프로젝트 책임자, 카테고리, 프로젝트 요약, 스킬, 프로젝트 예상기간,
          // 예산, 위약금, 상세정보

          if (!(this.projectTitle && this.chief && this.category && this.projectSummary && this.techList.length
             && this.budget && this.penalty && this.projectContent && (this.endDay >= this.createDay))) {
              // console.log('이건 안되는 상황이다.')
              var reject_reason = ""
              var reject_count = 0
              if (!this.projectTitle) {
                reject_reason += '프로젝트 제목 <br/>'
                reject_count += 1
              }
              if (!this.chief) {
                reject_reason += '프로젝트 책임자 <br/>'
                reject_count += 1
              }
              if (!this.category) {
                reject_reason += '카테고리 <br/>'
                reject_count += 1
              }
              if (!this.projectSummary) {
                reject_reason += '프로젝트 요약 <br/>'
                reject_count += 1
              }
              if (!this.techList.length) {
                reject_reason += '프로젝트 스킬 <br/>'
                reject_count += 1
              }
              if (!this.budget) {
                reject_reason += '예산 <br/>'
                reject_count += 1
              }
              if (!this.penalty) {
                reject_reason += '위약금 <br/>'
                reject_count += 1
              }
              if (!this.projectContent) {
                reject_reason += '상세정보 <br/>'
                reject_count += 1
              }
              if (!(this.endDay >= this.createDay)) {
                reject_reason += '시작일과 종료일 <br/>'
                reject_count += 1
              }

              this.$swal("프로젝트 생성 실패!", `필수 정보들을 채워주세요 : ${reject_count}개` + `<br/>` + `${reject_reason}`, "error");
          } else {
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
            this.$router.push(`/company/${this.$session.get('session_id')}`)
          } else {
            this.$swal('등록 실패!','권한이 없습니다.','error')
          }

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

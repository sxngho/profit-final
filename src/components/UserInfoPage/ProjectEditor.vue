<template>
  <div justify-center>
    <v-flex column xs12 sm12 >
    <v-tabs
      right
      v-model="active"
      color="gray"
      dark
      slider-color="red"
    >
      <v-tab
        v-for="step in steps"
        :key="step.idx"
        ripple
      >
        {{ step.title }}
      </v-tab>

      <!-- 탭 아이템들 -->
      <!-- Step 1 :: ProjectTitle -->
      <v-tab-item :key="1">
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-flex>
                <h3>ADD Project</h3>
              </v-flex>

              <v-flex>
                <span>프로젝트 제목</span>
                <small>*필수항목입니다</small>
                <v-text-field
                label="프로젝트 제목*"
                single-line
                outline
                v-model="projecttitle"
                required
                ></v-text-field>
              </v-flex>

              <v-flex>
                <span>프로젝트 설명</span>
                <v-textarea
                outline
                name="input-7-4"
                label="프로젝트 설명"
                v-model="projectdescription"
                ></v-textarea>
              </v-flex>

              <v-flex>
                <p>프로젝트 생성시 프로젝트 생성 도우미가 실행됩니다!</p>
              </v-flex>

              <div class="text-xs-center mt-3">
                <v-btn @click="next">프로젝트 생성하기!</v-btn>
              </div>
            </v-container>
          </v-card-text>
        </v-card flat>
      </v-tab-item>

      <!-- Step 2 :: ProjecStruct -->
      <v-tab-item :key="2">
        <v-card flat>
          <v-card-text>
            <!-- 프로젝트 기간 세팅 -->
            <v-container>
              <h3>날짜 / 기간</h3>
              <v-flex xs12>
                프로젝트 시작일 :  {{picker}}<br/>
                프로젝트 기간 : {{projectterm}}
              </v-flex>

              <v-layout column justify-center>
                <v-flex xs12>
                  <v-date-picker v-model="picker" :landscape="landscape" color="green lighten-1"></v-date-picker>
                </v-flex>

                <v-flex xs12>
                  <ul row style="list-style:none;">
                    <li v-for="item in pterm" style="float:left">
                      <v-btn small flat outline round @click="termselect(item)">{{ item }}</v-btn>
                    </li>
                  </ul>
                </v-flex>
              </v-layout>
            </v-container>

            <hr/>

            <!--  테크 -->
            <v-container>

              <h3>현재 등록된 Tech stack</h3>
              <v-layout column justify-center>
                <v-layout row>
                  <v-flex xs12>
                    <ul row style="list-style:none;">
                      <li v-for="(item, index) in projecttech" style="float:left">
                        <v-btn small flat outline round @click="deleteTech()">{{ item }}</v-btn>
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>

                <h3>직접 추가하기</h3>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field
                    v-model="tech"
                    v-on:keyup.enter="addNewTech()"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <h3>Tech stack 목록</h3>
                <v-layout row>
                  <v-flex xs12>
                    <ul row style="list-style:none;">
                      <li v-for="(item, index) in techlist" style="float:left">
                        <v-btn small flat outline round @click="addTech(item)">{{ item }}</v-btn>
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>

              </v-layout>
            </v-container>

            <hr/>

            <!-- TODO project img upload ==> Main and thumbnail -->
            <v-container>
              <h3>프로젝트 대표이미지 등록</h3>
              <div v-if="!projectimage">
                <input type="file" @change="onFileChange" />
              </div>
              <div v-else>
                <img :src="projectimage" width="200px" height="200px"/><br>
                <v-btn @click="removeImage">Remove image</v-btn>
              </div>
            </v-container>

            <hr/>

            <!-- 등급 -->
            <v-container>
              <h3>프로젝트의 등급</h3>
              <v-layout column>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field
                    suffix="수준"
                    v-model="projectrank"/>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <ul row style="list-style:none;">
                      <li v-for="item in ranklist" style="float:left">
                        <v-btn small flat outline round @click="selectRank(item)">{{ item }}</v-btn>
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-container>

            <div class="text-xs-center mt-3">
              <v-btn @click="prevent">이전으로</v-btn>
              <v-btn @click="next">다음단계로</v-btn>
            </div>
          </v-card-text>
        </v-card flat>
      </v-tab-item>

      <!-- Step 3 :: Set Project main Img, Thumbnail, description -->
      <v-tab-item :key="3">
        <v-card flat>
          <v-card-text style="overflow:auto">
            <vue-editor v-model="projectcontent"></vue-editor>

            <div class="text-xs-center mt-3">
              <v-btn @click="prevent">이전으로</v-btn>
              <v-btn @click="submit(projecttitle,
                     projectdescription,
                     projectterm,
                     projectcontent,
                     projecttech,
                     projectimage,
                     projectrank,
                     session_id)" :editorToolbar="customToolbar">완성하기!</v-btn>
              <br/>
              <small>*언제든지 수정할 수 있습니다!</small>
            </div>
          </v-card-text>
        </v-card flat>
      </v-tab-item>

    </v-tabs>

  </v-flex>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import FirebaseService from "@/services/FirebaseService";

  export default {
    name: "ProjectEditor",
    data () {
        return {
          active: null,
          steps:[
            {idx:1, title:"step 1"},
            {idx:2, title:"step 2"},
            {idx:3, title:"step 3"},
          ],

          picker: new Date().toISOString().substr(0, 10),
          landscape: true,
          pterm:[
             "진행중", "1주일", "2주일", "3주일", "1개월",
             "2개월", "3개월", "4개월", "5개월", "6개월",
             "7개월", "8개월", "9개월", "10개월", "11개월",
             "1년", "2년", "3년", "4년", "5년",
          ],
          techlist:[
            "c",
            "c#",
            "javascript",
            "android",
            "jquery"
          ],
          tech:"",
          projecttech:[],
          projectrank:"",
          ranklist:[
            "상용화",
            "베타테스트",
            "알파테스트",
            "튜토리얼",
            "과제",
            "연구",
            "개인프로젝트",
          ],
          projecttitle:"",
          projectdescription:"",
          projectterm:"",
          projectimage: "",
          projectcontent: "<h1>Some initial content</h1>",
          customToolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
          session_id : "",
        }
      },
      created() {
        this.getSessionid()
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
        getSessionid() {
          this.session_id = this.$session.get('session_id')
        },
        next () {
          const active = parseInt(this.active)
          this.active = (active < 2 ? active + 1 : 2)
        },
        prevent(){
          const active = parseInt(this.active)
          this.active = (active == 0 ? 0 : active-1)
        },
        termselect(inputterm){
          this.projectterm = inputterm;
        },
        deleteTech(index){
          this.projecttech.splice(index,1);
        },
        addNewTech(){
          if (this.tech) {
            this.projecttech.push(this.tech);
            this.tech = '';
          } else {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','추가할 TECH를 입력해주세요')

          }
        },
        addTech(t){
          if (!this.projecttech.includes(t)) {
              this.projecttech.push(t);
          } else {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','이미 추가되어있는 TECH입니다')
          }
        },
        selectRank(inputrank){
          this.projectrank = inputrank;
        },
        submit(projecttitle,
               projectdescription,
               projectterm,
               projectcontent,
               projecttech,
               projectimage,
               projectrank,
             session_id) {
        FirebaseService.INSERT_Projects(
          this.projecttitle,
          this.projectdescription,
          this.projectterm,
          this.projectcontent,
          this.projecttech,
          this.projectimage,
          this.projectrank,
        this.session_id);
        this.reload_userskill(this.session_id);
        this.showNotification('foo-css','success','업로드 성공','프로젝트가 정상적으로 수정되었습니다.')
        this.$emit('insert_success')
        },
        async reload_userskill(session_id) {
          // console.log('asdasd')
        var projects =  await FirebaseService.SELECT_Projects(session_id);
        await FirebaseService.reload_userskill(session_id,projects);
      },
        //// IMAGE UPLOAD
        removeImage(){
          this.projectimage = "";
        },
        onFileChange(e) {
          // file 세팅
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length) {
            return;
          }
          const apiUrl = "https://api.imgur.com/3/image";
          let data = new FormData();
          let content = {
            method: "POST",
            headers: {
              Authorization: "Client-ID f96b8964f338658",
              Accept: "application/json"
            },
            body: data,
            mimeType: "multipart/form-data"
          };
          data.append("image", files[0]);
          fetch(apiUrl, content)
          .then(response => response.json())
          .then(success => {
            this.projectimage = success.data.link;
          })
          .catch();
        }
    },
    components: {
      VueEditor
    },
    props: {

     },
  };
</script>

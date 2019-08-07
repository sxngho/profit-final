<template>
  <v-container>
    <v-layout row wrap v-if="project_id != '' && project_id != undefined">
      <v-flex  @click="goBackpage()">
        <img
        src="../../assets/icon_set/back.png"
        alt="backtoList"
        style="cursor:pointer;width:25px;height:25px;"
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-stepper v-model="idx" style="width:100%" alt-labels>
        <v-stepper-header>
          <v-stepper-step :complete="idx > 1" step="1" editable>시작하기!</v-stepper-step>
          <v-divider/>
          <v-stepper-step :complete="idx > 2" step="2" editable>대표 이미지</v-stepper-step>
          <v-divider/>
          <v-stepper-step :complete="idx > 3" step="3" editable>옵션</v-stepper-step>
          <v-divider/>
          <v-stepper-step step="4" editable>상세설명</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div>
              <span>프로젝트 제목</span>
              <small>*필수항목입니다</small>
              <v-text-field
              label="필수항목 입니다"
              single-line
              outlined
              v-model="projecttitle"
              required
              ></v-text-field>
              <span>프로젝트 설명</span>
              <v-textarea
              outlined
              name="input-7-4"
              label="프로젝트 설명"
              v-model="projectdescription"
              ></v-textarea>
            </div>
            <v-layout justify-center>
              <v-btn color="primary" text @click="idx = 2">다음단계로</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div>
              <div v-if="!projectimage">
                <input id="inputfile" type="file" @change="onFileChange" />
              </div>
              <div v-else>
                <img :src="projectimage" width="200px" height="200px"/><br>
                <v-btn @click="removeImage">Remove image</v-btn>
              </div>
            </div>
            <v-layout justify-center>
              <v-btn color="primary" text @click="idx = 1">이전으로</v-btn>
              <v-btn color="primary" text @click="idx = 3">다음단계로</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div>
              <v-stepper v-model="subidx" vertical>
                <v-stepper-step :complete="subidx > 1" step="1" style="display: inline-block;" editable>
                  진행기간
                  <small>프로젝트를 진행했던 기간을 입력해 주세요</small>
                </v-stepper-step>

                <v-stepper-content step="1">
                  <div>
                    <div>
                      프로젝트 시작일 :  {{picker}}<br/>
                      프로젝트 기간 : {{projectterm}}
                    </div>

                    <v-date-picker v-model="picker" landscape color="green lighten-1"/>

                    <div>
                      <v-btn v-for="item in pterm" small text outlined rounded @click="termselect(item)">{{ item }}</v-btn>
                    </div>
                  </div>

                  <div>
                    <v-btn color="primary" @click="subidx = 2">다음</v-btn>
                  </div>
                </v-stepper-content>

                <v-stepper-step :complete="subidx > 2" step="2" style="display: inline-block;" editable>
                  기술 스택
                  <small>프로젝트에 사용된 기술들을 등록하세요</small>
                </v-stepper-step>

                <v-stepper-content step="2">
                  <div>
                    <h3>현재 추가된 스킬</h3>
                    <div style="padding:15px; border:2px solid #3f51b51a; border-radius:15px;" v-if="projecttech != ''">
                      <v-chip
                       v-for="(item, index) in projecttech"
                       text-color="white"
                       color="indigo light-3"
                       style="margin:3px;"
                       small close @click="deleteTech(index)"> <!-- @click:close="deleteTech(index) -->
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
                  <v-divider/>
                  <div>
                    <h3>Hot Skills</h3>
                    <v-chip
                     v-for="(item, index) in techlist"
                     small outlined color="indigo darken-3" @click="addTech(item)">{{ item }}</v-chip>
                  </div>
                  <v-btn color="primary" @click="subidx = 1">이전</v-btn>
                  <v-btn color="primary" @click="subidx = 3">다음</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="subidx > 3" step="3" style="display: inline-block;" editable>
                  등급
                  <small>프로젝트의 대략적인 등급을 설정해 주세요</small>
                </v-stepper-step>

                <v-stepper-content step="3">
                  <div>
                    <v-flex xs6>
                      <v-text-field
                      suffix="수준"
                      v-model="projectrank"/>
                    </v-flex>
                    <div>
                      <v-btn v-for="item in ranklist"
                      small text outlined rounded
                      @click="selectRank(item)">
                      {{ item }}</v-btn>
                    </div>
                    <v-btn color="primary" @click="subidx = 2">이전</v-btn>
                  </div>

                  <div>
                  </div>
                </v-stepper-content>

              </v-stepper>
            </div>
            <v-layout justify-center>
              <v-btn color="primary" text @click="idx = 2">이전으로</v-btn>
              <v-btn color="primary" text @click="idx = 4">다음단계로</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="4">
            <div>
              <vue-editor v-model="projectcontent"/>
            </div>

            <v-layout justify-center>
              <v-btn color="primary" text @click="idx = 3">이전으로</v-btn>
              <v-btn color="primary" text
              @click="submit(projecttitle,
               projectdescription,
               projectterm,
               projectcontent,
               projecttech,
               projectimage,
               projectrank,
               session_id)" :editorToolbar="customToolbar">완성하기</v-btn>
               <br/><small>*언제든지 수정할 수 있습니다!</small>
            </v-layout>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
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
          idx:0,
          subidx:0,
          e6:0,
          picker: new Date().toISOString().substr(0, 10),
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
    mounted() {
      this.getSessionid()
      if(this.project_id != ''){
        this.getProject()
      }
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
        goBackpage() {
           this.$emit('goBackpage')
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
          if (this.projecttech.includes((this.tech).toUpperCase())) {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','이미 추가되어있는 TECH입니다')
          } else if (this.tech) {
              this.projecttech.push(this.tech.toUpperCase());
              this.tech = '';
          } else {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','추가할 TECH를 입력해주세요')
          }
        },
        addTech(t){
          t = t.toUpperCase();
          if (!this.projecttech.includes(t)) {
              this.projecttech.push(t);
          } else {
            this.showNotification('foo-css','warn','Tech Stack 추가 오류','이미 추가되어있는 TECH입니다')
          }
        },
        selectRank(inputrank){
          this.projectrank = inputrank;
        },
        async submit(projecttitle,
               projectdescription,
               projectterm,
               projectcontent,
               projecttech,
               projectimage,
               projectrank,
             session_id) {
               if(this.project_id == '' || this.project_id == null || this.project_id == undefined){
                 FirebaseService.INSERT_Projects(
                   this.projecttitle,
                   this.projectdescription,
                   this.projectterm,
                   this.projectcontent,
                   this.projecttech,
                   this.projectimage,
                   this.projectrank,
                   this.session_id).then(function(result) {
                     var project_id = result.id
                     // console.log(result.id, '넘어왔으려나..')
                     // console.log(session_id, '넘어왔으려나2..')
                     // 여기에서 팔로우들에게 프로젝트를 생성했다고 알림을 보낼 것입니다.
                     var userdata = FirebaseService.SELECT_Userdata(session_id).then(function(result) {
                       var userdata_dic = result[0]
                       var user_followerlist = result[0].followerlist
                       // check, comment, project_id, url
                       // console.log(user_followerlist, 'alert 보내야 할 리스트 떳냐')
                       for (var i in user_followerlist) {

                         // console.log(userdata_dic, 'userdata 왓음..??')
                         var Json = new Object();
                         // /project/Cx8TiNE5JNzaMUb9loMu
                         Json.url = '/project/' + result.id
                         Json.project_title = result.projecttitle
                         Json.project_id = project_id
                         Json.session_id = session_id
                         // console.log(user_followerlist[i], '한명 떳냐')
                         FirebaseService.INSERT_alert_Project(user_followerlist[i], Json, userdata_dic)
                         console.log("에디터1")
                       }
                     })
                   })

                 this.reload_userskill(this.session_id);
                 this.$swal(
                    '프로젝트 업로드 성공!',
                    '프로젝트가 정상적으로 업로드 되었습니다.',
                    'success'
                  )
                 this.$emit('insert_success')
               }else{
                 var data = {'projecttitle':projecttitle,
                 'projectdescription':projectdescription,
                 'projectterm':projectterm,
                 'projectcontent':projectcontent,
                 'projecttech':projecttech,
                 'projectimage':projectimage,
                 'projectrank':projectrank }
                 // console.log(this.project_id, '이게 나와야 한다')
                 FirebaseService.UPDATE_Project(
                   data, this.project, this.project_id);
                  this.reload_userskill(this.session_id)
                  this.$swal(
                     '프로젝트 수정 성공!',
                     '프로젝트가 정상적으로 수정되었습니다.',
                     'success'
                   )
                // 여기여기
                this.$emit('update_success')
               }
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
          if (e.target.files[0].type.substr(0, 5)=='image') {
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
          } else {
            var image_file = document.querySelector('#inputfile')
            image_file.value=""
            this.$swal(
               '이미지 오류!',
               '이미지 파일만 올려주세요.',
               'error'
             )
          }


        },
        async getProject() {
          this.project = await FirebaseService.SELECT_Project(this.project_id)
          var data = this.project
          this.projectcontent = data.projectcontent
          this.projectdescription = data.projectdescription
          this.projectimage = data.projectimage
          this.projectrank = data.projectrank
          this.projectterm = data.projectterm
          this.projecttech = data.projecttech
          this.projecttitle = data.projecttitle

        },
    },
    components: {
      VueEditor
    },
    props: {
      project_id: { type: String }
     },
  };
</script>

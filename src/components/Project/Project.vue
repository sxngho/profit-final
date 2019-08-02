<template>
  <div>
    <v-btn @click="goBackpage()" text outlined> 뒤로가기 </v-btn>
    <v-divider/>

    <v-layout>
      <v-toolbar-title class="font-weight-medium" style="padding-left:10px;">
         <span class="font-weight-bold">{{project.projecttitle}} </span>
         <span class="font-weight-thin font-italic subheading">{{project.developer}}</span>
         <v-flex class="caption">
           {{ project.projectdescription }}
         </v-flex>
       </v-toolbar-title>

       <v-btn text color="yellow" @click="submitObjection()" v-if="isMineCheck() && project.state > 0">
         이의제기
       </v-btn>

      <v-spacer/>
      <v-btn text icon color="pink">
        <i id="likecheck" class="far fa-heart fa-2x" @click="like_project()"></i>
        {{likeit.length}}
        <!-- 이미 좋아요 눌렀다면 다른 fa 를 보여주는 것도 좋겠다. -->
      </v-btn>

      <v-btn text icon color="yellow">
        <i class="fa fa-star fa-2x"></i>
      </v-btn>

    </v-layout>

    <template>
    <v-layout justify-center d-inline>
      <v-dialog v-model="sirendialog" max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn text color="primary" dark v-on="on"><i class="fa fa-trash fa-2x"></i></v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">
            <span class="headline">2신고하기</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <v-combobox
                v-model="reportSelect"
                :items="reportItems"
                label="신고 사유를 선택해주세요."
                ></v-combobox>
              </v-flex>
              <v-flex xs12 v-if="reportSelect=='기타'">
                <input type="text" v-model="reportText"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="reportDesc" required @keyup.enter="sirendialog = false, submitReport(reportSelect,reportText,reportDesc)"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="sirendialog = false">취소</v-btn>
            <v-btn color="blue darken-1" text @click="sirendialog = false, submitReport(reportSelect,reportText,reportDesc)">신고하기</v-btn>
            <br />
          </v-card-actions>
        </v-card>

      </v-dialog>
    </v-layout>
  </template>

    <!-- card -->
    <v-layout>
      <v-container grid-list-md>
        <v-layout wrap>
          <!-- Project Main Thumbnail -->
          <v-flex xs12>
            <BigImg v-bind:imgSrc="project.projectimage" />
          </v-flex>
          <!--  left detail -->
          <v-flex xs12 md9>
            <v-layout column>
              <!-- project description -->
              <v-layout row style="padding: 2vw 0vw; border-bottom: 1px solid #cecece;">


              <!--comment -->
                <v-flex>
                  <span class="title">{{project.projecttitle}}</span>
                  <v-flex class="d-inline caption tag" rounded outlined>{{ project.projectterm }}</v-flex>
                  <v-flex class="d-inline caption tag" rounded outlined>{{ project.projectrank }}</v-flex>
                  <br />

                  <v-layout class="d-block" style="padding: 1vw 0vw;">
                    <v-flex
                      v-for="tech in project.projecttech"
                      class="tech d-inline-block caption"
                    >{{ tech }}</v-flex>
                  </v-layout>

                  <p v-html="project.projectcontent" />
                </v-flex>
              </v-layout>

            <!--comment -->
              <v-flex>
                <form>

                  <!-- 여기에 태그한 사람들의 이름이 박스로 체크됩니다. -->
                  <div >
                    태그 : <v-btn style="display:inline-block;" v-for="nickname in real_taglist" @click="delete_taglist(nickname)">{{nickname}}</v-btn>
                    <v-text-field style="width:100%;" placeholder="댓글을 입력해주세요" v-model="comment" v-on:keyup.enter="INSERT_Comment(real_taglist, comment)"></v-text-field>
                  </div>

                  <!-- 여기에서 태그 가능한 사람들의 목록을 보여줄 것입니다.-->
                  <v-list style="position:absolute; z-index:1; background-color:#fff;">
                    <v-list-item v-for="nickname in tmp_taglist">
                      <v-list-item-content style="border-bottom:1px solid; width:500px;">
                        <v-list-item-title v-html="nickname" @click="insert_taglist(nickname)"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-btn @click="INSERT_Comment(real_taglist, comment)">submit</v-btn>

                  </form>

                <!-- comment sort -->
                <v-flex>

                  <span>sort</span>

                  <v-btn text depressed small>oldest</v-btn>
                  <v-btn text depressed small>newest</v-btn>
                  <v-btn text depressed small>liked</v-btn>
                </v-flex>


                <!-- comment list -->
                <v-list>
                  <v-list-item v-for="(com, index) in comments" style="border-bottom: 1px solid #9E6E2E; margin:10px; padding:10px;">

                    <!-- 수정 전에 보여주는 댓글리스트 -->
                    <v-list-item-content v-bind:class="[`before_${index}`]" style="width:70%;">
                      <span v-if="com.state==3" style="color:red;" @click="seecomment(index)">이 댓글은 신고 누적으로 블라인드 처리</span>
                      <v-list-item-title v-if="com.state < 3" v-html="com.Comment"></v-list-item-title>
                      <v-list-item-title v-html="com.Comment" v-bind:class="[`blind_${index}`]" style="display:none;"></v-list-item-title>
                      <v-list-item-title v-html="com.User"></v-list-item-title>
                    </v-list-item-content>
                    <!--  -->
                    <!-- 수정 그림을 누르면 보여주는 구역 , 바로 비동기적으로 구현됨.-->
                    <div v-bind:class="[`after_${index}`]" style="display:none; width:100%; margin:10px; padding:10px; ">
                      <input v-bind:class="[`aftertext_${index}`]" style="display:inline-block; width:100%; border: 1px solid #ff0000;" v-model="update_commenttext"><br>
                      <v-btn @click="change_comment(comments, index, update_commenttext)">수정</v-btn>
                      <v-btn @click="cancel(comments, index)">취소</v-btn>
                    </div>
                    <!--  -->

                    <v-list-item-action>
                      <div style='display:inline-block;'>
                        &nbsp;
                        <i v-bind:id="[`commentlike_${index}`]" class="far fa-heart" style="color:red" @click="like_comment(com, index)"></i>
                        {{com.like.length}}
                        &nbsp;
                        <i v-bind:id="[`commentunlike_${index}`]" class="far fa-heart" @click="unlike_comment(com, index)"></i>
                        {{com.unlike.length}}
                        &nbsp;
                        <img v-if="com.User==user" src="data:image/png;base64,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" alt="Smiley" style="cursor: pointer; height:20px; display:inline-block;"
                        @click="UPDATE_comment(comments, index)">
                        &nbsp;
                        <img v-if="com.User==user" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHUSURBVFiF7Za/SxthGMc/76sFOU2q0aFWLf0fusmN/hh0ClkydFHpUMGpVOiQ2uIiKoj4o0J1CaVL7Fp0cTkoFVqE/gelxslEY0jDVe/tEDw8zUXvuFNEn+2e5+75fu75ce8JPNrQxIyqFV+beCW85JNeAYK2er8Pnn/TyyrjZjdegQv9Gl/6OICSK0BHwFp/EOrF1Mvhr2edFyug5IcQxAE6lRIr553VWtAZgjgAArquAnCtdg/g+tXaG0v42ms3a5/PVNW68QrcA9xCAFHjtK0VCwRACNrezNH6ehoZeegIaXofj2Y/0/BMDxEAUP9MHnQ8JTaasiE0vZ9oYgSkBNMMEUAp8suTHO/9pr79CbHRFI29caKJYQAKmVXKv7ZDBACso0NyC+84zlYgIoPJivj6GiVjw2s6f1tgFQv8/WnY1yeHOco73/yk8geg6f1EBpKgFCcH+9Q1tzpmIlQATe9z9Hx/ZtwxE7IpGiKAlETjQ7Z4ydiozMTiextC6+7xlNLbX7FlcfBpAUzTMe2ng6l191D6vhUiAFD+YVT1W8UCxc0vXtPdxrPgLgFkgxIRsOsdQJAOCsBCueZy3YJci0jF8goUz4HHPrWzCNL5FvnW7Yb/F8CPuY2PJ7UAAAAASUVORK5CYII=" alt="Smiley" style="cursor: pointer; height:20px; display:inline-block;" @click="DELETE_comment(comments, index)">
                      </div>
                    </v-list-item-action>
                    <br>
                  </v-list-item>
                </v-list>

                <!-- end xs9 -->
              </v-flex>
            </v-layout>
          </v-flex>

        <!-- right detail -->
        <v-flex xs12 md3 justify-center>
          <v-flex>Etc Project</v-flex>
          <img
            v-for="e in project.etcproject"
            xs4
            md1
            :src="e.url"
            style="width:70px; height:70px; padding:3px;"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>

  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import BigImg from "../Common/BigImg";


export default {
  name: "Project",
  data() {
    return {
    project_id: this.pcode,
    project: "",
    user:"",
    comments:[],
    comment:"",
    update_comment: false,
    update_commenttext:'',
    likeit: [],
    tmp_taglist:[],
    real_taglist:[],
    sirendialog: false,
    reportSelect: '잘못된 정보가 기입된 프로젝트',
    reportItems: [
      '잘못된 정보가 기입된 프로젝트',
      '비속어 사용',
      '기타',
    ],
    reportText: "",
    reportDesc: "",
    reportCommentSelect: '비속어 사용',
    reportCommentItems: [
      '비속어 사용',
      '무분별한 비난',
      '기타',
    ],
    reportCommentText: "",
    reportCommentDesc: "",
    Commentdialog: false,

  }
  },
  props : {
    pcode : {type:String, default:""}
  },
  components: {
    BigImg,
  },
  created(){
    this.user = this.$session.get('session_id')
    this.bindData();
    this.get_comments();
    this.like_check();
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
     async submitObjection() {
       var objs = await FirebaseService.SELECT_Objections(this.project_id);
       if ( objs.length == 0 ) { // 이의제기 신청을 하지 않았던 상태
         FirebaseService.INSERT_Objection(this.project_id,this.project.projecttitle,this.project.state,"Objection");
       } else {
        this.showNotification('foo-css','error','이의제기 신청 오류','이미 이의제기 신청이 접수되어있습니다.')
       }
     },
     isMineCheck() {
       if ( this.user == this.project.session_id ) {
         return true;
       } else {
         return false;
       }
     },
     submitReport(reportSelect,reportText,reportDesc) {
       var upperUser = this.$session.get('session_id').toUpperCase();
       if ( !this.project.reportUserList.includes(upperUser) ) {
         if ( reportSelect !== "기타" ) {
           FirebaseService.INSERT_projectReport(reportSelect,reportDesc,this.project_id,this.$session.get('session_id')
                                               ,this.project.session_id,this.project.projecttitle,this.project.state,"Siren_Project");
           // FirebaseService.INSERT_alert_siren_project(this.project.session_id, this.project, this.userdata)
         } else {
           FirebaseService.INSERT_projectReport(reportText,reportDesc,this.project_id,this.$session.get('session_id')
                                               ,this.project.session_id,this.project.projecttitle,this.project.state,"Siren_Project");
           // FirebaseService.INSERT_alert_siren_project(this.project.session_id, this.project, this.userdata)
         }
         this.project.reportUserList.push(upperUser);
         FirebaseService.UPDATE_projectReportUserList(this.project_id,this.project.reportUserList);
       } else {
         this.showNotification('foo-css','error','프로젝트 신고 오류','이미 신고한 이력이 있는 프로젝트입니다.')
       }
       this.reportSelect = "";
       this.reportText = "";
       this.reportDesc = "";
     },
     submitCommentReport(reportCommentSelect,reportCommentText,reportCommentDesc, comments, index) {
       // console.log(this.comments[index].reportUserList)
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
       } else {
         this.showNotification('foo-css','error','댓글 신고 오류','이미 신고한 이력이 있는 댓글입니다.')
       }
       this.reportCommentSelect = "";
       this.reportCommentText = "";
       this.reportCommentDesc = "";
     },
    async bindData(){
      this.$loading(true)
      this.project = await FirebaseService.SELECT_ProjectsByPcode(this.project_id);
      this.likeit = this.project.likeit
      this.$loading(false)
      this.userdata = await FirebaseService.SELECT_Userdata(this.user)
    },
    // seulgi function
    async INSERT_Comment(real_taglist, comment){
      if (this.user) {
        var listtext = ''
        for (var j in real_taglist) {
          listtext += `@${real_taglist[j]} `
        }
        this.projectData = await FirebaseService.SELECT_Project(this.project_id);
        var Json = new Object();
        Json.Comment = listtext + this.comment;
        Json.User = this.user;
        Json.like = [];
        Json.unlike = [];
        Json.reportUserList = [];
        Json.state = 0;
        // INSERT_Comment : 프로젝트의 댓글들에 댓글 추가.
        FirebaseService.INSERT_Comment(Json, this.projectData, this.project_id);

        if (real_taglist.length) {
          Json.url = '/project/' + this.project_id
          Json.session_id = this.user;
          for (var i in real_taglist) {
            // INSERT_alert_Comment  : 댓글을 달았을 때, 태그가 존재하면 해당 사람한테 alert 생기게함.
            FirebaseService.INSERT_alert_Comment(real_taglist[i], Json, this.projectData);
          }
        }
        // 비동기적으로 댓글 추가
        const newcommnet = {
        User : this.user,
        Comment : listtext + this.comment,
        like : [],
        unlike : [],
        state:0,
        };
        this.comments.push(newcommnet)
      } else {
        // 로그인 안했으면 안했다고 알려줘야지 헤헤
        alert('너 로그인안했다. 댓글못쓴다~')
      }
      this.comment = ''
      this.real_taglist = []
      this.tmp_taglist = []
    },
    async get_comments() {
      this.comments = await FirebaseService.SELECT_Comments(this.project_id)
    },
    goBackpage() {
      this.$emit('goBackpage');
    },
    DELETE_comment(comments, comment_index) {
      FirebaseService.DELETE_comment(this.pcode, comments, comment_index)
    },
    UPDATE_comment(comments, index) {
      var before = document.querySelector(`.before_${index}`)
      var after = document.querySelector(`.after_${index}`)
      var aftertext = document.querySelector(`.aftertext_${index}`)
      aftertext.value = comments[index].Comment
      before.style.display = 'none';
      after.style.display = 'block';
      this.update_commenttext = comments[index].Comment;
    },
    cancel(comments, index) {
      var before = document.querySelector(`.before_${index}`)
      var after = document.querySelector(`.after_${index}`)
      before.style.display = 'block';
      after.style.display = 'none';
    },
    change_comment(comments, index, update_commenttext) {
      FirebaseService.UPDATE_comment(this.pcode, comments, index, update_commenttext)
      var before = document.querySelector(`.before_${index}`)
      var after = document.querySelector(`.after_${index}`)
      before.style.display = 'block';
      after.style.display = 'none';
    },
    async like_project() {
      if (this.user) {
        var result = await FirebaseService.like_project(this.user, this.pcode, this.project.likeit)
        var userdata = await FirebaseService.SELECT_Userdata(this.user)
        var heart = document.querySelector('#likecheck')
        // console.log()
        if (userdata[0].likeitProject.includes(this.project_id)) {
          heart.classList.remove('fa')
          heart.classList.add('far')
        } else {
          heart.classList.remove('far')
          heart.classList.add('fa')
        }
      }
    },
    async like_check() {
      // 프로젝트 자체를 내가 좋아요 눌렀는지 체크
      var userdata = await FirebaseService.SELECT_Userdata(this.user)
      var heart = document.querySelector('#likecheck')

      if (userdata[0].likeitProject.includes(this.project_id)) {
        heart.classList.remove('far')
        heart.classList.add('fa')
      } else {
        heart.classList.remove('fa')
        heart.classList.add('far')
      }

      // 각 댓글들을 내가 좋아요 눌렀는지 체크
      for (var comment in this.comments) {
        if (this.comments[comment].like.includes(this.user)) {
          var heart2 = document.querySelector(`#commentlike_${comment}`)
          heart2.classList.remove('far')
          heart2.classList.add('fa')
        } else {
          var heart2 = document.querySelector(`#commentlike_${comment}`)
          heart2.classList.remove('fa')
          heart2.classList.add('far')
        }
      }
      for (var comment in this.comments) {
        if (this.comments[comment].unlike.includes(this.user)) {
          var heart3 = document.querySelector(`#commentunlike_${comment}`)
          heart3.classList.remove('far')
          heart3.classList.add('fa')
        } else {
          var heart3 = document.querySelector(`#commentunlike_${comment}`)
          heart3.classList.remove('fa')
          heart3.classList.add('far')
        }

      }
    },
    async like_comment(com, index) {
      if (this.user) {
        // com 은 내용 , index 는 순서
        var result = await FirebaseService.like_comment(this.user, this.pcode, this.comments, com.like, index)
        var heart2 = document.querySelector(`#commentlike_${index}`)
        if (result[index].like.includes(this.user)) {
          // 댓글 남긴 사람들 중에서 내가 있다는 뜻.
          heart2.classList.remove('far')
          heart2.classList.add('fa')
        } else {
          heart2.classList.remove('fa')
          heart2.classList.add('far')
        }
      }
    },
    async unlike_comment(com, index) {
      if (this.user) {
        // com 은 내용 , index 는 순서
        var result = await FirebaseService.unlike_comment(this.user, this.pcode, this.comments, com.like, index)
        var heart3 = document.querySelector(`#commentunlike_${index}`)
        if (result[index].unlike.includes(this.user)) {
          // 댓글 남긴 사람들 중에서 내가 있다는 뜻.
          heart3.classList.remove('far')
          heart3.classList.add('fa')
        } else {
          heart3.classList.remove('fa')
          heart3.classList.add('far')
        }
      }
    },
    async select_user(nickname) {
      this.tmp_taglist=[]
      if (nickname) {
      // answers 는 @ 이후로 붙은 문자에 대한 nickname을 순으로 4개 data를 묶어줌.
      var answers = await FirebaseService.SELECT_Usersdata(nickname)
      answers.docs.map(answer => {
        if (answer.data().nickname.indexOf(nickname)===0) {
          if (!this.tmp_taglist.includes(answer.data().nickname)) {
          this.tmp_taglist.push(answer.data().nickname)
          }
        }
      })
      }
    },
    insert_taglist(nickname) {
      if (!this.real_taglist.includes(nickname)) {
        this.real_taglist.push(nickname)
      var index = this.comment.indexOf(nickname)
      var leng = nickname.length
      this.comment = ''
      this.tmp_taglist = []
      }
    },
    delete_taglist(nickname) {
      var index = this.real_taglist.indexOf(nickname)
      this.real_taglist.splice(index, 1)
    },
    seecomment(index) {
      if (confirm('블라인드 처리된 댓글을 보시겠습니까?')) {
        var blindtext = document.querySelector(`.blind_${index}`)
        blindtext.style.display = 'block';
      }
    }
  },
  watch : {
    comment : function() {
      if (this.comment[0]==='@') {
        if (this.comment.split(' ').length ===1) {
          this.select_user(this.comment.substr(1))
        }
      }
    }
  }
};
</script>

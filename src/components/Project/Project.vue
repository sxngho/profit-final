<template>
  <v-container>
    <v-btn @click="goBackpage()" text outlined style="margin-bottom:1%"> 뒤로가기 </v-btn>
    <v-divider/>

    <v-layout row wrap>
      <v-toolbar-title class="font-weight-medium" style="padding-left:10px;">
         <span class="font-weight-bold title">{{project.projecttitle}} </span>
         <span class="font-weight-thin font-italic subheading">{{project.session_id}}</span>
         <v-flex class="caption">
           {{ project.projectdescription }}
         </v-flex>
       </v-toolbar-title>

       <v-btn text color="yellow" @click="submitObjection()" v-if="this.$route.params.id==this.$store.getters.getSession && project.state > 0">
         이의제기
       </v-btn>

      <v-spacer/>
      <div>
        <v-badge color="#E74C3C" overlap>
          <template slot="badge"> {{likeit.length}} </template>
          <v-btn text icon color="pink">
            <!-- 이미 좋아요 눌렀다면 다른 fa 를 보여주는 것도 좋겠다. -->
            <i id="likecheck" class="far fa-heart fa-2x" @click="like_project()"></i>
          </v-btn>
        </v-badge>

        <!-- 신고하기 -->
        <template>
          <v-layout justify-center d-inline>
            <v-dialog v-model="sirendialog" max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn v-if="$store.getters.getSession" text color="primary" dark v-on="on"><i class="fa fa-bell fa-2x" style="color:orange"></i></v-btn>
              </template>

              <v-card>
                <v-card-title class="headline">
                  <span class="headline">신고하기</span>
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
      </div>
    </v-layout>


    <!-- card -->
    <v-layout>
      <v-container>
        <v-layout wrap>
          <!-- Project Main Thumbnail -->
          <v-flex xs12>
            <BigImg v-bind:imgSrc="project.projectimage" />
          </v-flex>

          <!-- detail -->
          <v-flex xs12 sm10 offset-sm1>
              <!-- project description -->
              <v-layout row wrap style="padding: 2vw 0vw;">

              <!--comment -->
                <v-flex xs12>
                  <span class="title"  style="margin-right:5px;">{{project.projecttitle}}</span>

                  <v-chip outlined label small color="purple dark" style="margin-right:5px;">

                    {{ project.projectterm }}

                  </v-chip>
                  <v-chip outlined label small color="purple dark" style="margin-right:5px;">

                    {{ project.projectrank }}

                  </v-chip>
                  <div style="padding:5px 0;">
                    <v-chip v-for="tech in project.projecttech" outlined small color="grey dark" style="margin-right:5px;">
                      {{ tech }}
                    </v-chip>
                  </div>
                  <v-divider/>


                  <p v-html="project.projectcontent" />
                </v-flex>
              </v-layout>

            <!--comment -->
              <v-flex xs12>
                <form  v-if="this.$store.getters.getSession" style="position:relative;">
                  <!-- 언급한 사람, 댓글 입력 필드 -->
                  <div>
                    <span v-if="real_taglist.length >0">언급한 사람 :</span>
                    <v-chip v-for="nickname in real_taglist"  @click="delete_taglist(nickname)" color="#2980B9" class="white--text" style="margin:0 2px;" small>
                      <span><i class="fa fa-user-circle"/> {{nickname}}</span>
                    </v-chip>
                    <v-flex v-if="this.$store.getters.getLevel==2">
                      <v-text-field
                        style="width:100%;"
                        placeholder="댓글을 입력해주세요"
                        v-model="comment"
                        v-on:keyup.enter="INSERT_Comment(real_taglist, comment)">
                          <template v-slot:append-outer>
                            <v-btn text outlined @click="INSERT_Comment(real_taglist, comment)">
                              등록
                              </v-btn>
                          </template>
                        </v-text-field>
                        <input style="width:0%; height:0%"></input>
                      </v-flex>
                  </div>

                  <!-- 태그 검색어 관련 유저 리스트 -->
                  <v-list-item-group v-if="tmp_taglist.length>0" style="position:absolute; z-index:1; background-color:#fff; border:1px solid; padding:10px 3px;">
                    <v-list-item v-for="nickname in tmp_taglist">
                        <v-list-item-title  @click="insert_taglist(nickname)"
                          style="width:500px; padding:3px 0 3px 10px;">
                          <i class="fa fa-user-circle"/> {{nickname}}
                        </v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>


                  </form>

                <!-- comment list -->
                <v-layout row wrap justify-center>
                  <v-flex xs12 v-for="(com, index) in comments">
                    <v-card outlined style="width:100%; padding:10px 25px; margin:2px 0;">
                      <div v-bind:class="[`before_${index}`]">
                        <span v-bind:class="[`blinding_${index}`]" v-if="com.state==3" style="color:red;" @click="seecomment(index)">이 댓글은 신고 누적으로 블라인드 처리(클릭으로 보기가능)</span>
                        <span class="overline grey--text"> {{com.User}} </span>
                        <span class="overline grey--text"> | {{com.date}} </span> <br/>
                        <span v-if="com.state < 3" class="subtitle-1"> {{com.Comment}} </span>
                        <span v-bind:class="[`blind_${index}`]" class="subtitle-1" style="display:none;"> {{com.Comment}} </span>

                        <!-- action btn -->
                        <v-layout>
                          <v-spacer/>
                          <div style="display:inline;" class="caption">
                              <i v-bind:id="[`commentlike_${index}`]" class="far fa-heart" style="color:red; cursor:pointer;" @click="like_comment(com, index)"/>
                              <span class="caption">{{com.like.length}}</span>

                              <i v-bind:id="[`commentunlike_${index}`]" class="far fa-heart" style="cursor:pointer;" @click="unlike_comment(com, index)"/>
                              <span class="caption">{{com.unlike.length}}</span>

                              <v-icon class="fa fa-wrench" color="#8390b4" style="margin-right:2px;" v-if="com.User==$store.getters.getSession" @click="UPDATE_comment(comments, index)"/>
                              <v-icon class="fa fa-trash" color="#777688"  style="margin-right:2px;" v-if="com.User==$store.getters.getSession" @click="DELETE_comment(comments, index)"/>
                              <Comments
                                :com="com"
                                :project_id="project_id"
                                :project="project"
                                :index="index"
                                :comments="comments"
                              />
                          </div>
                        </v-layout>
                      </div>

                      <div v-bind:class="[`after_${index}`]" style="display:none; width:100%; margin:10px; padding:10px; ">
                        <input v-bind:class="[`aftertext_${index}`]" style="display:inline-block; width:100%; border: 1px solid #ff0000;" v-model="update_commenttext"><br>
                        <v-btn @click="change_comment(comments, index, update_commenttext)">수정</v-btn>
                        <v-btn @click="cancel(comments, index)">취소</v-btn>
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>

              </v-flex>
          </v-flex>

      </v-layout>
    </v-container>
  </v-layout>

</v-container>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import BigImg from "../Common/BigImg";
import Comments from "./Comments";


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
    Comments,
  },
  created(){
    this.user = this.$session.get('session_id')
    this.$store.commit('setSession', this.user)
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
         this.$swal("프로젝트 신고 성공!", "성공적으로 신고내용이 접수되었습니다.", "success");
       } else {
         this.$swal("프로젝트 신고 오류!", "이미 신고한 이력이 있는 프로젝트입니다.", "error");
       }
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
      if( comment == "" ) {
        this.$swal('실패!','댓글내용을 입력해주세요.','error');
      }
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
        var date = new Date();
        Json.date = (date.getFullYear()-2000) + "." + (date.getMonth()+1) + "."  + date.getDate() + "." + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
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
        reportUserList:[],
        date: (date.getFullYear()-2000) + "." + (date.getMonth()+1) + "."  + date.getDate() + "." + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
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
      if (this.user && this.$store.getters.getLevel==2) {
        var result = await FirebaseService.like_project(this.user, this.pcode, this.project.likeit, this.project.likeitcount)
        // console.log(this.project.likeitcount, 'result')
        var userdata = await FirebaseService.SELECT_Userdata(this.user)
        var heart = document.querySelector('#likecheck')
        // console.log()

        if (userdata.length!=0) {
          if (userdata[0].likeitProject.includes(this.project_id)) {
            heart.classList.remove('fa')
            heart.classList.add('far')
          } else {
            heart.classList.remove('far')
            heart.classList.add('fa')
          }
        }
      }
    },
    async like_check() {
      // 프로젝트 자체를 내가 좋아요 눌렀는지 체크
      if (this.user) {
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

      this.$swal({
         title: '블라인드 댓글?',
         text: "블라인드 처리된 댓글을 보시겠습니까?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '보기',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           var blindtext = document.querySelector(`.blind_${index}`)
           blindtext.style.display = 'block';

           var blindtext2 = document.querySelector(`.blinding_${index}`)
           blindtext2.style.display = 'none';
           // "[`blinding_${index}`]"
           // this.$swal('Deleted!','프로젝트 삭제가 완료되었습니다.','success')
           // this.$emit('delete', project_id, index)
           // FirebaseService.DELETE_project(project_id)
           // this.reload_userskill(this.login)
         }
       })

      //
      // if (confirm('블라인드 처리된 댓글을 보시겠습니까?')) {
      //   var blindtext = document.querySelector(`.blind_${index}`)
      //   blindtext.style.display = 'block';
      // }

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

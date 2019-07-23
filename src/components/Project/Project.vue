<template>
  <div>
    <v-layout>
      <!-- profile img -->
      <v-btn @click="goBackpage()" flat outline> 뒤로가기 </v-btn>
      <v-toolbar-title class="font-weight-medium">

         <span class="font-weight-bold">{{project.projecttitle}} </span>

         <span class="font-weight-thin font-italic subheading">{{project.developer}}</span>
         <v-flex class="caption">
           {{ project.projectdescription }}
         </v-flex>
       </v-toolbar-title>
      <v-spacer/>
      <v-btn flat icon color="pink">
        <i class="fa fa-heart fa-2x"></i>
      </v-btn>
      <v-btn flat icon color="yellow">
        <i class="fa fa-star fa-2x"></i>
      </v-btn>
    </v-layout>

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
                  <v-flex class="d-inline caption tag" round outline>{{ project.projectterm }}</v-flex>
                  <v-flex class="d-inline caption tag" round outline>{{ project.projectrank }}</v-flex>
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
                <!-- comment input -->

                <form>
                  <!-- <v-text-field label="Comment" required @input="$v.name.$touch()" @blur="$v.name.$touch()" v-model="comment"></v-text-field> -->
                  <v-text-field label="Comment" v-model="comment"></v-text-field>

                  <v-btn @click="INSERT_Comment(comment)">submit</v-btn>
                  <v-btn @click="InfoProject()">파일위치(관리자용)</v-btn>
                </form>

                <!-- comment sort -->
                <v-flex>
                  <span>sort</span>
                  <v-btn flat depressed small>oldest</v-btn>
                  <v-btn flat depressed small>newest</v-btn>
                  <v-btn flat depressed small>liked</v-btn>
                </v-flex>

                <!-- comment list -->
                <v-list>
                  <v-list-tile v-for="(com, index) in comments" style="border-bottom: 1px solid #9E6E2E; margin:5px; padding:5px;">

                    <v-list-tile-content>
                      <v-list-tile-title v-html="com.Comment"></v-list-tile-title>
                      <v-list-tile-title v-html="com.User"></v-list-tile-title>

                    </v-list-tile-content>

                    <v-list-tile-action>
                      <div style='display:inline-block;'>

                        <i class="fa fa-heart" style="color:red" @click="likeit(com, index)"></i>
                        &nbsp;
                        <i class="fa fa-heart" @click="unlikeit(com, index)"></i>
                        &nbsp;
                        <img v-if="com.User==user" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHUSURBVFiF7Za/SxthGMc/76sFOU2q0aFWLf0fusmN/hh0ClkydFHpUMGpVOiQ2uIiKoj4o0J1CaVL7Fp0cTkoFVqE/gelxslEY0jDVe/tEDw8zUXvuFNEn+2e5+75fu75ce8JPNrQxIyqFV+beCW85JNeAYK2er8Pnn/TyyrjZjdegQv9Gl/6OICSK0BHwFp/EOrF1Mvhr2edFyug5IcQxAE6lRIr553VWtAZgjgAArquAnCtdg/g+tXaG0v42ms3a5/PVNW68QrcA9xCAFHjtK0VCwRACNrezNH6ehoZeegIaXofj2Y/0/BMDxEAUP9MHnQ8JTaasiE0vZ9oYgSkBNMMEUAp8suTHO/9pr79CbHRFI29caKJYQAKmVXKv7ZDBACso0NyC+84zlYgIoPJivj6GiVjw2s6f1tgFQv8/WnY1yeHOco73/yk8geg6f1EBpKgFCcH+9Q1tzpmIlQATe9z9Hx/ZtwxE7IpGiKAlETjQ7Z4ydiozMTiextC6+7xlNLbX7FlcfBpAUzTMe2ng6l191D6vhUiAFD+YVT1W8UCxc0vXtPdxrPgLgFkgxIRsOsdQJAOCsBCueZy3YJci0jF8goUz4HHPrWzCNL5FvnW7Yb/F8CPuY2PJ7UAAAAASUVORK5CYII=" alt="Smiley" style="cursor: pointer; height:20px; display:inline-block;" @click="DELETE_comment(pcode, comments, index)">


                      </div>
                    </v-list-tile-action>

                  </v-list-tile>
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
    // console.log(this.user, '나옴??')
    this.bindData();
    this.get_comments();
  },
  methods: {
    async bindData(){
      this.$loading(true)
      this.project = await FirebaseService.SELECT_ProjectsByPcode(this.project_id);
      // console.log(this.project);
      this.$loading(false)
    },
    InfoProject(){
      alert("이 파일의 위치는 components/project/project.vue");
    },
    // seulgi function
    async INSERT_Comment(comment){
      if (this.user) {
        this.projectData = await FirebaseService.SELECT_Project(this.project_id);
        var Json = new Object();
        Json.Comment = this.comment;
        Json.User = this.user;
        Json.likecount = 0;
        Json.unlikecount = 0;
        Json.like = [];
        Json.unlike = [];
        FirebaseService.INSERT_Comment(Json, this.projectData, this.project_id);
        const newcommnet = {
        User : this.user,
        Comment : this.comment,
        like : [],
        unlike : [],
        likecount : 0,
        unlikecount : 0,
        };
        this.comments.push(newcommnet)
      } else {
        // 로그인 안했으면 안했다고 알려줘야지 헤헤
        alert('너 로그인안했다. 댓글못쓴다~')
      }
      this.comment = ''
    },
    async get_comments() {
      this.comments = await FirebaseService.SELECT_Comments(this.project_id)
    },
    goBackpage() {
      this.$emit('goBackpage');
    },
    DELETE_comment(project_id, comments, comment_index) {
      FirebaseService.DELETE_comment(project_id, comments, comment_index)
    },

    likeit(com, index) {
      // if (com.like.includes(this.user)) {
      //   console.log('이미 눌렀구나???')
      //   var like_index = com.like.indexOf(this.user)
      //   com.like.splice(like_index, 1)
      //   com.likecount -= 1
      //   // console.log(like_index)
      //   // com.likecount -= 1
      // } else {
      //   console.log('너 좋아요 안눌렀구나?')
      //   com.like.push(this.user)
      //   com.likecount += 1
      // }
      // FirebaseService.UPDATE_Comment(this.comments, com, index)
    }
  },
};
</script>

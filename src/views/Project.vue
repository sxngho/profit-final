<template>
  <div>
    <v-toolbar>
      <!-- profile img -->
      <v-btn icon to="/"/>
      <v-toolbar-title class="font-weight-medium">
         <span class="font-weight-bold">{{project.projecttitle}}</span>
         <span class="font-weight-thin font-italic subheading">{{project.developer}}</span>
         <v-flex class="caption">
           {{ project.projectdescription }}
         </v-flex>
       </v-toolbar-title>
      <v-spacer/>

      <v-btn flat icon color="gray" @click="likeit()" v-if="!this.islikeit">
        <i class="fa fa-heart fa-2x"></i>
      </v-btn>
      <v-btn flat icon color="pink" @click="unlikeit()" v-if="this.islikeit">
        <i class="fa fa-heart fa-2x"></i>
      </v-btn>

      <v-btn flat icon color="yellow">
        <i class="fa fa-star fa-2x"></i>
      </v-btn>
    </v-toolbar>

    <!-- card -->
    <v-layout>
      <v-container grid-list-md>
        <v-layout wrap>
          <!-- Project Main Thumbnail -->
          <v-flex xs12 sm6>
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

                        <!-- <i class="fa fa-heart" @click="likeit(pcode, index)"></i> -->
                        <i class="fa fa-heart" @click="likeit(pcode, index)"></i>

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
import BigImg from "../components/Common/BigImg";

export default {
  name: "Project",
  data() {
    return {
      project_id: "",
      project: "",
      user:"",
      comments:[],
      comment:"",
      islikeit:false,
    }
  },
  components: {
    BigImg,
    pcode : {type:String, default:""}
  },
  created(){
    this.user = this.$session.get('session_id')
    this.project_id = this.$route.params.pcode;
    this.bindData();
    this.$store.state.no_header = true;
    this.isLikeItCheck();
    this.get_comments();
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
    async bindData(){
      this.$loading(true)
      this.project = await FirebaseService.SELECT_ProjectsByPcode(this.$route.params.pcode);
      this.$loading(false)
    },
    InfoProject(){
      // 이게 새 창에서 뜨는 것
      alert("이 파일의 위치는 views/project.vue");
    },
    async isLikeItCheck(){
      var targetProject = await FirebaseService.SELECT_Project(this.project_id);
      var tmp = targetProject.likeit.includes(this.$session.get('session_id'));
      this.islikeit=tmp;
      console.log("like it! :: ", this.islikeit);
    },
    async likeit(){
      var targetProject = await FirebaseService.SELECT_Project(this.project_id);
      var userlikeitlist = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      await FirebaseService.likeit(
        this.project_id,
        this.$session.get('session_id'),
        targetProject.likeit,
        userlikeitlist[0].likeitProject
      );
      this.isLikeItCheck();
    },
    async unlikeit(){
      var targetProject = await FirebaseService.SELECT_Project(this.project_id);
      var userlikeitlist = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));

      await FirebaseService.unlikeit(
        this.project_id,
        this.$session.get('session_id'),
        targetProject.likeit,
        userlikeitlist[0].likeitProject
      );
      this.isLikeItCheck();
    },
    // seulgi function
    async INSERT_Comment(comment){
      if (this.user) {
        this.projectData = await FirebaseService.SELECT_Project(this.project_id);
        var Json = new Object();
        Json.Comment = this.comment;
        Json.User = this.user;
        FirebaseService.INSERT_Comment(Json, this.projectData, this.project_id);
        const newcommnet = {
        User : this.user,
        Comment : this.comment,
        like : 0,
        unlike : 0,
        };
        console.log('여기서 생성되냐??')
        this.comments.push(newcommnet)
      } else {
        // 로그인 안했으면 안했다고 알려줘야지 헤헤
          this.showNotification('foo-css','error','댓글 작성 오류','로그인이 필요한 기능입니다.')
      }
      this.comment = ''
    },
    async get_comments() {
      this.comments = await FirebaseService.SELECT_Comments(this.project_id)
    },
    DELETE_comment(project_id, comments, comment_index) {
      FirebaseService.DELETE_comment(project_id, comments, comment_index)
    }
  }
}
</script>

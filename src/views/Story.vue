<template>
  <div>
    <!-- Studio -->
    <v-layout row wrap v-if="this.$route.params.id==this.$store.getters.getSession">
      <v-flex hidden-sm-and-down>
        <Slide right width="600" disableOutsideClick >
          <v-container>
            <Studio/>
          </v-container>
        </Slide>
      </v-flex>
    </v-layout>

    <div v-if="loading" style="position:relative; background:white; height:1000px; z-index:11"/>

    <!-- Banner -->
    <div>

      <!-- User Banner Img -->
      <v-layout row wrap style="margin:0px 10px;">
        <v-layout row wrap v-bind:style="{ 'backgroundImage': 'url(' + storyBanner   + ')' }" style="background-size:100%; margin-bottom: 95px;"  @mouseover="showUpImgBanner=true" @mouseleave="showUpImgBanner=false">

            <div v-show="showUpImgBanner && this.$route.params.id==this.$store.getters.getSession"
              style="position: absolute; margin:0;"
              @click="setBanner()">
              <p style="background: #ffffff91;border-radius:0 20px 20px 0; cursor:pointer; margin:0px; padding: 5px 45px 5px 20px;">
                배경화면 수정하기
              </p>
              <input type="file" id="Banner" style="width:100%; display:none" @change="onFileChangeBanner" />
            </div>

            <div @click="removeImageBanner()" v-show="showUpImgBanner && this.$route.params.id==this.$store.getters.getSession && storyBanner" style="z-index:2; right:0; position: absolute;" >
              <p style="background: #ff000039; cursor:pointer; margin:0px; padding: 5px 20px 5px 45px; border-radius: 20px 0 0 20px;">배경화면 삭제</p>
            </div>

          <v-flex xs12 style="height:220px;">
          </v-flex>
        </v-layout>
      </v-layout>

      <!-- ProfileImg -->
      <v-layout row wrap>
        <v-layout wrap align-center justify-space-around style="position:absolute; top: 148px; right: 50%; left: 50%; z-index:10">
          <div v-if="!image" class="text-center" justify-center style="position:relative" @mouseover="showUpImgBtn=true" @mouseleave="showUpImgBtn=false" >
            <div @click="setFile()" v-show="showUpImgBtn" style="position: absolute; top: 54px; z-index: 2" >
              <p class="text-center" style="background: #ffffff91;padding: 10px 5px; cursor:pointer;" >사진을 등록하세요!</p>
            </div>

            <v-avatar size="150" class="grey lighten-2" @click="setFile()" style="cursor:pointer;">
              <img src="https://i.imgur.com/aTI4OeZ.png?1" />
            </v-avatar>
            <input type="file" name="file" id="file" style="width:100%; display:none" @change="onFileChange" />
          </div>
          <div
            v-else
            style="position:relative;"
            @mouseover="showRmImgBtn=true"
            @mouseleave="showRmImgBtn=false"
          >
            <div
              @click="removeImage()"
              v-show="showRmImgBtn"
              style="z-index:2; right:0; position: absolute;"
              v-if="this.$route.params.id==this.$store.getters.getSession"
            >
              <img
                src="../assets/icon_set/delete.png"
                alt="delimg"
                style="cursor:pointer;width:25px;height:25px;"
              />
            </div>
            <v-avatar size="150" class="grey lighten-2">
              <img :src="image" />
            </v-avatar>
          </div>
        </v-layout>
      </v-layout>

      <!-- Intro -->
      <v-layout row wrap align-center justify-space-around>
        <!-- UserName & follow unfollow -->
        <span class="text-center title" style="width:100%">
          {{user.userName}}
          <v-flex fab text outlined small v-if="this.$store.getters.getSession && this.$route.params.id!=this.$store.getters.getSession && !isFollow" @click="follow()">
            <img
              src="../assets/icon_set/add-user.png"
              alt="follow"
              style="cursor:pointer; width:25px;height:25px;"
            />
          </v-flex>

          <v-flex fab text outlined small v-if="this.$store.getters.getSession && this.$route.params.id!=this.$store.getters.getSession && isFollow" @click="unfollow()">
            <img
              src="../assets/icon_set/followers2.png"
              alt="unfollow"
              style="cursor:pointer; width:25px;height:25px;"
            />
          </v-flex>
        </span>

        <!-- 유저 한줄소개 인트로 -->
        <span class="subheading grey--text text-center" style="width:100%">
          <span v-if="user.userIntro != ''">{{user.userIntro}}</span>
          <span v-else class="caption">한 줄 소개를 등록해주세요!</span>
          <IntroEditor v-on:sendIntro="receiveIntro" :introinput="user.userIntro" v-if="this.$route.params.id==this.$store.getters.getSession" />
        </span>
      </v-layout>

      <!-- follower 명시 -->
      <v-layout row wrap align-center justify-space-around style="margin:20px 0;">
        <div style="display:inline-block;">
          <button @click="followerTest">Follower : {{user.followerlist.length}}</button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <button @click="followingTest">Following : {{user.followinglist.length}}</button>
        </div>
      </v-layout>
    </div>

    <!-- contents -->
    <v-container>
      <v-layout>
        <v-flex xs12 style="border-top:1px #cecece solid;">
          <FollowerList v-show="this.viewFollower || this.viewFollowing"></FollowerList>

          <v-layout v-if="!this.viewFollower && !this.viewFollowing" row wrap>
            <!-- leftSide -->
            <v-flex xs12 sm4 md3>
              <LeftSide xs12 sm4 md3 v-on:toStory="fromLeftSide" v-on:toStoryFilter="toFilterFunction" />
            </v-flex>

            <v-flex xs12 sm8 md9>
              <!-- btn Toolbar -->
              <v-container>
                <v-layout wrap style="padding:0px 5px;">
                  <div @click="changeComponent()" v-if="this.$store.getters.getSession==this.$route.params.id && !statedetail && !stateupdate" class="d-inline" style="display:inline;">
                    <div id="toggletext">
                      <div v-if="!stateAdd" style="cursor:pointer;background: rgb(117, 199, 145); padding: 5px 20px; border-radius: 20px; color: white;margin:3px;">
                        프로젝트 생성하기
                      </div>

                      <img src="../assets/icon_set/back.png" alt="backtoList" style="cursor:pointer;width:25px;height:25px;" v-if="stateAdd" />
                    </div>
                  </div>
                  <v-spacer/>
                  <div style="display: inline;">
                    <div style="display:inline!important;"
                      v-if="!stateAdd && !stateupdate && !statedetail" >
                      <v-btn-toggle small>
                        <v-btn small text @click="ChangeLayout(1)" id="toggletext">
                          <i class="fa fa-th-large fa-1x" />
                        </v-btn>
                        <v-btn small text @click="ChangeLayout(2)" id="toggletext">
                          <i class="fa fa-th-list fa-1x" />
                        </v-btn>
                        <v-btn small text @click="ChangeLayout(3)" id="toggletext">
                          <i class="fa fa-bars fa-1x" />
                        </v-btn>
                      </v-btn-toggle>
                    </div>
                    <div style="display:inline!important;" v-if="!stateAdd ">
                      <toggle-button
                        d-inline
                        v-if="!stateAdd && !stateupdate && !statedetail"
                        :width="50"
                        v-model="toggleView"
                        :sync="true"
                        :labels="{checked: '새창', unchecked: ''}"
                      />
                    </div>
                  </div>
                </v-layout>
              </v-container>

              <!-- List Option -->

              <v-layout wrap>
                <ProjectList
                  v-if="!stateAdd && !statedetail && !stateupdate"
                  v-on:toStory="cc"
                  v-on:goup="update_project"
                  v-on:toStoryUpdate="UPDATE_Project"
                  :layout="layout"
                  :toFilter="Filter" v-on:toStoryList="resetFilter"/>
                <ProjectEditor v-if="stateAdd && !statedetail && !stateupdate" v-on:insert_success="gbp4" />
                <Project v-if="statedetail" :pcode="pcode" v-on:goBackpage="gbp" />
                <ProjectEditor v-if="stateupdate" :project_id="pcode2" v-on:goBackpage="gbp2" v-on:update_success="gbp3" />
                <!-- <ProjectUpdator v-if="stateupdate" :project_id="pcode2" v-on:goBackpage="gbp2" v-on:update_success="gbp3" /> -->
                <!-- <v-btn @click="check_stateupdate(state)"></v-btn> -->
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

import FollowerList from "../components/Followers/FollowerList";
import LeftSide from "../components/UserInfoPage/LeftSide";
import ProjectList from "../components/UserInfoPage/ProjectList";
import ProjectEditor from "../components/UserInfoPage/ProjectEditor";
import Project from "../components/Project/Project";
import ProjectUpdator from "../components/UserInfoPage/ProjectUpdator";
import Studio from "../components/UserInfoPage/Studio";
import { mapState } from "vuex";
import { Slide } from "vue-burger-menu";
import IntroEditor from "../components/UserInfoPage/InputForm/IntroEditor";

export default {
  name: "Story",
  data() {
    return {
      showUpImgBtn:false,
      showRmImgBtn:false,
      showUpImgBanner:false, // 슬기가 잠시 만듦
      stateAdd: false,
      userurl: "",
      toggleView: false,
      pcode: "",
      statedetail: false,
      stateupdate: false,
      pcode2: "",
      loading: false,
      layout: "1",
      viewFollower: false,
      viewFollowing: false,
      showAddProject: false,
      Filter : "",
      userid:"",
      storyBanner : "",
      image:"",
      user:{
        userName:"",
        userIntro:"",
        followerlist:[],
        followinglist:[],
      },
      isFollow: false,
      followerNumber: "",
      followingNumber: ""
    };
  },
  created() {
    // 컴포넌트 생성시 데이터를 패치한다
    this.fetchData();
    this.setStoryBanner();
    this.isFollowCheck();
    this.$store.commit('setSession', this.$session.get('session_id'))
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
    async fetchData() {
      this.userid = this.$session.get('session_id')
      this.$store.commit('setSession', this.$session.get("session_id"))
      if (this.$session.get("session_id") !== "") {
        this.toggleView = await FirebaseService.SELECT_userAddon(
          this.$session.get("session_id")
        );
      }
      // var userdata = await FirebaseService.SELECT_Userdata(this.$route.params.id).userIntro;
      // this.userIntro = userdata.userIntro;
      this.user = await FirebaseService.SELECT_Userdata(this.$route.params.id);
      this.user = this.user[0];
    },
    updateToggle() {
      if (this.$session.get("session_id") !== "") {
        FirebaseService.UPDATE_userAddon(
          this.$session.get("session_id"),
          this.toggleView
        );
      }
      if (this.toggleView) {
        this.showNotification(
          "foo-css",
          "success",
          "보기 모드 전환",
          "새 창에서 보기 모드로 설정되었습니다."
        );
      } else {
        this.showNotification(
          "foo-css",
          "success",
          "보기 모드 전환",
          "현재 창에서 보기 모드로 설정되었습니다."
        );
      }
      this.$store.commit("convertPVT", this.toggleView);
    },
    changeComponent() {
      var v_button = document.getElementById("toggletext");
      this.stateAdd = !this.stateAdd;
      this.showAddProject = false;
    },
    cc(pcode) {
      this.pcode = pcode;
      this.statedetail = true;
      this.loading = false;
      // this.stateAdd = false;
    },
    gbp() {
      this.statedetail = false;
    },
    gbp2() {
      this.stateupdate = false;
    },
    gbp3() {
      this.stateupdate = false;
    },
    gbp4() {
      this.stateAdd = false;
    },
    update_project(pcode2) {
      this.pcode2 = pcode2;
      this.stateupdate = true;
    },
    fromLeftSide(load) {
      this.loading = load;
      if (this.loading == true) {
        this.$loading(true);
      } else {
        this.$loading(false);
      }
    },
    ChangeLayout(number) {
      this.layout = number.toString();
    },
    UPDATE_Project(pcode) {
      this.pcode2 = pcode;
      this.stateupdate = true;
    },
    resetFilter() {
      this.Filter = "";
    },
    toFilterFunction(tech) {
      this.Filter = tech;
    },

    //its hyoyas time!
    async setStoryBanner() {
      // this.storyBanner = url;
      // TODO 이거 지금 라우터에서 자기 프사랑 배너 받아오는데, 동적라우터에서 아이디 추출해서 해야함 이따하자
      var userImg = await FirebaseService.SELECT_UserImage(
        this.$route.params.id
      );
      console.log("유저의 이미지!", userImg);
      //디비에서 받아온 유저의 배너이미지와, 프로필 사진 이미지를 붙인다
      if (userImg.banner) {
        this.storyBanner = userImg.banner;
      } else {
        this.storyBanner = "https://i.imgur.com/KnVfJVQ.png"
      }
      this.image = userImg.profileImg;
    },

    removeImage() {
      this.$swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제한 이미지는 되돌릴 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소"
      }).then(result => {
        if (result.value) {
          this.$swal(
            "Deleted!",
            "프로필 이미지 삭제가 완료되었습니다.",
            "success"
          );
          FirebaseService.DELETE_userImage(this.$route.params.id);
          this.image = "";
        }
      });
    },
    removeImageBanner() {
      this.$swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제한 이미지는 되돌릴 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소"
      }).then(result => {
        if (result.value) {
          this.$swal(
            "Deleted!",
            "프로필 이미지 삭제가 완료되었습니다.",
            "success"
          );
          FirebaseService.DELETE_userImageBanner(this.$route.params.id);
          this.storyBanner = "";
        }
      });
    },
    onFileChange(e) {
      // file 세팅
      if (e.target.files[0].type.substr(0, 5) == "image") {
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
            FirebaseService.UPDATE_userImage(success.data.link, this.$route.params.id)
            this.image = success.data.link;
          })
          .catch();
      } else {
        // var image_file = document.querySelector("#inputfile");
        // image_file.value = "";
        this.$swal("이미지 오류!", "이미지 파일만 올려주세요.", "error");
      }
    },
    onFileChangeBanner(e) {
      // file 세팅
      if (e.target.files[0].type.substr(0, 5) == "image") {
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
            FirebaseService.UPDATE_userImageBanner(success.data.link, this.$route.params.id)
            this.storyBanner = success.data.link;
          })
          .catch();
      } else {
        this.$swal("이미지 오류!", "이미지 파일만 올려주세요.", "error");
      }
    },
    setFile() {
      var file = document.querySelector("#file");
      file.click();
    },
    setBanner() {
      var Banner = document.querySelector("#Banner");
      Banner.click();
    },
    receiveIntro(intro) {
      FirebaseService.UPDATE_userIntro(intro, this.$route.params.id);
      this.user.userIntro = intro;
      this.$swal("수정 완료!", "자기소개 수정이 완료되었습니다.", "success");
    },
    async follow() {
      var follower = await FirebaseService.SELECT_Userdata(
        this.$route.params.id
      );
      var following = await FirebaseService.SELECT_Userdata(
        this.$session.get("session_id")
      );
      await FirebaseService.follow(
        this.$route.params.id,
        this.$session.get("session_id"),
        follower[0].followerlist,
        following[0].followinglist
      );
      this.isFollowCheck();

      var Json = new Object();
      Json.session_id = this.$session.get("session_id");
      Json.url = "/story/" + this.$session.get("session_id");
      Json.user = this.$session.get("session_id");
      // console.log(this.$route.params.id) // 내가 하고자 하는 사람
      // console.log(follower) // 그 사람의 정보.

      FirebaseService.INSERT_alert_Follow(
        this.$route.params.id,
        Json,
        follower[0]
      );
    },
    async unfollow() {
      var follower = await FirebaseService.SELECT_Userdata(
        this.$route.params.id
      );
      var following = await FirebaseService.SELECT_Userdata(
        this.$session.get("session_id")
      );
      await FirebaseService.unfollow(
        this.$route.params.id,
        this.$session.get("session_id"),
        follower[0].followerlist,
        following[0].followinglist
      );
      this.isFollowCheck();
    },
    async isFollowCheck() {
      var following = await FirebaseService.SELECT_Userdata(
        this.$route.params.id
      );
      var tmp = following[0].followerlist.includes(
        this.$session.get("session_id")
      );
      this.isFollow = tmp;
    },
    followingTest() {
      this.$store.commit("setFollowingView", true);
      if (this.$store.state.followingView === this.$store.state.followerView) {
        this.$store.commit("setFollowerView", !this.$store.state.followerView);
      }
    },
    followerTest() {
      this.$store.commit("setFollowerView", true);
      if (this.$store.state.followingView === this.$store.state.followerView) {
        this.$store.commit(
          "setFollowingView",
          !this.$store.state.followingView
        );
      }
    }
  },
  components: {
    LeftSide,
    ProjectList,
    ProjectEditor,
    Project,
    ProjectUpdator,
    FollowerList,
    Slide,
    IntroEditor,
    Studio
  },
  computed: mapState(["followerView", "followingView"]), // 뷰엑스 값을 여기서 참조하겠다.
  watch: {
    // 라우터 객체를 감시하고 있다가 fetchData() 함수를 호출한다
    //'$route': 'fetchData'
    toggleView: "updateToggle",

    //값이 변할때마다 할 일들? new / old
    followerView(to, from) {
      this.viewFollower = this.$store.state.followerView;
    },
    followingView(to, from) {
      this.viewFollowing = this.$store.state.followingView;
    }
  }
};
</script>


<!-- 아래 스타일은 절대 scope로 두면 안됩니다!! -->
<style>
  .bm-burger-button {
    position: fixed;
    cursor: pointer;
    left: auto;
    right: -25px!important;
    background: #2C3E50;
    width: 50px;
    height: 85px;
    border-radius: 20px;
    top: 50%;
    z-index: 3;
    color:#2980B9;
  }
  .bm-burger-bars {
    background-color: #373a47;
  }
  .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 50%;
    left: 20px;
    color:#2980B9;
    cursor: pointer;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #2C3E50 ; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
    -ms-overflow-style: none;
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }
  .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
  }
  .studiopop{
    color:#2980B9;
    top:41%!important;
    left:5px;
  }
</style>

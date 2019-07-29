<template>
  <v-container>
    <!-- 좌우여백을 위한 형식 -->
    <v-layout>
      <v-flex xs12>

        <div v-if="loading">
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>

        <v-layout row wrap>
          <v-flex xs12>
            <TopBar />
          </v-flex>
        </v-layout>

        <FollowerList v-show="this.viewFollower || this.viewFollowing"></FollowerList>

        <v-layout v-if="!this.viewFollower && !this.viewFollowing" row wrap>
          <v-flex xs12 sm4 md3>
            <LeftSide xs12 sm4 md3 :isMine="isMine" v-on:toStory="fromLeftSide" v-on:toStoryFilter="toFilterFunction"/>
          </v-flex>

          <v-flex xs12 sm8 md9>
            <v-layout wrap style="position:relative; border-bottom:1px #cecece solid; padding:0px 5px;">
              <div
              @click="changeComponent()"
              v-if="isMine && !statedetail && !stateupdate"
              class="d-inline"
              style="display:inline;">
                <div id="toggletext">
                  <div
                    v-if="!stateAdd"
                    style="cursor:pointer;background: rgb(117, 199, 145); padding: 5px 20px; border-radius: 20px; color: white;margin:3px;"
                  >프로젝트 생성하기</div>
                  <img
                    src="../assets/icon_set/back.png"
                    alt="backtoList"
                    style="cursor:pointer;width:25px;height:25px;"
                    v-if="stateAdd"
                  />
                </div>
              </div>

              <div style="position: absolute; display: inline; right: 5px; top:7px;">
                <div style="display:inline!important; float:right; right:50%;" v-if="!stateAdd ">
                  <toggle-button
                    d-inline
                    v-if="!stateAdd && !stateupdate && !statedetail"
                    :width="50"
                    v-model="toggleView"
                    :sync="true"
                    :labels="{checked: '새창', unchecked: ''}"
                  />
                </div>

                <div style="display:inline!important; float:right; right:50%;" v-if="!stateAdd && !stateupdate && !statedetail">
                  <div class="d-inline" @click="layout1()">
                    <img
                      id="toggletext"
                      src="../assets/icon_set/layout1.png"
                      alt="delimg"
                      style="cursor:pointer;width:25px;height:25px; margin-right:5px;"
                    />
                  </div>
                  <div class="d-inline" @click="layout2()">
                    <img
                      id="toggletext"
                      src="../assets/icon_set/layout2.png"
                      alt="delimg"
                      style="cursor:pointer;width:25px;height:25px;margin-right:5px;"
                    />
                  </div>
                  <div class="d-inline" @click="layout3()">
                    <img
                      id="toggletext"
                      src="../assets/icon_set/layout3.png"
                      alt="delimg"
                      style="cursor:pointer;width:25px;height:25px;margin-right:5px;"
                    />
                  </div>
                </div>
              </div>
            </v-layout>

            <v-layout wrap>
              <ProjectList
                v-if="!stateAdd && !statedetail && !stateupdate"
                v-on:toStory="cc"
                v-on:goup="update_project"
                v-on:toStoryUpdate="UPDATE_Project"
                :toFilter="Filter" v-on:toStoryList="resetFilter"
              />

              <ProjectEditor v-if="stateAdd && !statedetail && !stateupdate" v-on:insert_success="gbp4" />
              <Project v-if="statedetail" :pcode="pcode" v-on:goBackpage="gbp" />
              <ProjectUpdator v-if="stateupdate" :project_id="pcode2" v-on:goBackpage="gbp2" v-on:update_success="gbp3" />
              <!-- <v-btn @click="check_stateupdate(state)"></v-btn> -->
            </v-layout>
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

import FollowerList from "../components/Followers/FollowerList";
import TopBar from "../components/Followers/TopBar";
import LeftSide from "../components/UserInfoPage/LeftSide";
import ProjectList from "../components/UserInfoPage/ProjectList";
import ProjectEditor from "../components/UserInfoPage/ProjectEditor";
import Project from "../components/Project/Project";
import ProjectUpdator from "../components/UserInfoPage/ProjectUpdator";
import { mapState } from "vuex";
export default {
  name: "Story",
  data() {
    return {
      isMine: false,
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
    };
  },
  created() {
    // 컴포넌트 생성시 데이터를 패치한다
    this.fetchData();
    this.isMineCheck();
  },
  methods: {
    isMineCheck() {
      if (this.$route.params.id == this.$session.get("session_id")) {
        this.isMine = true;
      } else {
        this.isMine = false;
      }
    },
    async fetchData() {
      var session = this.$session.get("session_id");
      if (session !== "") {
        this.toggleView = await FirebaseService.SELECT_userAddon(session);
      }
    },
    updateToggle() {
      if (this.$session.get("session_id") !== "") {
        FirebaseService.UPDATE_userAddon(
          this.$session.get("session_id"),
          this.toggleView
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
    layout1() {
      this.layout = "1";
    },
    layout2() {
      this.layout = "2";
    },
    layout3() {
      this.layout = "3";
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
  },
  components: {
    TopBar,
    LeftSide,
    ProjectList,
    ProjectEditor,
    Project,
    ProjectUpdator,
    FollowerList
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

<style scoped>
</style>

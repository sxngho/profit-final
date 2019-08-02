<template>
  <div>
    <!-- 회사배너 -->
    <v-layout wrap id="companyBanner">
      <v-flex xs12 sm10 offset-sm1>
        <v-layout style="margin:5vw 0px;">
          <div>
            <!-- <v-avatar size="128">
              <v-img :src="company.company_logo" />
            </v-avatar>-->
            <div
              v-if="!company.company_logo"
              class="text-center"
              justify-center
              style="position:relative"
              @mouseover="showUpImgBtn=true"
              @mouseleave="showUpImgBtn=false"
            >
              <div
                @click="setFile()"
                v-show="showUpImgBtn"
                style="position: absolute; top: 54px; z-index: 2"
              >
                <p
                  class="text-center"
                  style="background: #ffffff91;padding: 10px 5px; cursor:pointer;"
                >사진을 등록하세요!</p>
              </div>
              <v-avatar
                size="150"
                class="grey lighten-2"
                @click="setFile()"
                style="cursor:pointer;"
              >
                <img src="https://i.imgur.com/aTI4OeZ.png?1" />
              </v-avatar>
              <input
                type="file"
                name="file"
                id="file"
                style="width:100%; display:none"
                @change="onFileChange"
              />
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
              >
                <button alt="delimg" style="cursor:pointer;width:25px;height:25px; color:white">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
              <v-avatar size="150" class="grey lighten-2">
                <img :src="company.company_logo" />
              </v-avatar>
            </div>
          </div>
          <div style="margin-left:2vw;">
            <v-layout align-end fill-height class="white--text">
              <div style="background-color:rgba(0, 0, 0, 0.5);">
                <h2>{{company.company_name}}</h2>
                <h3>{{company.industry}}</h3>
              </div>
            </v-layout>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-container>
      <!-- 회사 정보 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>기업정보</v-card-title>
            <v-card-text id="company_detail">
              <v-simple-table>
                <tbody class="text-center">
                  <tr>
                    <th>산업</th>
                    <td v-if="!toggleIndustry" @click="toggleIndustry = true">{{company.industry}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.industry"
                        v-if="toggleIndustry"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>사원수</th>
                    <td v-if="!toggleMount" @click="toggleMount = true">{{company.mount}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.mount"
                        v-if="toggleMount"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>기업구분</th>
                    <td v-if="!toggleComsize" @click="toggleComsize = true">{{company.comsize}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.comsize"
                        v-if="toggleComsize"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td v-if="!toggleHomepage" @click="toggleHomepage = true">{{company.homepage}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.homepage"
                        v-if="toggleHomepage"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td v-if="!toggleAddress" @click="toggleAddress = true">{{company.address}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.address"
                        v-if="toggleAddress"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td
                      v-if="!toggleEstablishedDate"
                      @click="toggleEstablishedDate = true"
                    >{{company.establishedDate}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.establishedDate"
                        v-if="toggleEstablishedDate"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>대표자</th>
                    <td
                      v-if="!toggleRepresent"
                      @click="toggleRepresent = true"
                    >{{company.represent}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.represent"
                        v-if="toggleRepresent"
                        style="text-align:center"
                        @keyup.enter="submit()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td></td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px" />

      <!-- 회사소개 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>회사소개</v-card-title>
            <v-card-text v-if="!toggleDescript" @click="toggleDescript = true">{{company.descript}}</v-card-text>
            <textarea
              v-model="company.descript"
              v-if="toggleDescript"
              @keyup.enter="submit()"
              style="width:1000px; height:150px"
            />
          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px" />

      <!-- 회사공고 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>
              공고
              <router-link to="/recuriteditorpage" style="text-decoration:none">
                <v-btn text outlined small rounded color="success" style="margin-left:1em;">
                  <i class="fa fa-pencil" />공고 추가
                </v-btn>
              </router-link>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-expansion-panels>
                  <v-expansion-panel v-for="recruit in recruitlist">
                    <v-expansion-panel-header>
                      <div>
                        <v-chip
                          color="green"
                          text-color="white"
                          v-if="recruit.data.contract"
                          style
                        >작업중</v-chip>
                        <v-chip color="primary" v-if="!recruit.data.contract">모집중</v-chip>
                      </div>
                      {{recruit.data.projectTitle}}
                      <v-spacer />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container>
                        <v-layout row wrap>
                          <!-- 공고 상세 내용 -->
                          <v-flex xs12 sm7 style="padding:1em; border-right:1px solid black;">
                            <!-- 제목과 기술스택 -->
                            <v-layout row wrap>
                              <div>
                                <v-chip label outlined color="deep-purple">{{recruit.data.category}}</v-chip>
                              </div>
                              <v-spacer />
                              <div>
                                <v-chip
                                  v-for="skill in recruit.data.requiredSkills"
                                  small
                                  color="#7c5eb2c7"
                                >{{skill}}</v-chip>
                              </div>
                            </v-layout>

                            <!-- 요약 -->
                            <p
                              style="margin:20px 0px; border-bottom:1px solid black"
                            >{{recruit.data.projectSummary}}</p>

                            <!-- 나머지 디테일 -->
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <th>제목</th>
                                  <td>{{recruit.data.projectTitle}}</td>
                                </tr>
                                <tr>
                                  <th>예산</th>
                                  <td>{{recruit.data.budget}}</td>
                                </tr>
                                <tr>
                                  <th>업로드일</th>
                                  <td>{{recruit.data.createDay}}</td>
                                </tr>
                                <tr>
                                  <th>모집종료</th>
                                  <td>{{recruit.data.closingDate}}</td>
                                </tr>
                                <tr>
                                  <th>프로젝트 마감일</th>
                                  <td>{{recruit.data.endDay}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-flex>

                          <!-- 채팅방 목록들 ==> 즉, 찜한 유저 리스트-->
                          <!-- 아직 계약이 되지 않았을때 -->
                          <v-flex xs12 sm5 v-if="isMineCheck() && !recruit.data.contract ">
                            <h3>찜한 유저들</h3>
                            <v-layout row wrap>
                              <v-flex
                                xs11
                                offset-xs1
                                v-for="user in dibsUsers"
                                v-if="user.recruit==recruit.id"
                              >
                                <!-- 여기서 user는 chatting 입니다 혼동하기 쉬울거같아서 남겨놓습니다.-->
                                <v-btn
                                  text
                                  outlined
                                  @click="openChat(user.chat)"
                                >{{user.chat.userId}}</v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <!-- 계약이 된 상태라면 -->
                          <v-flex xs12 sm5 v-if="isMineCheck() && recruit.data.contract">
                            <h3>작업중인 유저</h3>
                            <v-layout row wrap>
                              <v-flex xs11 offset-xs1>
                                <v-btn
                                  text
                                  outlined
                                  @click="openWorkChat(recruit.data.responsibility,recruit.id)"
                                >{{recruit.data.responsibility}}</v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <div v-if="!recruit.data.contract">
                            <v-btn flex outlined color="red">삭제</v-btn>
                          </div>
                          <div v-else>
                            <v-btn flex outlined color="blue">완료</v-btn>
                            <v-btn
                              flex
                              outlined
                              color="orange"
                              @click="openContract(recruit.id,recruit.data.responsibility)"
                            >계약서</v-btn>
                            <v-btn flex outlined color="red">프로젝트 종료(실패)</v-btn>
                          </div>
                        </v-layout>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>



<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
import Main from "../components/Manager/Main";
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

export default {
  name: "Company",
  components: {},
  mounted() {
    this.fetchData();
    this.nowLevel = this.$session.get("level");
  },
  methods: {
    isMineCheck() {
      if (this.$route.params.id == this.$session.get("session_id")) {
        return true;
      } else {
        return false;
      }
    },
    async fetchData() {
      //this.company = await FirebaseService.SELECT_CompanyById(this.$route.params.id);
      this.recruitlist = await FirebaseService.SELECT_RecruitInfoById(
        this.$route.params.id
      );
      this.dibsUsers = [];
      var recruitsbyCompany = await FirebaseService.SELECT_RecruitInfoByCompany(
        this.$route.params.id
      );
      var chatRooms = "";
      var ChatRef = firebase.database().ref("/chat/");
      ChatRef.once(
        "value",
        snapshot => {
          chatRooms = snapshot.val();
          console.log(chatRooms, "챗룸");
          for (var ii in recruitsbyCompany) {
            for (var i in chatRooms) {
              if (chatRooms[i].recruitPK == recruitsbyCompany[ii].id) {
                this.dibsUsers.push({
                  recruit: recruitsbyCompany[ii].id,
                  chat: chatRooms[i]
                });
              }
            }
          }
        },
        function(error) {
          console.error(error, "유저리스트 불러오기 에러");
        }
      );

      console.log(this.dibsUsers, "찜유저리스트");

      const comInfo = await FirebaseService.SELECT_CompanyInfo(
        this.$route.params.id
      );

      this.company.id = comInfo[0].id;
      this.company.level = comInfo[0].level;
      this.company.company_logo = comInfo[0].company_logo;
      this.company.company_name = comInfo[0].company_name;
      this.company.industry = comInfo[0].industry;
      this.company.mount = comInfo[0].mount;
      this.company.comsize = comInfo[0].comsize;
      this.company.establishedDate = comInfo[0].establishedDate;
      this.company.represent = comInfo[0].represent;
      this.company.homepage = comInfo[0].homepage;
      this.company.address = comInfo[0].address;
      this.company.descript = comInfo[0].descript;
    },
    showNotification(group, type, title, text) {
      this.$notify({
        group,
        title,
        text,
        type
      });
    },
    openChat(user) {
      window.open(
        "../" + user.link,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    openWorkChat(user, id) {
      // user -> 이 프로젝트를 하기로한 유저아이디
      for (var i in this.dibsUsers) {
        console.log(this.dibsUsers[i], "리쿠르트아이디가나와야함..");
        console.log(id, "아이디");
        if (
          this.dibsUsers[i].chat.userId == user &&
          this.dibsUsers[i].recruit == id
        ) {
          this.workingUser = this.dibsUsers[i].chat;
          break;
        }
      }
      console.log(this.workingUser);
      var link = this.workingUser.link;
      window.open(
        "../" + link,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    openContract(id, responsibility) {
      window.open(
        "../contract/" + id + responsibility,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    async submit() {
      this.toggleIndustry = !this.toggleIndustry;
      this.toggleMount = !this.toggleMount;
      this.toggleComsize = !this.toggleComsize;
      this.toggleEstablishedDate = !this.toggleEstablishedDate;
      this.toggleRepresent = !this.toggleRepresent;
      this.toggleHomepage = !this.toggleHomepage;
      this.toggleAddress = !this.toggleAddress;
      this.toggleDescript = !this.toggleDescript;
      this.toggleCompany_logo = !this.toggleCompany_logo;
      const companyInfo = this.company;
      let result = await FirebaseService.UPDATE_Companys(
        companyInfo,
        companyInfo.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    setFile() {
      var file = document.querySelector("#file");
      file.click();
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
          this.image = success.data.link;
          this.company.company_logo = this.image;
          this.submit();
        })
        .catch();
    },
    removeImage() {
      this.company.company_logo = "";
      this.submit();
    }
  },
  data() {
    return {
      company: {
        id: "",
        interests: "",
        followerlist: "",
        followinglist: "",
        level: "",
        company_name: "",
        company_logo: "",
        industry: "",
        mount: "",
        comsize: "",
        establishedDate: "",
        represent: "",
        homepage: "",
        address: "",
        descript: ""
      },
      recruitlist: [],
      workingUser: "",
      dibsUsers: "",
      nowLevel: "",
      toggleIndustry: false,
      toggleMount: false,
      toggleComsize: false,
      toggleEstablishedDate: false,
      toggleRepresent: false,
      toggleHomepage: false,
      toggleAddress: false,
      toggleDescript: false,
      toggleCompany_logo: false,
      showUpImgBtn: false,
      showRmImgBtn: false
    };
  }
};
</script>

<style>
#companyBanner {
  background-image: url("../assets/coding.jpg");
  background-size: 100%;
}
#company_detail {
  padding: 1em;
  -moz-column-count: 2;
  -moz-column-gap: 1em;
  -webkit-column-count: 2;
  -webkit-column-gap: 1em;
  column-count: 2;
  column-gap: 1em;
}
</style>

<template>
  <div>
      <div v-if="loading">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
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
            <v-card-title>기업정보 <span v-if="this.$route.params.id==this.$store.getters.getSession">(수정가능 (이멘트 나중에 수정해주셈))</span> </v-card-title>
            <v-card-text id="company_detail">
              <v-simple-table>
                <tbody class="text-center">
                  <tr>
                    <th>산업</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.industry}}</td>
                    <td v-if="!toggleIndustry && this.$route.params.id==this.$store.getters.getSession" @click="Function_Industry()">{{company.industry}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.industry"
                        v-if="toggleIndustry && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="IndustryRef"
                        @keyup.enter="Submit_Industry()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>사원수</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.mount}}</td>
                    <td v-if="!toggleMount && this.$route.params.id==this.$store.getters.getSession" @click="Function_Mount()">{{company.mount}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.mount"
                        v-if="toggleMount && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="MountRef"
                        @keyup.enter="Submit_Mount()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>기업구분</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.comsize}}</td>
                    <td v-if="!toggleComsize && this.$route.params.id==this.$store.getters.getSession" @click="Function_Comsize()">{{company.comsize}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.comsize"
                        v-if="toggleComsize && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="ComsizeRef"
                        @keyup.enter="Submit_Comsize()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.homepage}}</td>
                    <td v-if="!toggleHomepage && this.$route.params.id==this.$store.getters.getSession" @click="Function_Homepage()">{{company.homepage}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.homepage"
                        v-if="toggleHomepage && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="HomepageRef"
                        @keyup.enter="Submit_Homepage()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.address}}</td>
                    <td v-if="!toggleAddress && this.$route.params.id==this.$store.getters.getSession" @click="Function_Address()">{{company.address}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.address"
                        v-if="toggleAddress && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="AddressRef"
                        @keyup.enter="Submit_Address()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.establishedDate}}</td>
                    <td v-if="!toggleEstablishedDate && this.$route.params.id==this.$store.getters.getSession" @click="Function_EstablishedDate()">{{company.establishedDate}}</td>
                      <input
                        type="text"
                        v-model="company.establishedDate"
                        v-if="toggleEstablishedDate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="EstablishedDateRef"
                        @keyup.enter="Submit_EstablishedDate()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>대표자</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.represent}}</td>
                    <td v-if="!toggleRepresent && this.$route.params.id==this.$store.getters.getSession" @click="Function_Represent()">{{company.represent}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.represent"
                        v-if="toggleRepresent && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center"
                        ref="RepresentRef"
                        @keyup.enter="Submit_Represent()"
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
            <v-card-text v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.descript}}</v-card-text>
            <v-card-text v-if="!toggleDescript && this.$route.params.id==this.$store.getters.getSession" @click="Function_Descript()">{{company.descript}}</v-card-text>
            <v-card-text v-if="toggleDescript && this.$route.params.id==this.$store.getters.getSession">
              <textarea
                v-model="company.descript"
                ref="DescriptRef"
                @keyup.enter="Submit_Descript()"
                style="width:100%; height:150px"
              />
            </v-card-text>
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
              <router-link
                v-if="this.$route.params.id==this.$store.getters.getSession"
                to="/recruiteditorpage"
                style="text-decoration:none"
              >
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
                          <!-- 1. 로그인한 사람이 회사가 아닐 때 : 공고 상세 내용 -->
                          <v-flex v-if="$route.params.id!==$store.getters.getSession" xs12 style="padding:1em;">
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

                          <!-- 2. 로그인한 사람이 해당 회사일 때 : 공고 상세 내용 -->
                          <v-flex
                            v-if="$route.params.id==$store.getters.getSession"
                            xs12
                            sm7
                            style="padding:1em; border-right:1px solid black;"
                          >
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
                          <v-flex xs12 sm5 v-if="$route.params.id==$store.getters.getSession && !recruit.data.contract ">
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
                          <v-flex xs12 sm5 v-if="$route.params.id==$store.getters.getSession && recruit.data.contract">
                            <h3>작업중인 유저</h3>
                            <v-layout row wrap>
                              <v-flex xs11 offset-xs1>

                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center v-if="$route.params.id==$store.getters.getSession">
                          <div v-if="!recruit.data.contract">
                            <v-btn flex outlined color="red">삭제</v-btn>
                          </div>
                          <div v-else>
                            <div v-if="recruit.data.UserComplete == 0 && recruit.data.CompanyComplete == 0">
                              <v-btn flex outlined color="blue" @click="complete(recruit.id)">계약완료</v-btn>
                              <v-btn flex outlined color="orange" @click="openContract(recruit.id,recruit.data.responsibility)">계약서</v-btn>
                              <v-btn text outlined @click="openWorkChat(recruit.data.responsibility,recruit.id)">{{recruit.data.responsibility}}</v-btn>
                              <v-btn flex outlined color="red" @click="cancel(recruit.id)">계약파기</v-btn>
                            </div>
                            <div v-if="recruit.data.UserComplete == 0 && recruit.data.CompanyComplete == 2">
                              <p> 완료 처리됨 // 상대방의 처리를 기다리는중</p>
                              <v-btn flex outlined color="orange" @click="openContract(recruit.id,recruit.data.responsibility)">계약서</v-btn>
                              <v-btn text outlined @click="openWorkChat(recruit.data.responsibility,recruit.id)">{{recruit.data.responsibility}}</v-btn>
                            </div>
                            <div v-if="recruit.data.UserComplete == 2 && recruit.data.CompanyComplete == 0">
                              <p> 상대방이 완료를 누른 상태입니다. 계약이 정상적으로 종료되었다면 완료를 눌러주세요.</p>
                              <v-btn flex outlined color="blue" @click="complete(recruit.id)">계약완료</v-btn>
                              <v-btn flex outlined color="orange" @click="openContract(recruit.id,recruit.data.responsibility)">계약서</v-btn>
                              <v-btn text outlined @click="openWorkChat(recruit.data.responsibility,recruit.id)">{{recruit.data.responsibility}}</v-btn>
                              <v-btn flex outlined color="red" @click="cancel(recruit.id)">계약파기</v-btn>
                            </div>
                            <div v-if="recruit.data.UserComplete == 1 || recruit.data.CompanyComplete == 1">
                              <p> 이미 파기된 계약입니다. 이거 처리해주세용</p>
                            </div>
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
  components: {
  },
  created() {

  },
  mounted() {
    this.loading = true;
    this.fetchData();
    this.nowLevel = this.$session.get("level");
    this.user = this.$session.get("session_id")
    this.$store.commit('setSession', this.user)
    this.loading = false;

  },
  methods: {
    complete(recruit) {
      if (confirm("알림 : 한번 완료 처리한 계약은 수정이 불가능합니다. 정말 완료 처리하시겠습니까?")) {
        FirebaseService.UPDATE_RecruitCompleteByCompany(recruit.recruitPK,"success")
        var dataRef = firebase.database().ref('/'+recruit.link);
        dataRef.update({
          CompanyComplete : 2,
        });
      }
    },
    cancel(recruit) {
      if (confirm("알림 : 한번 파기 처리한 계약은 수정이 불가능합니다. 정말 계약을 파기하시겠습니까?")) {
        FirebaseService.UPDATE_RecruitCompleteByCompany(recruit.recruitPK,"fail")
        var dataRef = firebase.database().ref('/'+recruit.link);
        dataRef.update({
          CompanyComplete : 1,
        });
      }
    },
    Function_Industry() {
      this.toggleIndustry = true;
      this.toggleMount = false;
      this.toggleComsize = false;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = false;
      this.toggleHomepage = false;
      this.toggleAddress = false;
      this.toggleDescript = false;
      this.$nextTick(() => this.$refs.IndustryRef.focus());
    },
    Function_Mount() {
      this.toggleIndustry = false;
      this.toggleMount = true;
      this.toggleComsize = false;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = false;
      this.toggleHomepage = false;
      this.toggleAddress = false;
      this.toggleDescript = false;

      this.$nextTick(() => this.$refs.MountRef.focus());
    },
    Function_Comsize() {
      this.toggleIndustry = false;
      this.toggleMount = false;
      this.toggleComsize = true;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = false;
      this.toggleHomepage = false;
      this.toggleAddress = false;
      this.toggleDescript = false;

      this.$nextTick(() => this.$refs.ComsizeRef.focus());
    },
    Function_Homepage() {
      this.toggleIndustry = false;
      this.toggleMount = false;
      this.toggleComsize = false;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = false;
      this.toggleHomepage = true;
      this.toggleAddress = false;
      this.toggleDescript = false;

      this.$nextTick(() => this.$refs.HomepageRef.focus());
    },
    Function_Address() {
      this.toggleIndustry = false;
      this.toggleMount = false;
      this.toggleComsize = false;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = false;
      this.toggleHomepage = false;
      this.toggleAddress = true;
      this.toggleDescript = false;

      this.$nextTick(() => this.$refs.AddressRef.focus());
    },
    Function_EstablishedDate() {
      this.toggleIndustry = false;
      this.toggleMount = false;
      this.toggleComsize = false;
      this.toggleEstablishedDate = true;
      this.toggleRepresent = false;
      this.toggleHomepage = false;
      this.toggleAddress = false;
      this.toggleDescript = false;

      this.$nextTick(() => this.$refs.EstablishedDateRef.focus());
    },

    Function_Represent() {
      this.toggleIndustry = false;
      this.toggleMount = false;
      this.toggleComsize = false;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = true;
      this.toggleHomepage = false;
      this.toggleAddress = false;
      this.toggleDescript = false;

      this.$nextTick(() => this.$refs.RepresentRef.focus());
    },

    Function_Descript() {
      this.toggleIndustry = false;
      this.toggleMount = false;
      this.toggleComsize = false;
      this.toggleEstablishedDate = false;
      this.toggleRepresent = false;
      this.toggleHomepage = false;
      this.toggleAddress = false;
      this.toggleDescript = true;

      this.$nextTick(() => this.$refs.DescriptRef.focus());
    },

    async Submit_Industry() {
      if (this.$route.params.id==this.$store.getters.getSession)
      this.toggleIndustry = !this.toggleIndustry;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_Mount() {
      this.toggleMount = !this.toggleMount;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_Comsize() {
      this.toggleComsize = !this.toggleComsize;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_Homepage() {
      this.toggleHomepage = !this.toggleHomepage;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_Address() {
      this.toggleAddress = !this.toggleAddress;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_EstablishedDate() {
      this.toggleEstablishedDate = !this.toggleEstablishedDate;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_Represent() {
      this.toggleRepresent = !this.toggleRepresent;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async Submit_Descript() {
      this.toggleDescript = !this.toggleDescript;
      await FirebaseService.UPDATE_Companys(
        this.company,
        this.company.company_name
      );
      this.showNotification(
        "foo-css",
        "success",
        "",
        `내용이 성공적으로 수정되었습니다.!`
      );
    },
    async fetchData() {
      //this.company = await FirebaseService.SELECT_CompanyById(this.$route.params.id);
      this.$loading(true);
      this.recruitlist = await FirebaseService.SELECT_RecruitInfoById(
        this.$route.params.id);
      console.log(this.recruitlist)
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
          // console.log(chatRooms, "챗룸");
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
          // console.error(error, "유저리스트 불러오기 에러");
        }
      );

      // console.log(this.dibsUsers, "찜유저리스트");

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

      this.$loading(false);
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
      if (this.toggleIndustry) this.toggleIndustry = !this.toggleIndustry;
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
        address : "",
        descript : "",
      },
      loading : false,
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
      showRmImgBtn: false,
      user: "",
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

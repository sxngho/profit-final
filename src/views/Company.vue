<template>
  <div>
    <!-- 회사배너 -->
    <v-layout wrap id="companyBanner">
      <v-flex xs12 sm10 offset-sm1>
        <v-layout style="margin:5vw 0px;">
          <div>
            <v-avatar size=128>
              <v-img :src="company.company_logo"/>
            </v-avatar>
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
                    <td>{{company.industry}}</td>
                  </tr>
                  <tr>
                    <th>사원수</th>
                    <td>{{company.mount}}</td>
                  </tr>
                  <tr>
                    <th>기업구분</th>
                    <td>{{company.comsize}}</td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td>{{company.homepage}}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>{{company.address}}</td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td>{{company.establishedDate}}</td>
                  </tr>
                  <tr>
                    <th>대표자</th>
                    <td>{{company.represent}}</td>
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
      <div style="margin:20px"/>

      <!-- 회사소개 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>회사소개</v-card-title>
            <v-card-text>
              {{company.descript}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px"/>

      <!-- 회사공고 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>
              공고
              <v-btn text outlined small rounded  color="success" style="margin-left:1em;">
                <i class="fa fa-pencil"/>공고 추가
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-expansion-panels>
                  <v-expansion-panel
                  v-for="recruit in recruitlist">
                    <v-expansion-panel-header>
                      <div>
                      <v-chip color="green" text-color="white" v-if="recruit.data.contract" style="">작업중</v-chip>
                      <v-chip color="primary" v-if="!recruit.data.contract">모집중</v-chip>
                      </div>
                      {{recruit.data.projectTitle}}
                      <v-spacer/>
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
                              <v-spacer/>
                              <div>
                                <v-chip v-for="skill in recruit.data.requiredSkills" small color="#7c5eb2c7">
                                  {{skill}}
                                </v-chip>
                              </div>
                            </v-layout>

                            <!-- 요약 -->
                            <p style="margin:20px 0px; border-bottom:1px solid black">{{recruit.data.projectSummary}}</p>

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
                              <v-flex xs11 offset-xs1 v-for="user in dibsUsers" v-if="user.recruit==recruit.id">
                                <!-- 여기서 user는 chatting 입니다 혼동하기 쉬울거같아서 남겨놓습니다.-->
                                <v-btn text outlined @click="openChat(user.chat)">
                                  {{user.chat.userId}}
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <!-- 계약이 된 상태라면 -->
                          <v-flex xs12 sm5 v-if="isMineCheck() && recruit.data.contract">
                            <h3>작업중인 유저</h3>
                            <v-layout row wrap>
                              <v-flex xs11 offset-xs1>
                                <v-btn text outlined @click="openWorkChat(recruit.data.responsibility,recruit.id)">
                                {{recruit.data.responsibility}}
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                        </v-layout>
                        <v-layout justify-center>
                          <div  v-if="!recruit.data.contract">
                            <v-btn flex outlined color="red">삭제</v-btn>
                          </div>
                          <div v-else>
                            <v-btn flex outlined color="blue">완료</v-btn>
                            <v-btn flex outlined color="orange" @click="openContract(recruit.id,recruit.data.responsibility)">계약서</v-btn>
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
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default {
  name: "Company",
  components: {
  },
  mounted() {
    this.fetchData();
    this.nowLevel = this.$session.get('level');
  },
  methods: {
    isMineCheck() {
      if ( this.$route.params.id == this.$session.get('session_id') ) {
        return true;
      } else {
        return false;
      }
    },
    async fetchData() {
      //this.company = await FirebaseService.SELECT_CompanyById(this.$route.params.id);
      this.recruitlist = await FirebaseService.SELECT_RecruitInfoById(this.$route.params.id);
      this.dibsUsers = [];
      var recruitsbyCompany = await FirebaseService.SELECT_RecruitInfoByCompany(this.$route.params.id);
      var chatRooms = "";
      var ChatRef = firebase.database().ref('/chat/')
      ChatRef.once('value', snapshot => {
        chatRooms = snapshot.val();
        console.log(chatRooms,"챗룸")
        for(var ii in recruitsbyCompany) {
          for(var i in chatRooms) {
            if( chatRooms[i].recruitPK == recruitsbyCompany[ii].id ) {
              this.dibsUsers.push({ recruit : recruitsbyCompany[ii].id, chat :chatRooms[i] })
            }
          }
        }
      },function(error) {
        console.error(error,"유저리스트 불러오기 에러");
      });

      console.log( this.dibsUsers ,"찜유저리스트")
    },
    openChat(user) {
      window.open(
        "../" + user.link,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    openWorkChat(user,id) { // user -> 이 프로젝트를 하기로한 유저아이디
      for(var i in this.dibsUsers) {
        console.log(this.dibsUsers[i],"리쿠르트아이디가나와야함..")
        console.log(id,"아이디");
        if (this.dibsUsers[i].chat.userId  == user && this.dibsUsers[i].recruit == id ) {
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
    openContract(id,responsibility) {
      window.open(
        "../contract/" + id + responsibility,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
  },
  data() {
    return {
      company :{
        company_name :"회사이름",
        company_logo : "https://i.imgur.com/AY1nwiA.png",
        industry :"회사의 산업 분류",
        mount:"100명",
        comsize:"대기업",
        establishedDate:"2019-07-31",
        represent:"홍길동",
        homepage:"www.naver.com",
        address:"어디시 어디구 어디동 123-456",

        descript:"어쩌고저쩌고 회사설명 긴글이필요하다법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령은 법률안의 일부에 대하여 또는 법률안을 수정하여 재의를 요구할 수 없다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 대한민국의 영토는 한반도와 그 부속도서로 한다.대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다",
      },
      recruitlist:[],
      workingUser : "",
      dibsUsers : "",
      nowLevel : "",

    };
  },
};

</script>

<style>
#companyBanner {
  background-image:  url( "../assets/coding.jpg" );
  background-size: 100%;
}
#company_detail{
  padding: 1em;
 -moz-column-count: 2;
 -moz-column-gap: 1em;
 -webkit-column-count: 2;
 -webkit-column-gap: 1em;
 column-count: 2;
 column-gap: 1em;
}
</style>

<template>
  <v-container>
    <!-- 다른 공고보기를 누르는 등 다른 행동을 취했을때 초기화를해주는것이 아무것도 없음!!! 나중에 추가해야함!!! 내가할거같긴한데!! <-ㅇㄱㅁㄷ -->
    <!-- 이곳은 유저가 보는 곳이에오 -->
    <div v-if="nowLevel == 2">
      <p> 유저 페이지 </p>
      <v-layout row wrap>
        <v-flex
        v-for="recruit in recruits"
        d-inline-block
        style="
          cursor:pointer;
          border:1px solid #cecece;
          padding:2px 10px;
          border-radius:8px;
          margin:2px 4px;"
        v-on:click="createChatRoom(recruit)">
          [{{recruit.data.companyId}}] {{recruit.data.title}}
        </v-flex>
      </v-layout>

      <v-layout row wrap>
          <v-flex
          xs12
          v-for="myChatRoom in myChatRooms"
          d-inline-block
          style="
            cursor:pointer;
            border:1px solid #cecece;
            padding:2px 10px;
            border-radius:8px;
            margin:2px 4px;"
          v-on:click="EnterChatRoom(myChatRoom)">
            [{{myChatRoom.companyId}}] {{myChatRoom.projectTitle}}
          </v-flex>
      </v-layout>

      <v-layout row wrap v-if='nowChatRoom !== "" '>
        <v-flex xs5>
          <v-divider/>
          <h1> 채팅창 </h1>
          <v-divider/>

          <v-flex
          xs12
          v-for="message in messages"
          v-if='message.chatId !== "" && message.chatMsg !== "" '>
            [{{ message.chatId }}] : {{ message.chatMsg }}
          </v-flex>

          <v-text-field
          single-line outlined required
          v-model="myMessage"
          v-on:keyup.enter="pushMessage(myMessage)"/>
        </v-flex>

        <v-flex xs7>
          <v-divider/>
          <h1> 간이 계약서 </h1>
          <v-divider/>

          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center">항목</th>
                <th class="text-center">내용</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>갑</td>
                <td>{{nowChatRoom.companyId}}</td>
              </tr>
              <tr>
                <td>을</td>
                <td>{{nowChatRoom.userId}}</td>
              </tr>

              <tr @click="changeProjectTitle()" v-if="toggleProjectTitle">
                <td>프로젝트 이름</td>
                <td>{{nowChatRoom.projectTitle}}</td>
              </tr>
              <tr v-if="!toggleProjectTitle">
                <td>프로젝트 이름</td>
                <td>
                  <v-text-field single-line outlined required v-model="inputProjectTitle" v-on:keyup.enter="completeProjectTitle(inputProjectTitle)" > </v-text-field>
                </td>
              </tr>
              <tr @click="changeProjectTerm()" v-if="toggleProjectTerm">
                <td>프로젝트 기간</td>
                <td>{{nowChatRoom.projectTerm}}</td>
              </tr>
              <tr v-if="!toggleProjectTerm">
                <td>프로젝트 기간</td>
                <td>
                  <v-text-field single-line outlined required v-model="inputProjectTerm" v-on:keyup.enter="completeProjectTerm(inputProjectTerm)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changePay()" v-if="togglePay">
                <td> 급여 </td>
                <td> {{nowChatRoom.pay}} </td>
              </tr>
              <tr v-if="!togglePay">
                <td> 급여 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputPay" v-on:keyup.enter="completePay(inputPay)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changeDownPayment()" v-if="toggleDownPayment">
                <td> 계약금 </td>
                <td> {{nowChatRoom.downPayment}} </td>
              </tr>
              <tr v-if="!toggleDownPayment">
                <td></td>
                <td>
                  <v-text-field single-line outlined required v-model="inputDownPayment" v-on:keyup.enter="completeDownPayment(inputDownPayment)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changeBalance()" v-if="toggleBalance">
                <td>잔금 </td>
                <td>{{nowChatRoom.balance}} </td>
              </tr>
              <tr >
                <td>잔금</td>
                <td v-if="!toggleBalance">
                  <v-text-field single-line outlined required v-model="inputBalance" v-on:keyup.enter="completeBalance(inputBalance)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changePenalty()" v-if="togglePenalty">
                <td> 위약금 </td>
                <td> {{nowChatRoom.penalty}} </td>
              </tr>
              <tr v-if="!togglePenalty" >
                <td> 위약금 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputPenalty" v-on:keyup.enter="completePenalty(inputPenalty)" > </v-text-field>
                </td>
              </tr>


              <tr @click="changeContractDate()" v-if="toggleContractDate">
                <td> 계약일 </td>
                <td> {{nowChatRoom.contractDate}} </td>
              </tr>
              <tr v-if="!toggleContractDate">
                <td> 계약금</td>
                <td>
                  <v-text-field single-line outlined required v-model="inputContractDate" v-on:keyup.enter="completeContractDate(inputContractDate)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changeCompanyId()" v-if="toggleCompanyId">
                <td> 기업명 </td>
                <td> {{nowChatRoom.companyId}} </td>
              </tr>
              <tr v-if="!toggleCompanyId">
                <td> 기업명 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputCompanyId" v-on:keyup.enter="completeCompanyId(inputCompanyId)" > </v-text-field>
                </td>
              </tr>


              <tr @click="changeCompanyAddr()" v-if="toggleCompanyAddr">
                <td>기업주소</td>
                <td>{{nowChatRoom.companyAddr}}</td>
              </tr>
              <tr >
                <td>기업주소</td>
                <td v-if="!toggleCompanyAddr">
                  <v-text-field single-line outlined required v-model="inputCompanyAddr" v-on:keyup.enter="completeCompanyAddr(inputCompanyAddr)" > </v-text-field>
                </td>
              </tr>


              <tr @click="changeCompany()" v-if="toggleCompany">
                <td> 책임자 </td>
                <td> {{nowChatRoom.company}} </td>
              </tr>
              <tr v-if="!toggleCompany">
                <td> 책임자 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputCompany" v-on:keyup.enter="completeCompany(inputCompany)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changeAddr()" v-if="toggleAddr" >
                <td> 유저주소 </td>
                <td> {{nowChatRoom.addr}} </td>
              </tr>
              <tr v-if="!toggleAddr">
                <td> 유저주소 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputAddr" v-on:keyup.enter="completeAddr(inputAddr)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changeRrn()" v-if="toggleRrn">
                <td> 유저주민번호 </td>
                <td> {{nowChatRoom.rrn}} </td>
              </tr>
              <tr v-if="!toggleRrn" >
                <td> 유저주민번호 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputRrn" v-on:keyup.enter="completeRrn(inputRrn)" > </v-text-field>
                </td>
              </tr>

              <tr @click="changeUserId()" v-if="toggleUserId">
                <td> 유저이름 </td>
                <td> {{nowChatRoom.userId}} </td>
              </tr>
              <tr v-if="!toggleUserId">
                <td> 유저이름 </td>
                <td>
                  <v-text-field single-line outlined required v-model="inputUserId" v-on:keyup.enter="completeUserId(inputUserId)" > </v-text-field>
                </td>
              </tr>
            </tbody>
          </v-simple-table>

        </v-flex>
      </v-layout>
    </div>

<!-- 이곳은 기업이 보는 곳이에오 -->
<div v-if="nowLevel == 3">
  <p> 기업 페이지 </p>
  <v-layout col wrap>
    - 우리 기업이 진행중인 외주 -
    <v-flex v-for="recruit in recruitsbyCompany" d-inline-block
    style="cursor:pointer;border:1px solid #cecece; padding:2px 10px; border-radius:8px; margin:2px 4px;"
    v-on:click="enterMyRecruit(recruit)">
    {{recruit.data.title}}
  </v-flex>
</v-layout>


<v-layout row wrap>

  <v-flex xs12 v-for="myChatRoom in myChatRooms" d-inline-block
  style="cursor:pointer;border:1px solid #cecece; padding:2px 10px; border-radius:8px; margin:2px 4px;"
  v-on:click="EnterChatRoom(myChatRoom)">
  [{{myChatRoom.userId}}]와의 {{myChatRoom.projectTitle}} 프로젝트
</v-flex>
</v-layout>

<v-layout row wrap v-if='nowChatRoom !== "" '>
  <v-flex xs1>
  </v-flex>
  <v-flex xs4>
    <div>
      <v-divider/>
      <h1> 채팅창 </h1>
      <v-divider/>
    </div>
    <v-flex xs12 v-for="message in messages" v-if='message.chatId !== "" && message.chatMsg !== "" '>
      [{{ message.chatId }}] : {{ message.chatMsg }}
    </v-flex>
    <v-text-field single-line outlined required v-model="myMessage" v-on:keyup.enter="pushMessage(myMessage)" > </v-text-field>
  </v-flex>
  <v-flex xs1>
  </v-flex>
  <v-flex xs6>
    <div>
      <v-divider/>
      <h1> 간이 계약서 </h1>
      <v-divider/>
    </div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">항목</th>
          <th class="text-center">내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>갑</td>
          <td>{{nowChatRoom.companyId}}</td>
        </tr>
        <tr>
          <td>을</td>
          <td>{{nowChatRoom.userId}}</td>
        </tr>

        <tr @click="changeProjectTitle()" v-if="toggleProjectTitle">
          <td>프로젝트 이름</td>
          <td>{{nowChatRoom.projectTitle}}</td>
        </tr>
        <tr v-if="!toggleProjectTitle">
          <td>프로젝트 이름</td>
          <td>
            <v-text-field single-line outlined required v-model="inputProjectTitle" v-on:keyup.enter="completeProjectTitle(inputProjectTitle)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeProjectTerm()" v-if="toggleProjectTerm">
          <td>프로젝트 기간</td>
          <td>{{nowChatRoom.projectTerm}}</td>
        </tr>
        <tr v-if="!toggleProjectTerm">
          <td>프로젝트 기간</td>
          <td>
            <v-text-field single-line outlined required v-model="inputProjectTerm" v-on:keyup.enter="completeProjectTerm(inputProjectTerm)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changePay()" v-if="togglePay">
          <td> 급여 </td>
          <td> {{nowChatRoom.pay}} </td>
        </tr>
        <tr v-if="!togglePay">
          <td> 급여 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputPay" v-on:keyup.enter="completePay(inputPay)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeDownPayment()" v-if="toggleDownPayment">
          <td> 계약금 </td>
          <td> {{nowChatRoom.downPayment}} </td>
        </tr>
        <tr v-if="!toggleDownPayment">
          <td></td>
          <td>
            <v-text-field single-line outlined required v-model="inputDownPayment" v-on:keyup.enter="completeDownPayment(inputDownPayment)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeBalance()" v-if="toggleBalance">
          <td>잔금 </td>
          <td>{{nowChatRoom.balance}} </td>
        </tr>
        <tr >
          <td>잔금</td>
          <td v-if="!toggleBalance">
            <v-text-field single-line outlined required v-model="inputBalance" v-on:keyup.enter="completeBalance(inputBalance)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changePenalty()" v-if="togglePenalty">
          <td> 위약금 </td>
          <td> {{nowChatRoom.penalty}} </td>
        </tr>
        <tr v-if="!togglePenalty" >
          <td> 위약금 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputPenalty" v-on:keyup.enter="completePenalty(inputPenalty)" > </v-text-field>
          </td>
        </tr>


        <tr @click="changeContractDate()" v-if="toggleContractDate">
          <td> 계약일 </td>
          <td> {{nowChatRoom.contractDate}} </td>
        </tr>
        <tr v-if="!toggleContractDate">
          <td> 계약금</td>
          <td>
            <v-text-field single-line outlined required v-model="inputContractDate" v-on:keyup.enter="completeContractDate(inputContractDate)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeCompanyId()" v-if="toggleCompanyId">
          <td> 기업명 </td>
          <td> {{nowChatRoom.companyId}} </td>
        </tr>
        <tr v-if="!toggleCompanyId">
          <td> 기업명 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputCompanyId" v-on:keyup.enter="completeCompanyId(inputCompanyId)" > </v-text-field>
          </td>
        </tr>


        <tr @click="changeCompanyAddr()" v-if="toggleCompanyAddr">
          <td>기업주소</td>
          <td>{{nowChatRoom.companyAddr}}</td>
        </tr>
        <tr >
          <td>기업주소</td>
          <td v-if="!toggleCompanyAddr">
            <v-text-field single-line outlined required v-model="inputCompanyAddr" v-on:keyup.enter="completeCompanyAddr(inputCompanyAddr)" > </v-text-field>
          </td>
        </tr>


        <tr @click="changeCompany()" v-if="toggleCompany">
          <td> 책임자 </td>
          <td> {{nowChatRoom.company}} </td>
        </tr>
        <tr v-if="!toggleCompany">
          <td> 책임자 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputCompany" v-on:keyup.enter="completeCompany(inputCompany)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeAddr()" v-if="toggleAddr" >
          <td> 유저주소 </td>
          <td> {{nowChatRoom.addr}} </td>
        </tr>
        <tr v-if="!toggleAddr">
          <td> 유저주소 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputAddr" v-on:keyup.enter="completeAddr(inputAddr)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeRrn()" v-if="toggleRrn">
          <td> 유저주민번호 </td>
          <td> {{nowChatRoom.rrn}} </td>
        </tr>
        <tr v-if="!toggleRrn" >
          <td> 유저주민번호 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputRrn" v-on:keyup.enter="completeRrn(inputRrn)" > </v-text-field>
          </td>
        </tr>

        <tr @click="changeUserId()" v-if="toggleUserId">
          <td> 유저이름 </td>
          <td> {{nowChatRoom.userId}} </td>
        </tr>
        <tr v-if="!toggleUserId">
          <td> 유저이름 </td>
          <td>
            <v-text-field single-line outlined required v-model="inputUserId" v-on:keyup.enter="completeUserId(inputUserId)" > </v-text-field>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-flex>
</v-layout>
</div>
</v-container>
</template>


<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
// import Projects from "../components/MainPage/Projects";

export default {
  name: "chat",
  data() {
    return {
      nowLevel : "",

      recruits : "", // 모든 공고 리스트
      chatRooms : "", // 모든 공고 리스트
      myChatRooms : [], // 내가 볼 수 있는 공고 리스트
      nowChatRoom : "", // 내가 현재 접속중인 공고의 채팅방
      messages : "", // 채팅방 메시지들
      myMessage : "", // 내가 입력하는 메시지
      recruitsbyCompany : "",

      // inputs
      inputProjectTitle : "",
      inputProjectTerm : "",
      inputPay : "",
      inputDownPayment : "",
      inputBalance : "",
      inputPenalty : "",
      inputContractDate : "",
      inputCompanyId : "",
      inputCompanyAddr : "",
      inputCompany : "",
      inputAddr : "",
      inputRrn : "",
      inputUserId : "",

      // Toggles
      toggleProjectTitle : true,
      toggleProjectTerm : true,
      togglePay : true,
      toggleDownPayment : true,
      toggleBalance : true,
      togglePenalty : true,
      toggleContractDate : true,
      toggleCompanyId : true,
      toggleCompanyAddr : true,
      toggleCompany : true,
      toggleAddr : true,
      toggleRrn : true,
      toggleUserId : true,

    };
  },
  components: {
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');

      //COMPANY fetchData
      if ( this.nowLevel == "3" ) {
        this.recruitsbyCompany = await FirebaseService.SELECT_RecruitByCompany(this.$session.get('session_id'));
        var ChatRef = firebase.database().ref('/chat/')
        ChatRef.on('value', snapshot => {
          this.chatRooms = snapshot.val();
        },function(error) {
          console.error(error,"채팅방 에러");
        });

        //USER fetchData -->
      } else if ( this.nowLevel == "2" ) {
        this.recruits = await FirebaseService.SELECT_Recruit();
        var ChatRef = firebase.database().ref('/chat/')
        ChatRef.on('value', snapshot => {
          this.chatRooms = snapshot.val();
          this.myChatRooms = [];
          for(var i in this.chatRooms) {
            if(this.chatRooms[i].userId == this.$session.get('session_id')) {
              this.myChatRooms.push(this.chatRooms[i]);
            }
          }
        },function(error) {
          console.error(error,"채팅방 에러");
        });
      }
    },

    // COMPANY METHOD -->
    enterMyRecruit(recruit) {
      this.myChatRooms = [];
      for(var i in this.chatRooms) {
        console.log(recruit.data.title, " ?/ ",this.chatRooms[i].recruitPK)
        if( this.chatRooms[i].recruitPK == recruit.id ) {
          this.myChatRooms.push(this.chatRooms[i]);
        }
      }
    },

    // USER METHOD -->
    async existChatRoom(recruit,nickname) {
      return firebase.database().ref('/chat/').once('value').then( snapshot => {
        var chats = snapshot.val();
        for(var i in chats) {
          if ( this.nowLevel == "2" ) {
            if ( chats[i].recruitPK == recruit.id && chats[i].userId == nickname ) {
              console.log("유저접근 :: 이미 방이 존재하므로 바로 이동합니다.")
              return { res : true , index : chats[i] };
            }
          } else if ( this.nowLevel == "3" ) {
            if ( chats[i].recruitPK == recruit.id && chats[i].companyId == nickname ) {
              console.log("회사접근 :: 이미 방이 존재하므로 바로 이동합니다.")
              return { res : true , index : chats[i] };
            }
          }
        }
        return { res : false };
      });
    },
    async createChatRoom(recruit) {
      var nickname = this.$session.get('session_id');
      var exist = await this.existChatRoom(recruit,nickname);
      if ( exist.res ) {
        this.EnterChatRoom(exist.index);
      }
      else if ( !exist.res ) {
        // INIT CHATROOM
        firebase.database().ref('chat/'+recruit.id+nickname).set({
          link : 'chat/'+recruit.id+nickname,
          recruitPK : recruit.id,
          chatting : [{chatMsg:"",chatId:""}],
          projectTitle : recruit.data.title,
          projectTerm : "",
          pay : "",
          downPayment : "",
          balance : "",
          penalty : "",
          contractDate : "",

          // company
          companyId : recruit.data.companyId,
          companyAddr : "",
          company : "", //책임자

          //user
          addr : "",
          rrn : "",
          userId : nickname,

        });
      }
    },
    async EnterChatRoom(myChatRoom) {
      if (this.nowChatRoom !== "") {
        firebase.database().ref(this.nowChatRoom.link).off()
      }
      this.nowChatRoom = myChatRoom
      firebase.database().ref(this.nowChatRoom.link).on('value', snapshot => {
        this.messages = snapshot.val().chatting;
        this.nowChatRoom = snapshot.val();
      },function(error) {
        console.error(error,"채팅장 입장 에러입니다.");
      });
    },
    pushMessage(myMessage) {
      var tmp = this.nowChatRoom.chatting;
      tmp.push({ chatMsg : myMessage, chatId : this.$session.get('session_id') });
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        chatting : tmp,
      });
      this.myMessage = "";
    },

    changeProjectTitle() {
      this.toggleProjectTitle = !this.toggleProjectTitle;
    },
    completeProjectTitle() {
      this.toggleProjectTitle = !this.toggleProjectTitle;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        projectTitle : this.inputProjectTitle,
      });
      this.inputProjectTitle = "";
    },

    changeProjectTerm() {
      this.toggleProjectTerm = !this.toggleProjectTerm;
    },
    completeProjectTerm() {
      this.toggleProjectTerm = !this.toggleProjectTerm;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        projectTerm : this.inputProjectTerm,
      });
      this.inputProjectTerm = "";
    },

    changePay() {
      this.togglePay = !this.togglePay;
    },
    completePay() {
      this.togglePay = !this.togglePay;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        pay : this.inputPay,
      });
      this.inputPay = "";
    },

    changeDownPayment() {
      this.toggleDownPayment = !this.toggleDownPayment;
    },
    completeDownPayment() {
      this.toggleDownPayment = !this.toggleDownPayment;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        downPayment : this.inputDownPayment,
      });
      this.inputDownPayment = "";
    },

    changeBalance() {
      this.toggleBalance = !this.toggleBalance;
    },
    completeBalance() {
      this.toggleBalance = !this.toggleBalance;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        balance : this.inputBalance,
      });
      this.inputBalance = "";
    },

    changePenalty() {
      this.togglePenalty = !this.togglePenalty;
    },
    completePenalty() {
      this.togglePenalty = !this.togglePenalty;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        penalty : this.inputPenalty,
      });
      this.inputPenalty = "";
    },

    changeContractDate() {
      this.toggleContractDate = !this.toggleContractDate;
    },
    completeContractDate() {
      this.toggleContractDate = !this.toggleContractDate;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        contractDate : this.inputContractDate,
      });
      this.inputContractDate = "";
    },

    changeCompanyId() {
      this.toggleCompanyId = !this.toggleCompanyId;
    },
    completeCompanyId() {
      this.toggleCompanyId = !this.toggleCompanyId;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        companyId : this.inputCompanyId,
      });
      this.inputCompanyId = "";
    },

    changeCompanyAddr() {
      this.toggleCompanyAddr = !this.toggleCompanyAddr;
    },
    completeCompanyAddr() {
      this.toggleCompanyAddr = !this.toggleCompanyAddr;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        companyAddr : this.inputCompanyAddr,
      });
      this.inputCompanyAddr = "";
    },

    changeCompany() {
      this.toggleCompany = !this.toggleCompany;
    },
    completeCompany() {
      this.toggleCompany = !this.toggleCompany;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        company : this.inputCompany,
      });
      this.inputCompany = "";
    },
    changeAddr() {
      this.toggleAddr = !this.toggleAddr;
    },
    completeAddr() {
      this.toggleAddr = !this.toggleAddr;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        addr : this.inputAddr,
      });
      this.inputAddr = "";
    },

    changeRrn() {
      this.toggleRrn = !this.toggleRrn;
    },
    completeRrn() {
      this.toggleRrn = !this.toggleRrn;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        rrn : this.inputRrn,
      });
      this.inputRrn = "";
    },
    changeUserId() {
      this.toggleUserId = !this.toggleUserId;
    },
    completeUserId() {
      this.toggleUserId = !this.toggleUserId;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        userId : this.inputUserId,
      });
      this.inputUserId = "";
    },
  },
};
</script>

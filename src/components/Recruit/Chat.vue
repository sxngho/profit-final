<template>
  <v-container>
    <v-layout wrap >
      <!-- 채팅창 -->
      <v-flex xs7>
        <v-layout wrap>
          <v-flex xs12>
            <v-divider/><h1 class="text-center"> 채팅창 </h1><v-divider/>
          </v-flex>

          <v-flex xs12>
            <v-container class="overflow-y-auto" style="max-height:700px">
              <v-layout v-scroll:scroll-target="'#scrolling'" column>
                <v-flex
                xs12
                v-for="message in messages"
                v-if='message.chatId !== "" && message.chatMsg !== "" '
                class="messageBox">
                  <v-layout justify-end v-if='message.chatId == user'>
                    <div v-if="!message.isReadCompany">1</div>
                    <div style="background:#ffffab;" class="speech_bubble">{{message.chatMsg}}</div>
                  </v-layout>
                  <v-layout v-else>
                    <div style="background:#d6ddff;" class="speech_bubble">
                      {{message.chatMsg}}
                    </div>
                  </v-layout>
                <!-- [{{ message.chatId }}] : {{ message.chatMsg }} -->
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>

          <v-text-field single-line outlined required v-model="myMessage" v-on:keyup.enter="pushMessage(myMessage)" > </v-text-field>
        </v-layout>
      </v-flex>

      <!-- 공동 협의 서류 -->
      <v-flex xs5>
        <div>
          <v-divider/>
          <h1 class="text-center"> 간이 계약서 </h1>
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
              <td> 계약금 </td>
              <td>
                <v-text-field single-line outlined required v-model="inputDownPayment" v-on:keyup.enter="completeDownPayment(inputDownPayment)" > </v-text-field>
              </td>
            </tr>

            <tr @click="changeBalance()" v-if="toggleBalance">
              <td>잔금 </td>
              <td>{{nowChatRoom.balance}} </td>
            </tr>
            <tr v-if="!toggleBalance">
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
            <tr v-if="!toggleCompanyAddr" >
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
  </v-container>
</template>

<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default {
  name: "Chat",
  components: {
  },
  created() {
    this.user = this.$session.get("session_id");
    this.$store.state.no_header = true;
    this.fetchData();
  },
  data() {
    return {
      user : "",
      nowLevel : "",
      allChatRoom : "",
      nowChatRoom : "", // 내가 현재 접속중인 공고의 채팅방
      myMessage : "", // 내가 입력하는 메시지
      // inputs
      messages : "", // 채팅방 메시지들
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

  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      var allChatRoom = "";
      firebase.database().ref('/chat/').once('value').then( snapshot => {
        allChatRoom = snapshot.val();
        var index = "";
        for(var i in allChatRoom) {
          if ( allChatRoom[i].link == 'chat/'+this.$route.params.ccode ) {
            index = allChatRoom[i]
          }
        }
        if ( index !== "" ) {
          this.EnterChatRoom(index);
        }
      });
    },

    async EnterChatRoom(myChatRoom) {
      if (this.nowChatRoom !== "") {
        firebase.database().ref(this.nowChatRoom.link).off()
      }
      this.nowChatRoom = myChatRoom
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      firebase.database().ref(this.nowChatRoom.link).on('value', snapshot => {
        this.messages = snapshot.val().chatting;
        if ( this.nowLevel == "3" ) {
          for(var i in this.messages) {
            this.messages[i].isReadCompany = true;
          }
          dataRef.update({
            chatting : this.messages,
          });
        } else if ( this.nowLevel == "2" ){
          for(var i in this.messages) {
            this.messages[i].isReadUser = true;
          }
          dataRef.update({
            chatting : this.messages,
          });
        }
        this.nowChatRoom = snapshot.val();
        //auto scroll
        let targetscroll = documnet.getElementById('scrolling');
        targetscroll.scrollTop = 20;

      },function(error) {
        console.error(error,"채팅장 입장 에러입니다.");
      });
    },

    pushMessage(myMessage) {
      var tmp = this.nowChatRoom.chatting;
      if ( this.nowLevel == "3") {
        tmp.push({ chatMsg : myMessage, chatId : this.$session.get('session_id'), isReadCompany : true, isReadUser : false });
      } else if ( this.nowLevel == "2" ) {
        tmp.push({ chatMsg : myMessage, chatId : this.$session.get('session_id'), isReadCompany : false, isReadUser : true });
      }
      console.log(tmp,"이게찍히고잇는거겟죠?")
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

<style>
.speech_bubble{
  padding: 4px 15px;
    border: 1px solid #0000002e;
    border-radius: 14px;
    margin: 2px 0;
}
</style>

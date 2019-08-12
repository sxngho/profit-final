<template>
  <v-container>
    <v-layout wrap row v-if="!isWork">
      <!-- 채팅창 -->
      <v-flex xs12 sm7>
        <v-layout wrap>
          <v-flex xs12>
            <v-divider/><h1 class="text-center"> 채팅창 </h1><v-divider/>
          </v-flex>

          <v-flex xs12>
            <v-container v-chat-scroll="{always: true, smooth: true, scrollonremoved:true}" class="overflow-y-auto" style="max-height:600px">
              <v-layout column>
                <v-flex
                xs12
                v-for="message in messages"
                v-if='message.chatId !== "" && message.chatMsg !== "" '
                class="messageBox">
                <v-layout style="justify-content: center;" v-if='message.chatId == "!SYSTEM"'>
                  <div v-html="message.chatMsg" style="background:lightgrey;" class="speech_bubble caption text-center"></div>
                </v-layout>

                  <v-layout justify-end v-if='message.chatId == user'>
                    <div v-if="nowLevel =='2' && !message.isReadCompany">1</div>
                    <div v-if="nowLevel =='3' && !message.isReadUser">1</div>
                    <div style="background:#ffffab;" class="speech_bubble">{{message.chatMsg}}</div>
                  </v-layout>
                  <v-layout v-if='message.chatId !== user && message.chatId !=="!SYSTEM" '>
                    <div v-if="nowLevel =='2' && !message.isReadCompany">1</div>
                    <div v-if="nowLevel =='3' && !message.isReadUser">1</div>
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
      <v-flex xs12 sm5>
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

            <tr v-if="toggleProjectTitle">
              <td>프로젝트 이름</td>
              <td>{{nowChatRoom.projectTitle}}</td>
            </tr>

            <tr @click="changeProjectTerm(nowChatRoom.projectTerm)" v-if="toggleProjectTerm" v-bind:style="{ 'color': ProjectTermColor }">
              <td>프로젝트 기간</td>
              <td>{{nowChatRoom.projectTerm}}</td>
            </tr>
            <tr v-if="!toggleProjectTerm">
              <td>프로젝트 기간</td>
              <td>
                <v-text-field single-line outlined type="date" required v-model="inputProjectTerm" ref="ProjectTermRef" v-on:keyup.esc="cancelProjectTerm()" v-on:keyup.enter="completeProjectTerm(inputProjectTerm)" > </v-text-field>
              </td>
            </tr>

            <tr @click="changePay(nowChatRoom.pay,nowChatRoom.downPayment)" v-if="togglePay" v-bind:style="{ 'color': PayColor  }">
              <td> 급여 </td>
              <td> {{nowChatRoom.pay}} </td>
            </tr>
            <tr v-if="!togglePay">
              <td> 급여 </td>
              <td>
                <v-text-field single-line outlined type="number" required v-model="inputPay" v-on:keyup.esc="cancelPay()" ref="PayRef"  v-on:keyup.enter="completePay(inputPay)" > </v-text-field>
              </td>
            </tr>

            <tr @click="changeDownPayment(nowChatRoom.downPayment,nowChatRoom.pay)" v-if="toggleDownPayment" v-bind:style="{ 'color': DownPaymentColor  }">
              <td> 계약금 </td>
              <td> {{nowChatRoom.downPayment}} </td>
            </tr>
            <tr v-if="!toggleDownPayment">
              <td> 계약금 </td>
              <td>
                <v-text-field single-line outlined type="number" required v-model="inputDownPayment" v-on:keyup.esc="cancelDownPayment()" ref="DownPaymentRef" v-on:keyup.enter="completeDownPayment(inputDownPayment)" > </v-text-field>
              </td>
            </tr>

            <tr>
              <td>잔금 </td>
              <td>{{nowChatRoom.balance}} </td>
            </tr>

            <tr @click="changePenalty(nowChatRoom.penalty)" v-if="togglePenalty" v-bind:style="{ 'color': PenaltyColor  }">
              <td> 위약금 </td>
              <td> {{nowChatRoom.penalty}} </td>
            </tr>
            <tr v-if="!togglePenalty" >
              <td> 위약금 </td>
              <td>
                <v-text-field single-line outlined required v-model="inputPenalty" v-on:keyup.esc="cancelPenalty()" ref="PenaltyRef" v-on:keyup.enter="completePenalty(inputPenalty)" > </v-text-field>
              </td>
            </tr>

            <tr>
              <td> 기업명 </td>
              <td> {{nowChatRoom.companyId}} </td>
            </tr>

            <tr>
              <td>기업주소</td>
              <td>{{nowChatRoom.companyAddr}}</td>
            </tr>

            <tr @click="changeCompany(nowChatRoom.company)" v-if="toggleCompany" v-bind:style="{ 'color': CompanyColor  }">
              <td> 책임자 </td>
              <td> {{nowChatRoom.company}} </td>
            </tr>
            <tr v-if="!toggleCompany">
              <td> 책임자 </td>
              <td>
                <v-text-field single-line outlined required v-model="inputCompany" ref="CompanyRef" v-on:keyup.esc="cancelCompany()" v-on:keyup.enter="completeCompany(inputCompany)" > </v-text-field>
              </td>
            </tr>

            <tr @click="changePhonenumber(nowChatRoom.phonenumber)" v-if="togglePhonenumber" v-bind:style="{ 'color': PhonenumberColor  }">
              <td> 핸드폰번호 </td>
              <td> {{nowChatRoom.phonenumber}} </td>
            </tr>
            <tr v-if="!togglePhonenumber">
              <td> 핸드폰번호 </td>
              <td>
                <v-text-field single-line outlined required v-model="inputPhonenumber" ref="PhonenumberRef" v-on:keyup.esc="cancelPhonenumber()" v-on:keyup.enter="completePhonenumber(inputPhonenumber)" > </v-text-field>
              </td>
            </tr>

            <tr>
              <td> 유저이름 </td>
              <td> {{nowChatRoom.userId}} </td>
            </tr>

          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center v-if="!isWork">
      <v-btn v-if="!changeAllow" depressed color="red" outlined >이미 도장을 찍었습니다!</v-btn>
    </v-layout>

    <v-layout row wrap justify-center v-if="!isWork && isMine()">
      <v-dialog v-model="procedureDialog" scrollable max-width="700px">
      <template v-slot:activator="{ on }">
        <v-btn color="red" dark v-on="on">도장찍기</v-btn>
      </template>

      <v-card outlined>
        <v-card-title>
          <p class="red--text text-center" style="width:100%;">
            <i class="fas fa-exclamation-triangle"/><br/>
            주의! 정말로 도장을 찍을겁니까?<br/>
            <small class="caption">한번 완료하면 되돌릴 수 없습니다.</small>
            <br/>협의된 계약 내용을 확인하세요
          </p>
        </v-card-title>
        <v-card-text>
        <v-flex row wrap justify-center>
          <v-simple-table dense style="width:60%">
            <tbody>
              <tr>
                <th class="text-center" rowspan="4">갑</th>
              </tr>
              <tr>
                <th class="text-center">회사이름</th>
                <td class="text-center">{{nowChatRoom.companyId}}</td>
              </tr>
              <tr>
                <th class="text-center">책임자</th>
                <td class="text-center">{{nowChatRoom.company}}</td>
              </tr>
              <tr>
                <th class="text-center">주소</th>
                <td class="text-center">{{nowChatRoom.companyAddr}}</td>
              </tr>
              <tr>
                <th class="text-center" rowspan="4">을</th>
              </tr>
              <tr>
                <th class="text-center">이름</th>
                <td class="text-center">{{nowChatRoom.userId}}</td>
              </tr>
              <tr>
                <th class="text-center">핸드폰번호</th>
                <td class="text-center">{{nowChatRoom.phonenumber}}</td>
              </tr>

              <tr>
                <th class="text-center" rowspan="7">프로젝트</th>
              </tr>
              <tr>
                <th class="text-center">제목</th>
                <td class="text-center">{{nowChatRoom.projectTitle}}</td>
              </tr>
              <tr>
                <th class="text-center">기간</th>
                <td class="text-center">{{nowChatRoom.projectTerm}}</td>
              </tr>
              <tr>
                <th class="text-center">급여</th>
                <td class="text-center">{{nowChatRoom.pay}}</td>
              </tr>
              <tr>
                <th class="text-center">계약금</th>
                <td class="text-center">{{nowChatRoom.downPayment}}</td>
              </tr>
              <tr>
                <th class="text-center">잔금</th>
                <td class="text-center">{{nowChatRoom.balance}} </td>
              </tr>
              <tr>
                <th class="text-center">위약금</th>
                <td class="text-center">{{nowChatRoom.penalty}}</td>
              </tr>
              <tr>
                <th class="text-center">계약일</th>
                <td class="text-center">{{nowChatRoom.contractDate}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-flex>
      </v-card-text>

        <v-divider></v-divider>
        <v-flex row wrap justify-center>
          <v-btn color="red" text @click="validContract()">도장찍기</v-btn>
          <v-btn color="grey" text dark @click="procedureDialog = false">Close</v-btn>
        </v-flex>
      </v-card>
    </v-dialog>
    </v-layout>

    <v-layout wrap v-if="isWork">
      <!-- 채팅창 -->
      <v-flex xs12>
          <v-divider/><h1 class="text-center"> 채팅창 </h1><v-divider/>
            <v-container v-chat-scroll="{always: true, smooth: true, scrollonremoved:true}" class="overflow-y-auto" style="max-height:700px">
              <v-layout column>
                <v-flex
                xs12
                v-for="message in messages"
                v-if='message.chatId !== "" && message.chatMsg !== "" '
                class="messageBox">
                <v-layout style="justify-content: center;" v-if='message.chatId == "!SYSTEM"'>
                  <div v-html="message.chatMsg" style="background:lightgrey;" class="speech_bubble caption text-center"></div>
                </v-layout>

                  <v-layout justify-end v-if='message.chatId == user'>
                    <div v-if="nowLevel =='2' && !message.isReadCompany">1</div>
                    <div v-if="nowLevel =='3' && !message.isReadUser">1</div>
                    <div style="background:#ffffab;" class="speech_bubble">{{message.chatMsg}}</div>
                  </v-layout>
                  <v-layout v-if='message.chatId !== user && message.chatId !=="!SYSTEM" '>
                    <div v-if="nowLevel =='2' && !message.isReadCompany">1</div>
                    <div v-if="nowLevel =='3' && !message.isReadUser">1</div>
                    <div style="background:#d6ddff;" class="speech_bubble">
                      {{message.chatMsg}}
                    </div>
                  </v-layout>
                <!-- [{{ message.chatId }}] : {{ message.chatMsg }} -->
                </v-flex>
              </v-layout>
            </v-container>

          <v-text-field single-line outlined required v-model="myMessage" v-on:keyup.enter="pushMessage(myMessage)" > </v-text-field>
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
    this.$store.state.no_header = true;
  },
  mounted() {
    this.user = this.$session.get("session_id");
    this.fetchData();
  },
  data() {
    return {
      procedureDialog:false,
      changeAllow : true,
      user : "",
      nowLevel : "",
      nowChatRoom : "", // 내가 현재 접속중인 공고의 채팅방
      myMessage : "", // 내가 입력하는 메시지
      // inputs
      mainData : "",
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
      inputPhonenumber : "",
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
      togglePhonenumber : true,
      isWork : false,

      tmpData : "",
      tmpDataForBalance : "",

      ProjectTermColor : "#000000",
      PayColor : "#000000",
      DownPaymentColor : "#000000",
      PenaltyColor : "#000000",
      CompanyColor : "#000000",
      PhonenumberColor : "#000000",

      OlduserVerification : false,
      OldcompanyVerification : false,
    };
  },

  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      var recruits = await FirebaseService.SELECT_RecruitInfo();
      var allChatRoom = "";
      firebase.database().ref('/chat/').once('value').then( snapshot => {
        this.mainData = snapshot.val();
        allChatRoom = snapshot.val();
        this.OlduserVerification = snapshot.val().userVerification;
        this.OldcompanyVerification = snapshot.val().companyVerification;
        var index = "";
        for(var i in allChatRoom) {
          if ( allChatRoom[i].link == 'chat/'+this.$route.params.ccode ) {
            index = allChatRoom[i]
          }
        }
        if ( index !== "" ) {
          for(var i in recruits) {
            if ( recruits[i].id == index.recruitPK ) {
              if ( recruits[i].data.contract ) {
                this.isWork = true;
              }
            }
          }
          console.log("isWORK? ",this.isWork)
          this.EnterChatRoom(index);
        }
      });
    },

    async EnterChatRoom(myChatRoom) {
      if (this.nowChatRoom !== "") {
        firebase.database().ref(this.nowChatRoom.link).off()
      }
      this.nowChatRoom = myChatRoom
      this.isOnProcedure();
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      firebase.database().ref(this.nowChatRoom.link).on('value', snapshot => {

        this.mainData = snapshot.val();

        this.OlduserVerification = snapshot.val().userVerification;
        this.OldcompanyVerification = snapshot.val().companyVerification;

        if ( this.mainData.isChangeProjectTerm ) this.ProjectTermColor="#E74C3C"
        if ( this.mainData.isChangePay ) this.PayColor="#E74C3C"
        if ( this.mainData.isChangeDownPayment ) this.DownPaymentColor="#E74C3C"
        if ( this.mainData.isChangeCompany ) this.CompanyColor="#E74C3C"
        if ( this.mainData.isChangePenalty ) this.PenaltyColor="#E74C3C"
        if ( this.mainData.isChangePhonenumber ) this.PhonenumberColor="#E74C3C"


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

      },function(error) {
        console.error(error,"채팅장 입장 에러입니다.");
      });
    },

    pushMessage(myMessage) {
      if(myMessage !== "") {
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
      }
    },

    changeProjectTerm(data) {
      this.clearInput();
      this.tmpData = data;
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification)) {
      this.toggleProjectTerm = !this.toggleProjectTerm;
      this.$nextTick(() => this.$refs.ProjectTermRef.focus());
    }
    },
    cancelProjectTerm() {
      this.toggleProjectTerm = !this.toggleProjectTerm;
      this.inputProjectTerm = this.mainData.projectTerm;
    },
    completeProjectTerm() {
      var tmp = this.nowChatRoom.chatting;
        if ( this.tmpData !== this.inputProjectTerm ) {
        tmp.push({ chatMsg : this.$session.get('session_id')+"님이 프로젝트 기간을 ["+this.tmpData+"]에서 ["+this.inputProjectTerm+"]로 변경하였습니다.",
        chatId : "!SYSTEM", isReadCompany : false, isReadUser : false });
      }
      this.toggleProjectTerm = !this.toggleProjectTerm;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        projectTerm : this.inputProjectTerm,
        chatting : tmp,
        isChangeProjectTerm : true,
      });
    },


    changePay(data,downPayment) {
      this.clearInput();
      this.tmpData = data;
      this.tmpDataForBalance = downPayment;
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification)) {
        this.togglePay = !this.togglePay;
        this.$nextTick(() => this.$refs.PayRef.focus());
      }
    },
    cancelPay() {
      this.togglePay = !this.togglePay;
      this.inputPay = this.mainData.pay;
    },
    completePay() {
      var tmp = this.nowChatRoom.chatting;
      if ( this.tmpData !== this.inputPay ) {
      tmp.push({ chatMsg : this.$session.get('session_id')+"님이 급여를 ["+this.tmpData+"]에서 ["+this.inputPay+"]로 변경하였습니다.",
           chatId : "!SYSTEM", isReadCompany : false, isReadUser : false });
      }
      this.togglePay = !this.togglePay;
      var balance = Number(this.inputPay) - Number(this.tmpDataForBalance);
      console.log( Number(this.inputPay) , "aa " , Number(this.tmpDataForBalance))
      console.log(balance , " asd " , typeof(balance))
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        pay : this.inputPay,
        chatting : tmp,
        balance : Number(balance),
        isChangePay : true,
      });
    },

    changeDownPayment(data,Pay) {
      this.clearInput();
      this.tmpData = data;
      this.tmpDataForBalance = Pay;
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification)) {
        this.toggleDownPayment = !this.toggleDownPayment;
        this.$nextTick(() => this.$refs.DownPaymentRef.focus());
      }
    },
    cancelDownPayment() {
      this.toggleDownPayment = !this.toggleDownPayment;
      this.inputDownPayment = this.mainData.DownPayment;
    },
    completeDownPayment() {
      var tmp = this.nowChatRoom.chatting;
      if ( this.tmpData !== this.inputDownPayment ) {
        tmp.push({ chatMsg : this.$session.get('session_id')+"님이 계약금을 ["+this.tmpData+"]에서 ["+this.inputDownPayment+"]로 변경하였습니다.",
        chatId : "!SYSTEM", isReadCompany : false, isReadUser : false });
      }
      this.toggleDownPayment = !this.toggleDownPayment;
      var balance = Number(this.tmpDataForBalance) - Number(this.inputDownPayment);
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        downPayment : this.inputDownPayment,
        chatting : tmp,
        balance : Number(balance),
        isChangeDownPayment : true,
      });
    },

    changePenalty(data) {
      this.clearInput();
      this.tmpData = data;
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification)) {
        this.togglePenalty = !this.togglePenalty;
        this.$nextTick(() => this.$refs.PenaltyRef.focus());
      }
    },
    cancelPenalty() {
      this.togglePenalty = !this.togglePenalty;
      this.inputPenalty = this.mainData.Penalty;
    },
    completePenalty() {
      var tmp = this.nowChatRoom.chatting;
      if ( this.tmpData !== this.inputPenalty ) {
        tmp.push({ chatMsg : this.$session.get('session_id')+"님이 위약금을 ["+this.tmpData+"]에서 ["+this.inputPenalty+"]로 변경하였습니다.",
        chatId : "!SYSTEM", isReadCompany : false, isReadUser : false });
      }
      this.togglePenalty = !this.togglePenalty;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        penalty : this.inputPenalty,
        chatting : tmp,
        isChangePenalty : true,
      });
    },

    changeCompany(data) {
      this.clearInput();
      this.tmpData = data;
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification)) {
        this.toggleCompany = !this.toggleCompany;
        this.$nextTick(() => this.$refs.CompanyRef.focus());
      }
    },
    cancelCompany() {
      this.toggleCompany = !this.toggleCompany;
      this.inputCompany = this.mainData.Company;
    },
    completeCompany() {
      var tmp = this.nowChatRoom.chatting;
      if ( this.tmpData !== this.inputCompany ) {
        tmp.push({ chatMsg : this.$session.get('session_id')+"님이 책임자 명을 ["+this.tmpData+"]에서 ["+this.inputCompany+"]로 변경하였습니다.",
        chatId : "!SYSTEM", isReadCompany : false, isReadUser : false });
      }
      this.toggleCompany = !this.toggleCompany;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        company : this.inputCompany,
        chatting : tmp,
        isChangeCompany: true,
      });
    },

    changePhonenumber(data) {
      this.clearInput();
      this.tmpData = data;
      if( this.nowLevel == "2") {
        if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification)) {
          this.togglePhonenumber = !this.togglePhonenumber;
          this.$nextTick(() => this.$refs.PhonenumberRef.focus());
        }
      }
    },
    cancelPhonenumber() {
      this.togglePhonenumber = !this.togglePhonenumber;
      this.inputPhonenumber = this.mainData.phonenumber;
    },
    completePhonenumber() {
      var tmp = this.nowChatRoom.chatting;
      if ( this.tmpData !== this.inputPhonenumber ) {
        tmp.push({ chatMsg : this.$session.get('session_id')+"님이 주민등록 번호를 ["+this.tmpData+"]에서 ["+this.inputPhonenumber+"]로 변경하였습니다.",
        chatId : "!SYSTEM", isReadCompany : false, isReadUser : false });
      }
      this.togglePhonenumber = !this.togglePhonenumber;
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      dataRef.update({
        rrn : this.inputPhonenumber,
        chatting : tmp,
        isChangePhonenumber : true,
      });
    },
    clearInput() {
      this.toggleProjectTerm = true; this.togglePay = true;this.toggleDownPayment = true;this.toggleBalance = true;this.togglePenalty = true;
      this.toggleContractDate = true;this.toggleCompany = true;this.toggleAddr = true; this.toggleRrn = true;
    },
    validContract(){
      this.$swal('계약 도장!','성공적인 프로젝트를 기원합니다.','success')
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);
      if(this.$session.get("session_id") == this.nowChatRoom.userId){
        // if ( this.OldcompanyVerification ) { // 이미 상대측에서 도장을 찍은 상황이니 채팅창을 닫아주어야함...
          // this.$swal({
          //    title: '계약 도장을 찍으셨습니다!',
          //    html: "상대방이 이미 계약 완료를 누른 상태이므로 <br/> 계약페이지를 종료합니다.",
          //    type: 'success',
          //    showCancelButton: false,
          //    confirmButtonColor: '#3085d6',
          //    confirmButtonText: '삭제',
          //   }).then((result) => {
          //    if (result.value) {
          //      self.close()
          //    }
          //  })
        // } else {
          this.$swal('계약 도장을 찍으셨습니다!','상대방이 계약을 누를때까지 기다려주세요.','success')
        // }
        dataRef.update({
          userVerification : true,
        });
      }else {
        // if ( this.OlduserVerification ) {
        //   this.$swal({
        //      title: '계약 도장을 찍으셨습니다!',
        //      html: "상대방이 이미 계약 완료를 누른 상태이므로 <br/> 계약페이지를 종료합니다.",
        //      type: 'warning',
        //      showCancelButton: false,
        //      confirmButtonColor: '#3085d6',
        //      confirmButtonText: '삭제',
        //     }).then((result) => {
        //      if (result.value) {
        //        self.close()
        //      }
        //    })
        // } else {
          this.$swal('계약 도장!','상대방이 계약을 누를때까지 기다려주세요.','success')
        // }
        dataRef.update({
          companyVerification : true,
        });
      }
      firebase.database().ref(this.nowChatRoom.link).on('value', snapshot => {
        var contractUser = this.nowChatRoom.userId;
        var contractCompany = this.nowChatRoom.companyId;

        console.log("않이 진짜", snapshot.val().contractDate);

        //둘 다 확인을 눌렀다는 것을 현 시점 확인했다!!
        if(snapshot.val().userVerification && snapshot.val().companyVerification && (snapshot.val().contractDate==undefined||snapshot.val().contractDate=="")){
          //리크루트 컬렉션의 상태를 '계약완료된 상태'로 만든다
          FirebaseService.UPDATE_RecruitContract(this.nowChatRoom.recruitPK , contractUser);
          opener.location.reload();

          //계약당사자의 users Collection에서 proceedList를 업데이트 해야한다!
          this.addProceedList(contractUser, this.nowChatRoom.recruitPK );
          firebase.database().ref('/'+this.nowChatRoom.link).update({
            contractDate : new Date(),
          });
          //이것을 찜하고있던 유저들의 찜목록에서 다 지워주기 (계약 당사자 포함)
          var dellist = [];
          firebase.database().ref('/chat/').once('value').then( snapshot => {
            var allChatRoom = snapshot.val();
            for(var i in allChatRoom) {
              if(allChatRoom[i].recruitPK == this.nowChatRoom.recruitPK){
                this.delInFirebase(allChatRoom[i].userId, this.nowChatRoom.recruitPK);
              }
            }
          });
          this.$swal({
             title: '계약 완료!',
             html: "계약이 완료되었으므로 간이 계약페이지를 종료합니다. <br/> 진행페이지를 이용해주세요.",
             type: 'success',
             showCancelButton: false,
             confirmButtonColor: '#3085d6',
             confirmButtonText: '닫기',
            }).then((result) => {
             if (result.value) {
               self.close()
             }
           })
        }
        this.changeAllow = (!(snapshot.val().userVerification || snapshot.val().companyVerification));
      })
      this.changeAllow =this.isOnProcedure();
      this.procedureDialog = false;
    },

    async delInFirebase(userid, rePK){
      var oldDibs = await FirebaseService.SELECT_UserDibs(userid);
      oldDibs.splice(oldDibs.indexOf(rePK), 1);
      FirebaseService.UPDATE_UsersDibsToDel(userid, oldDibs);
    },

    async addProceedList(userId, rePK){
      var proceedList = await FirebaseService.SELECT_UserProceedList(userId);
      proceedList.push(rePK);
      console.log("요걸로 업데이트할것이다!", proceedList);
      FirebaseService.UPDATE_UserProceedList(userId, proceedList);
    },

    isOnProcedure(){
      if(this.$session.get("session_id") == this.nowChatRoom.userId){
        this.changeAllow = !(this.nowChatRoom.userVerification);
      }else{
        this.changeAllow = !(this.nowChatRoom.companyVerification);
      }
    },
    isMine() {
      if ( this.$store.getters.getLevel == 2 && !this.nowChatRoom.userVerification ) {
        return true;
      } else if (this.$store.getters.getLevel == 3 && !this.nowChatRoom.companyVerification) {
        return true;
      } else {
        return false;
      }
    }
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

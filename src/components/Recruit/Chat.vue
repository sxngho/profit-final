<template>
  <v-container>
    <v-layout wrap v-if="!isWork">
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
                    <div v-if="!message.isReadUser">1</div>
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
              <td> 계약일</td>
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

    <v-layout row wrap justify-center v-if="!isWork">
      <v-btn v-if="!changeAllow" depressed color="red" outlined >이미 도장을 찍었습니다!</v-btn>
    </v-layout>

    <v-layout row wrap justify-center v-if="!isWork">
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
                <th class="text-center">주민번호</th>
                <td class="text-center">{{nowChatRoom.rrn}}</td>
              </tr>
              <tr>
                <th class="text-center">주소</th>
                <td class="text-center">{{nowChatRoom.addr}}</td>
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
                    <div v-if="!message.isReadUser">1</div>
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
    this.user = this.$session.get("session_id");
    this.$store.state.no_header = true;
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

      isWork : false,
    };
  },

  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      var recruits = await FirebaseService.SELECT_RecruitInfo();
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
        // this.changeAllow = (!(snapshot.val().userVerification || snapshot.val().companyVerification));
        // console.log("띠요오옹 ",this.changeAllow);
        // console.log(snapshot.val().userVerification,snapshot.val().companyVerification);
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
        // TODO auto scroll
        // let targetscroll = documnet.getElementById('scrolling');
        // targetscroll.scrollTop = 20;

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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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
      if(!(this.nowChatRoom.userVerification || this.nowChatRoom.companyVerification))
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

    validContract(){
      var dataRef = firebase.database().ref('/'+this.nowChatRoom.link);

      if(this.$session.get("session_id") == this.nowChatRoom.userId){
        dataRef.update({
          userVerification : true,
        });
      }else{
        dataRef.update({
          companyVerification : true,
        });
      }
      firebase.database().ref(this.nowChatRoom.link).on('value', snapshot => {
        var contractUser = this.nowChatRoom.userId;
        var contractCompany = this.nowChatRoom.companyId;

        //둘 다 확인을 눌렀다는 것을 현 시점 확인했다!!
        if(snapshot.val().userVerification && snapshot.val().companyVerification){
          //리크루트 컬렉션의 상태를 '계약완료된 상태'로 만든다
          FirebaseService.UPDATE_RecruitContract(this.nowChatRoom.recruitPK , contractUser);

          //계약당사자의 users Collection에서 proceedList를 업데이트 해야한다!
          this.addProceedList(contractUser, this.nowChatRoom.recruitPK );

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
      proceedList.push(rePK);;
      FirebaseService.UPDATE_UserProceedList(userId, proceedList);
    },

    isOnProcedure(){
      if(this.$session.get("session_id") == this.nowChatRoom.userId){
        this.changeAllow = !(this.nowChatRoom.userVerification);
      }else{
        this.changeAllow = !(this.nowChatRoom.companyVerification);
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

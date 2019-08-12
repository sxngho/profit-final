<template>
  <div style="width:90%;">
    <!--pin img -->
    <div style="position:relative">
      <div style="position:absolute; top:-73px; right:-65px; z-index:3;">
        <!-- <img src="https://i.imgur.com/dSQEMtT.png" alt="g"/> -->
        <img src="https://i.imgur.com/gTQZzck.png" alt="gg" style="width:140px; -ms-transform: rotateY(180deg);-webkit-transform: rotateY(180deg); transform: rotateY(180deg);"/>
      </div>
    </div>

    <!-- 작업중인 리스트 -->
    <div style="width:100%" v-if="proceedList.length>0">
      <div>
        <p style="width:100%; text-align: center;" class="display-1 font-weight-bold">진행중인 프로젝트</p>
      </div>
      <v-layout row wrap style="margin:20px 0;" v-for="recruit in proceedList">
        <v-card outlined style="width:100%; padding:12px;">
          <div class="subtitle-1" v-if="!((recruit.UserComplete == 2 && recruit.CompanyComplete == 0)|| (recruit.UserComplete == 0 && recruit.CompanyComplete == 2) || (recruit.UserComplete == 1 || recruit.CompanyComplete == 1))">
            <span class="headline font-weight-bold">{{recruit.projectTitle}}</span>
            <span class="caption grey--text">&nbsp;{{recruit.companyId}}</span>
            <br/>
            <div style="display:block;">
              <p style="width:100%;" class="text-center display-1 purple--text">
                D-{{recruit.projectTerm}}
              </p>
              <p style="width:100%;" class="text-center title">
                {{recruit.pay}}
              </p>
            </div>
          </div>

          <div v-else>
            <span class="headline font-weight-bold">{{recruit.projectTitle}}</span>
            <span class="caption grey--text">&nbsp;{{recruit.companyId}}</span>
            <br/>
            <div style="display:block;">
              <p style="width:100%;" class="text-center title grey--text">
                D-{{recruit.projectTerm}}3<br/>
                {{recruit.pay}}
              </p>
            </div>
          </div>

          <div>
            <p style="width:100%;" class="text-center headline">
              <span  v-if="recruit.UserComplete == 2 && recruit.CompanyComplete == 0">
                완료 처리되었습니다.<br/> 상대방의 처리를 기다리는중입니다.
              </span>
              <span v-if="recruit.UserComplete == 0 && recruit.CompanyComplete == 2">
                상대방이 완료를 누른 상태입니다. 계약이 정상적으로 종료되었다면 완료를 눌러주세요.
              </span>
              <div v-if="recruit.UserComplete == 1">
                <p> 유저 측의 사유로 파기된 계약입니다. </p>
              </div>
              <div v-if="recruit.CompanyComplete == 1">
                <p> 기업 측의 사유로 파기된 계약입니다. </p>
              </div>
            </p>
          </div>

          <v-container>
            <v-layout row wrap>
              <v-spacer/>
              <div v-if="recruit.UserComplete == 0 && recruit.CompanyComplete == 0">
                <v-btn @click="complete(recruit,recruit.CompanyComplete)" style="margin-right:3px;" outlined color="blue">완료</v-btn>
                <v-btn @click="popContract('test')" style="margin-right:3px;" outlined color="orange">계약서</v-btn>
                <v-btn @click="popChat(recruit)" style="margin-right:3px;" outlined color="orange">채팅창</v-btn>
                <v-btn @click="cancel(recruit)" style="margin-right:3px;" outlined color="red">계약파기</v-btn>
              </div>
              <div v-if="recruit.UserComplete == 2 && recruit.CompanyComplete == 0">
                <p> 완료 처리됨 : 상대방의 처리를 기다리는중</p>
                <v-btn @click="popContract('test')" style="margin-right:3px;" outlined color="orange">계약서</v-btn>
                <v-btn @click="popChat(recruit)" style="margin-right:3px;" outlined color="orange">채팅창</v-btn>
              </div>
              <div v-if="recruit.UserComplete == 0 && recruit.CompanyComplete == 2">
                <p> 상대방이 완료를 누른 상태입니다. 계약이 정상적으로 종료되었다면 완료를 눌러주세요.</p>
                <v-btn @click="complete(recruit,recruit.CompanyComplete)" style="margin-right:3px;" outlined color="blue">완료</v-btn>
                <v-btn @click="popContract('test')" style="margin-right:3px;" outlined color="orange">계약서</v-btn>
                <v-btn @click="popChat(recruit)" style="margin-right:3px;" outlined color="orange">채팅창</v-btn>
              </div>
              <div v-if="recruit.UserComplete == 1">
                <p> 기업측의 사유로 파기된 계약입니다. </p>
              </div>
              <div v-if="recruit.CompanyComplete == 1">
                <p> 기업측의 사유로 파기된 계약입니다. </p>
              </div>
            </v-layout>
          </v-container>

        </v-card>
      </v-layout>
    </div>

    <!-- 두 리스트 사이 여백 -->
    <v-layout row style="margin:20px"  v-if="proceedList.length>0"/>

      <!-- 찜 리스트 -->
      <div style="width:100%"  v-if="Dibs.length>0">
        <div>
          <p class="text-center display-1 font-weight-bold">찜리스트</p>
        </div>
        <v-layout row wrap v-for="recruit in Dibs" style="margin:20px 0;">
            <v-card outlined style="width:100%; padding:12px;">
              <div class="subtitle-1">
                <span class="headline font-weight-bold">{{recruit.data.projectTitle}}</span>
                <span class="caption grey--text">&nbsp;{{recruit.data.companyId}}</span>
                <!-- <h2>{{recruit.data.projectTitle}} </h2>
                {{recruit.data.companyId}} -->
                <div>
                  <v-chip v-for="skill in recruit.data.requiredSkills" small outlined style="margin:auto;">
                    {{skill}}
                  </v-chip>
                </div>
                <div>
                  <p style="width:100%;" class="text-center headline">
                    <span> {{recruit.data.budget}}</span><br/>
                    <span class="overline grey--text">{{recruit.data.endDay}}</span>
                    <br/>
                    <span class="caption grey--text">{{recruit.data.projectSummary}}</span>
                  </p>
                </div>
              </div>
              <v-container>
                <v-layout row wrap>
                  <v-spacer/>
                  <v-btn style="margin-right:3px;" @click="popDibChat(recruit)" outlined color="orange">채팅방</v-btn>
                </v-layout>
              </v-container>
            </v-card>
        </v-layout>
      </div>
    </v-layout>


      <!-- 완료 리스트 -->
      <div style="width:100%" v-if="completeList.length>0">
        <div>
          <p style="width:100%; text-align: center;" class="display-1 font-weight-bold">완수한 프로젝트</p>
        </div>
        <v-layout row wrap style="margin:20px 0;" v-for="recruit in completeList">
          <v-card outlined style="width:100%; padding:12px;">
            <div class="subtitle-1" v-if="!((recruit.UserComplete == 2 && recruit.CompanyComplete == 0)|| (recruit.UserComplete == 0 && recruit.CompanyComplete == 2) || (recruit.UserComplete == 1 || recruit.CompanyComplete == 1))">
              <span class="headline font-weight-bold">{{recruit.projectTitle}}</span>
              <span class="caption grey--text">&nbsp;{{recruit.companyId}}</span>
              <br/>
              <div style="display:block;">
                <p style="width:100%;" class="text-center display-1 purple--text">
                  D-{{recruit.projectTerm}}
                </p>
                <p style="width:100%;" class="text-center title">
                  {{recruit.pay}}
                </p>
              </div>
            </div>

            <div v-else>
              <span class="headline font-weight-bold">{{recruit.projectTitle}}</span>
              <span class="caption grey--text">&nbsp;{{recruit.companyId}}</span>
              <br/>
              <div style="display:block;">
                <p style="width:100%;" class="text-center title grey--text">
                  D-{{recruit.projectTerm}}3<br/>
                  {{recruit.pay}}
                </p>
              </div>
            </div>

          </v-card>
        </v-layout>
      </div>

      <!-- 파기 리스트 -->
      <div style="width:100%" v-if="delList.length>0">
        <div>
          <p style="width:100%; text-align: center;" class="display-1 font-weight-bold">파기된 공고</p>
        </div>
        <v-layout row wrap style="margin:20px 0;" v-for="recruit in delList">
          <v-card outlined style="width:100%; padding:12px;">
            <div class="subtitle-1" v-if="!((recruit.UserComplete == 2 && recruit.CompanyComplete == 0)|| (recruit.UserComplete == 0 && recruit.CompanyComplete == 2) || (recruit.UserComplete == 1 || recruit.CompanyComplete == 1))">
              <span class="headline font-weight-bold">{{recruit.projectTitle}}</span>
              <span class="caption grey--text">&nbsp;{{recruit.companyId}}</span>
              <br/>
              <div style="display:block;">
                <p style="width:100%;" class="text-center display-1 purple--text">
                  D-{{recruit.projectTerm}}
                </p>
                <p style="width:100%;" class="text-center title">
                  {{recruit.pay}}
                </p>
              </div>
            </div>

            <div v-else>
              <span class="headline font-weight-bold">{{recruit.projectTitle}}</span>
              <span class="caption grey--text">&nbsp;{{recruit.companyId}}</span>
              <br/>
              <div style="display:block;">
                <p style="width:100%;" class="text-center title grey--text">
                  D-{{recruit.projectTerm}}3<br/>
                  {{recruit.pay}}
                </p>
              </div>
            </div>

          </v-card>
        </v-layout>
      </div>

  </div>
</template>

<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default {
  name: "Studio",
  components: {
  },
  data() {
    return {
      nowLevel : "",
      userid : "",
      userdata : "",
      myDibs : "",
      recruits : "",
      Dibs : [],
      proceedList:[],
      completeList : [],
      delList : [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      this.userid = this.$session.get('session_id');
      this.$store.commit('setSession', this.userid)
      this.userdata = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      this.recruits = await FirebaseService.SELECT_RecruitInfo();
      var userProceedList = await FirebaseService.SELECT_UserProceedList(this.$session.get('session_id'));
      this.myDibs = this.userdata[0].dibs;
      for(var i in this.recruits) {
        if(this.myDibs.includes(this.recruits[i].id)){
          this.Dibs.push(this.recruits[i]);
        }
      }
      var allChatRoom="";
      firebase.database().ref('/chat/').once('value').then( snapshot => {
        allChatRoom = snapshot.val();
        this.completeList = [];
        this.delList = [];
        this.proceedList = [];
        for(var i in allChatRoom) {
          if ( allChatRoom[i].userId == this.$session.get('session_id') && allChatRoom[i].UserComplete == 2 && allChatRoom[i].CompanyComplete == 2) {
            this.completeList.push(allChatRoom[i]);
          } else if (allChatRoom[i].userId == this.$session.get('session_id') && (allChatRoom[i].UserComplete == 1 || allChatRoom[i].CompanyComplete == 1)) {
            this.delList.push(allChatRoom[i]);
          }
        }
        for(var j in userProceedList)
          for(var i in allChatRoom) {
            if ( allChatRoom[i].recruitPK == userProceedList[j] && allChatRoom[i].userId == this.$session.get('session_id') &&  allChatRoom[i].UserComplete !== 1 && allChatRoom[i].CompanyComplete !== 1 && ( allChatRoom[i].UserComplete !== 2 || allChatRoom[i].CompanyComplete !== 2 ) ) {
              this.proceedList.push(allChatRoom[i]);
              break;
          }
        }
      });
      firebase.database().ref('/chat/').on('value', snapshot => {
        allChatRoom = snapshot.val();
        this.completeList = [];
        this.delList = [];
        this.proceedList = [];
        for(var i in this.myDibs) {
          if ( this.myDibs[i].contract ) {
            this.myDibs.splice(i,1);
          }
        }
        for(var i in allChatRoom) {
          if ( allChatRoom[i].userId == this.$session.get('session_id') && allChatRoom[i].UserComplete == 2 && allChatRoom[i].CompanyComplete == 2) {
            this.completeList.push(allChatRoom[i]);
          } else if (allChatRoom[i].userId == this.$session.get('session_id') && (allChatRoom[i].UserComplete == 1 || allChatRoom[i].CompanyComplete == 1)) {
            this.delList.push(allChatRoom[i]);
          }
        }
        for(var j in userProceedList)
          for(var i in allChatRoom) {
            if ( allChatRoom[i].recruitPK == userProceedList[j] && allChatRoom[i].userId == this.$session.get('session_id') &&  allChatRoom[i].UserComplete !== 1 && allChatRoom[i].CompanyComplete !== 1 && ( allChatRoom[i].UserComplete !== 2 || allChatRoom[i].CompanyComplete !== 2 ) ) {
              this.proceedList.push(allChatRoom[i]);
              break;
          }
        }
        // console.log(this.proceedList);
        // console.log(this.delList);
        // console.log(this.completeList);
      });
    },
    complete(recruit,companyState) {
      this.$swal({
         title: '정말 계약을 완료하시겠습니까?',
         text: "한번 완료한 계약은 수정이 불가능합니다.",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '완료',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('프로젝트 완료!','성공적인 프로젝트이셨나요?','success')
           FirebaseService.UPDATE_RecruitCompleteByUser(recruit.recruitPK,"success",companyState)
           var dataRef = firebase.database().ref('/'+recruit.link);
           dataRef.update({
             UserComplete : 2,
           });
           window.reload();
         }
       })
    },
    cancel(recruit) {
      this.$swal({
         title: '정말 계약을 파기하시겠습니까?',
         text: "한번 파기한 계약은 수정이 불가능합니다.",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '파기',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('프로젝트 실패','프로젝트 계약이 파기되었습니다.','error')
           FirebaseService.UPDATE_RecruitCompleteByUser(recruit.recruitPK,"fail")
           var dataRef = firebase.database().ref('/'+recruit.link);
           dataRef.update({
             UserComplete : 1,
           });
           window.reload();
         }
       })
    },
    popChat(ccode){
      this.createChatRoom(ccode);
      var curl = ccode.link
      window.open(
        "../" + curl,
        curl,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },

    popDibChat(ccode){
      this.createChatRoom(ccode);
      var curl = ccode.id+ this.$session.get('session_id');
      window.open(
        "../chat/" + curl,
        curl,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    async createChatRoom(recruit) {
      var nickname = this.$session.get('session_id');
      var exist = await this.existChatRoom(recruit,nickname);

      var ar1 = recruit.data.createDay.split('-');
      var ar2 = recruit.data.endDay.split('-');
      var da1 = new Date(ar1[0], ar1[1], ar1[  2]);
      var da2 = new Date(ar2[0], ar2[1], ar2[2]);
      var dif = da2 - da1;
      var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
      var user = await FirebaseService.SELECT_Userdata(nickname);
      var company = await FirebaseService.SELECT_CompanyInfo(recruit.data.companyId);
      console.log( user[0].phonenumber , " 유저핸드폰번호 저장될거" )
      console.log(company[0].address , "주소")
      console.log(recruit.data.chief , " 책임자")
      if ( !exist.res ) {
        // INIT CHATROOM
        firebase.database().ref('chat/'+recruit.id+nickname).set({
          link : 'chat/'+recruit.id+nickname,
          recruitPK : recruit.id,
          chatting : [{chatMsg:"<< SYSTEM >><br/>외주 공고 협의 채팅창입니다. <br/> 간이 계약서 패드를 활용하여 계약내용을 <br/> 조율하고 계약을 진행해보세요!",chatId:"!SYSTEM", isReadCompany : false, isReadUser : false},
        ],

          projectTitle : recruit.data.projectTitle,
          projectTerm : cDay,
          pay : recruit.data.budget,
          downPayment : Number(recruit.data.budget) * 0.2,
          balance : Number(recruit.data.budget) - Number(recruit.data.budget) * 0.2,
          penalty : recruit.data.penalty,
          contractDate : "",

          // company
          companyId : recruit.data.companyId,
          companyAddr : company[0].address,
          company : recruit.data.chief , //책임자

          //user
          phonenumber : user[0].phonenumber,
          userId : nickname,

          companyVerification : false,
          userVerification: false,
          UserComplete : 0,
          CompanyComplete : 0,

          isChangeProjectTerm : false,
          isChangePay : false,
          isChangeDownPayment : false,
          isChangePenalty : false,
          isChangeCompany : false,
          isChangePhonenumber : false,

        });
      }
    },

    async existChatRoom(recruit,nickname) {
      return firebase.database().ref('/chat/').once('value').then( snapshot => {
        var chats = snapshot.val();
        for(var i in chats) {
          if ( this.nowLevel == "2" ) {
            if ( chats[i].recruitPK == recruit.id && chats[i].userId == nickname ) {
              // console.log("유저접근 :: 이미 방이 존재하므로 바로 이동합니다.")
              return { res : true , index : chats[i] };
            }
          } else if ( this.nowLevel == "3" ) {
            if ( chats[i].recruitPK == recruit.id && chats[i].companyId == nickname ) {
              // console.log("회사접근 :: 이미 방이 존재하므로 바로 이동합니다.")
              return { res : true , index : chats[i] };
            }
          }
        }
        return { res : false };
      });
    },

    popConsult(ccode){
      window.open(
        "../consult/" + ccode,
        ccode,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    },
    popContract(ccode){
      window.open(
        "../contract/" + ccode,
        ccode,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    },
  },

};

</script>

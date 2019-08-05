<template>
  <div>

    <v-container wrap >
      <!-- 작업중 리스트 -->
      <div>
        <h1>작업중인 리스트</h1>
        <v-layout row wrap style="margin:20px 0;" v-for="recruit in proceedList">
            <v-card outlined style="width:100%">
              <v-card-title>
                {{recruit.projectTitle}}
              </v-card-title>
              <v-card-text>
                {{recruit.projectTerm}}
                {{recruit.pay}}
                {{recruit.companyId}}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="cancle()" outlined color="red">계약파기</v-btn>
                <v-btn @click="complete()" outlined color="blue">완료</v-btn>
                <v-btn @click="popChat('test')" outlined color="orange">채팅창</v-btn>
                <v-btn @click="popContract('test')" outlined color="orange">계약서</v-btn>
              </v-card-actions>
            </v-card>
        </v-layout>
      </div>

      <v-layout row style="margin:20px"/>

      <!-- 찜 리스트 -->
      <div>
        <h1>찜 리스트</h1>
        <v-layout row wrap v-for="recruit in Dibs" style="margin:20px 0;">
            <v-card outlined style="width:100%">
              <v-card-title>
                타이틀 : {{recruit.data.projectTitle}}
              </v-card-title>
              <v-card-text>
                회사명, 기술 스택들, 요약, 마감기간
              </v-card-text>
              <v-card-actions>
                <v-btn @click="popChat(recruit)" outlined color="orange">채팅방</v-btn>
              </v-card-actions>
            </v-card>
        </v-layout>
      </div>

    </v-container>
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
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      this.userid = this.$session.get('session_id');
      if (this.nowLevel !==2) {
        alert('권한이 없습니다. 필요 level : 2 (유저)')
        location.href=`${document.location.origin}`
      }
      this.userdata = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      this.recruits = await FirebaseService.SELECT_RecruitInfo();
      var userProceedList = await FirebaseService.SELECT_UserProceedList(this.$session.get('session_id'));
      this.myDibs = this.userdata[0].dibs;
      for(var i in this.recruits){
        if(this.myDibs.includes(this.recruits[i].id)){
          this.Dibs.push(this.recruits[i]);
        }
      }
      var allChatRoom="";
      firebase.database().ref('/chat/').once('value').then( snapshot => {
        allChatRoom = snapshot.val();
        for(var j in userProceedList)
          for(var i in allChatRoom) {
            if ( allChatRoom[i].recruitPK == userProceedList[j]) {
              this.proceedList.push(allChatRoom[i]);
              break;
          }
        }
      });
    },
    popChat(ccode){

      this.createChatRoom(ccode);

      var curl = ccode.id+ this.$session.get('session_id');
      window.open(
        "../chat/" + curl,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },

    async createChatRoom(recruit) {
      var nickname = this.$session.get('session_id');
      var exist = await this.existChatRoom(recruit,nickname);
      console.log(exist,"exist!");
      if ( exist.res ) {

      }
      else if ( !exist.res ) {
        // INIT CHATROOM
        firebase.database().ref('chat/'+recruit.id+nickname).set({
          link : 'chat/'+recruit.id+nickname,
          recruitPK : recruit.id,
          chatting : [{chatMsg:"",chatId:""}],
          projectTitle : recruit.data.projectTitle,
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
          companyVerification : false,
          userVerification: false,
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
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    },
    popContract(ccode){
      window.open(
        "../contract/" + ccode,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    },
  },

};

</script>

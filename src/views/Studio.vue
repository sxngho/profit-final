<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout><v-flex style="margin:30px;" /></v-layout>

    <v-container row wrap >
      <!-- 작업중 리스트 -->
      <div>
        <h1>작업중인 리스트</h1>
        <v-layout row wrap>
          <v-flex xs4 style="background:white;">
            <v-card outlinedd>
              <v-card-title>
                프젝이름
              </v-card-title>
              <v-card-text>
                남은기간, 페이, 회사이름
              </v-card-text>
              <v-card-actions>
                <v-btn>완료</v-btn>
                <v-btn @click="popChat('test')">채팅창</v-btn>
                <v-btn @click="popContract('test')">계약서</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

      <v-divider/>

      <!-- 찜 리스트 -->
      <div>
        <h1>찜 리스트</h1>
        <v-layout row wrap>
          <v-flex xs4 v-for="recruit in recruits" v-if="myDibs.includes(recruit.id)">
            <v-card>
              <v-card-title>
                타이틀 : {{recruit.data.title}}
              </v-card-title>
              <v-card-text>
                회사명, 기술 스택들, 요약, 마감기간
              </v-card-text>
              <v-card-actions>
                <v-btn @click="popChat(recruit)">채팅방</v-btn>
                <v-btn @click="popConsult('test')">협의내용</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

      <v-divider/>
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
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.nowLevel = this.$session.get('level');
      this.userid = this.$session.get('session_id');
      this.userdata = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      this.recruits = await FirebaseService.SELECT_Recruit();
      this.myDibs = this.userdata[0].dibs;
    },
    popChat(ccode){

      this.createChatRoom(ccode);

      var curl = ccode.id+ this.$session.get('session_id');
      window.open(
        "../chat/" + curl,
        "name(이름지정)",
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
      );
    },

    async createChatRoom(recruit) {
      var nickname = this.$session.get('session_id');
      var exist = await this.existChatRoom(recruit,nickname);
      if ( exist.res ) {

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

<style>
</style>

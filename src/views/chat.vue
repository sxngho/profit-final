<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout><v-flex style="margin:30px;" /></v-layout>
    <div>
      <v-layout col wrap>
      <v-flex v-for="recruit in recruits" d-inline-block
      style="cursor:pointer;border:1px solid #cecece; padding:2px 10px; border-radius:8px; margin:2px 4px;"
      v-on:click="createChatRoom(recruit)">
        {{recruit.data.title}}
      </v-flex>
      </v-layout>

      <v-layout row wrap>
      <v-flex xs12 v-for="myChatRoom in myChatRooms" d-inline-block
      style="cursor:pointer;border:1px solid #cecece; padding:2px 10px; border-radius:8px; margin:2px 4px;"
      v-on:click="EnterChatRoom(myChatRoom)">
        {{myChatRoom.title}}의 채팅방
      </v-flex>
      </v-layout>

      <v-layout row wrap v-if='nowChatRoom !== "" '>
        <v-flex xs12 v-for="message in messages" v-if='message.chatId !== "" && message.chatMsg !== "" '>
         {{ message.chatMsg }} - {{ message.chatId }}
        </v-flex>
        <v-flex xs12>
        <v-text-field single-line outline required v-model="myMessage" v-on:keyup.enter="pushMessage(myMessage)" > </v-text-field>
      </v-flex>
      </v-layout>

<!--
      <p> -----------------------------</p>
      {{recruits}}
        <p> -----------------------------</p>
      {{myChatRooms}}
        <p> -----------------------------</p>
      {{messages}}
        <p> -----------------------------</p> -->
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
// import Projects from "../components/MainPage/Projects";

export default {
  name: "chat",
  data() {
    return {
      recruits : "",
      chatRooms : "",
      myChatRooms : [],
      chas : "",
      recruitPK : "",
      nowChatRoom : "",
      messages : "",
      myMessage : "",
    };
  },
  components: {
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
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
    },
    async existChatRoom(recruit,nickname,userId) {
      firebase.database().ref('/chat/').once('value').then(function(snapshot) {
        var chats = snapshot.val();
        // console.log(chats,"존재하는지에대한 결과값을 나타내는 콘솔로그입니다");
        for(var i in chats) {
          if ( chats[i].recruitPK == recruit && chats[i].userId == userId ) {
            console.log("이미 존재하는 채팅방이야");
            this.EnterChatRoom(chats[i])
            return true;
          }
        }
        return false;
      });
    },
    async createChatRoom(recruit) {
      var userId = this.$session.get('session_id');
      var nicknameIndex = userId.indexOf("@");
      var nickname = userId.substring(0,nicknameIndex);
      var exist = await this.existChatRoom(recruit.id,nickname,userId);
      if ( !exist ) {
        firebase.database().ref('chat/'+recruit.id+nickname).set({
          link : 'chat/'+recruit.id+nickname,
          recruitPK : recruit.id,
          userId : this.$session.get('session_id'),
          chatting : [{chatMsg:"",chatId:""}],
          title : recruit.data.title,
        });
      }
    },
    EnterChatRoom(myChatRoom) {
      if (this.nowChatRoom !== "") {
        firebase.database().ref(this.nowChatRoom.link).off()
      }
      this.nowChatRoom = myChatRoom
        firebase.database().ref(this.nowChatRoom.link).on('value', snapshot => {
            this.messages = snapshot.val().chatting;
            console.log(this.messages,"메시지 들어왔어요")
            this.nowChatRoom = snapshot.val();
          },function(error) {
            console.error(error,"채팅장 입장 에러입니다.");
        });
    },
    pushMessage(myMessage) {
      var tmp = this.nowChatRoom.chatting;
      tmp.push({ chatMsg : myMessage, chatId : this.$session.get('session_id') });
      firebase.database().ref('/'+this.nowChatRoom.link).set({
        link : this.nowChatRoom.link,
        recruitPK : this.nowChatRoom.recruitPK,
        userId : this.nowChatRoom.userId,
        chatting : tmp,
        title : this.nowChatRoom.title,
      });
      this.myMessage = "";
    },
  },
};
</script>
<style>
</style>

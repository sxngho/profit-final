<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout><v-flex style="margin:30px;" /></v-layout>
    <div>
      <v-flex v-for="recruit in recruits" d-inline-block
      style="cursor:pointer;border:1px solid #cecece; padding:2px 10px; border-radius:8px; margin:2px 4px;"
      v-on:click="createChatRoom(recruit)">
        {{recruit}}
      </v-flex>
      <v-flex xs12 v-for="chatRoom in chatRooms" d-inline-block>
        {{chatRoom}}
      </v-flex>

      <v-flex>
        {{myChatRooms}}
      </v-flex>
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
          // for(var i in this.chatRooms) {
          //   console.log(this.chatRooms[i].userId,"유저")
          //   if(this.chatRooms[i].userId == this.$session.get('session_id')) {
          //     this.myChatRooms.push(this.chatRooms[i]);
          //   }
          // }
        },function(error) {
          console.error(error,"에러에러에러");
      });
    },
    async existChatRoom(recruit,nickname,userId) {
      firebase.database().ref('/chat/').once('value').then(function(snapshot) {
        var chats = snapshot.val();
        // console.log(chats,"존재하는지에대한 결과값을 나타내는 콘솔로그입니다");
        for(var i in chats) {
          if ( chats[i].recruitPK == recruit && chats[i].userId == userId ) {
            console.log("이미 존재하는 채팅방이야");
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
      var exist = await this.existChatRoom(recruit,nickname,userId);
      firebase.database().ref('chat/'+recruit+nickname).set({
        recruitPK : recruit,
        userId : this.$session.get('session_id'),
        messages : "",
      });

      // if ( !exist ) {
      //   FirebaseService.INSERT_ChatRoom(recruit,this.$session.get('session_id'));
      // }
    },
  },
};
</script>

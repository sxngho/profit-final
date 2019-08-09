<template>
  <div class="display:inline">
    <!-- 로그인 버튼 -->
    <v-dialog v-model="dialog" max-width="600px" v-if=" user== '' || user == undefined ">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" style="height:56px;">로그인</v-btn>
      </template>


      <v-container class="signmodal">

        <v-layout row wrap style="padding:10px 20px;">
          <v-spacer/>
          <span class="font-weight-regular headline">로그인</span>
          <v-spacer/>
        </v-layout>


        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="ID" required v-model="LoginId"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Password"
                  type="password"
                  required
                  v-model="LoginPassword"
                  @keyup.enter="dialog = false, Signin(LoginId, LoginPassword)"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn rounded color="#4267b2" dark @click="SigninFacebook()" style="width:100%;">
            <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook으로 로그인하기
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false, Signin(LoginId, LoginPassword)">로그인</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-container>
    </v-dialog>

    <!-- 회원가입 버튼 -->
    <v-dialog v-model="signupmodal" max-width="500px" v-if=" user== '' || user == undefined ">
      <template v-slot:activator="{ on: { click } }">
        <v-btn text v-on:click="click" style="height:56px;">회원가입</v-btn>
      </template>

      <v-container class="signmodal">
        <v-layout row wrap style="padding:10px 20px;">
          <v-spacer/>
          <span class="font-weight-regular headline">회원가입</span>
          <v-spacer/>
        </v-layout>

        <v-layout row wrap style="padding:20px 20px;" justify-center>
          <SignupforUserModal v-on:signup="signupsuccess" />
          <SignupforCompanyModal v-on:signup="signupsuccess" />
        </v-layout>

        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="signupmodal=false">닫기</v-btn>
        </v-card-actions>
      </v-container>
    </v-dialog>

    <!-- 로그인 이후, 사용자 이름과 로그아웃 버튼 -->
    <div style="display:inline-block; height:100%" v-if="user !=='' && user !==undefined">

      <v-btn text v-if="(nowLevel == '0' || nowLevel =='1') && user !=='' && user !== undefined "
        style="height:56px;">
        {{user}}
      </v-btn>

      <v-btn text v-if="nowLevel == '2' && user !=='' && user !== undefined " :to="{ name: 'story', params: { id: user }}"
        style="height:56px;" >
        {{user}}
      </v-btn>

      <v-btn text v-if="nowLevel == '3' && user !=='' && user !== undefined" :to="{ name: 'company', params: { id: user }}"
        style="height:56px;">
        {{user}}
      </v-btn>

      <v-btn text @click="Logout()" v-if="user!=='' && user!==undefined" style="height:56px;">
        Log Out
      </v-btn>

      <v-menu offset-y v-if="nowLevel == '2' && user !=='' && user !== undefined ">
        <template v-slot:activator="scope">
          <v-btn icon v-on="scope.on">
            <v-badge color="red" overlap>
              <template slot="badge"> {{$store.getters.getalertList.unread.length}} </template>
              <v-icon color="black"> notifications </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list dense>
            <v-list-item v-for="(alert, index) in this.$store.getters.getalertList.alert.slice().reverse()">
              <v-list-item-content>
                <v-btn text style="padding:1px 0">
                  <v-list-item-title :style="{color:colorcheck(alert.check)}" v-html="alert.message" @click="move(alert.check, alert.url, index,alert.user)"></v-list-item-title>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    </div>
</template>

<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import SignupforCompanyModal from "./SignUpForCompany";
import SignupforUserModal from "./SignUpForUser";
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default {
  data: () => ({
    user: "",
    dialog: false,
    signupmodal: false,
    alertModal : false,
    userpage: "",
    LoginId: "",
    LoginPassword: "",
    alertlist : [],
    signupforuser: false,
    signupforcompany: false,
    nowLevel: "",
    unread_alertlist:[],
    check:false,
    userdata:[],
  }),
  components: {
    SignupforCompanyModal,
    SignupforUserModal
  },
  mounted() {
    this.user = this.$session.get("session_id");
    this.nowLevel = this.$session.get('level');
    this.userpage = "/story/" + this.user;
    this.$store.commit('changealertList', this.$session.get('alertList'))
  },
  methods: {
    showNotification(group, type, title, text) {
      this.$notify({
        group,
        title,
        text,
        type
      });
    },
    async fetchData(id) {
     this.unread_alertlist = [];
     firebase.database().ref('/chat/').once('value').then(snapshot => {
       var chats = snapshot.val();
       for(var i in chats) {
         if ( chats[i].userId == this.user ) {
           if ( !chats[i].chatting[chats[i].chatting.length-1].isReadUser ) {
             var msg = "["+ chats[i].projectTitle +"] 읽지 않은 채팅이 있습니다. ";
              this.unread_alertlist.push(1);
              this.alertlist.push({check:false, message: msg, url : chats[i].link, user : "!Chat"})
           }
         }
       }
     });
     var userdata = await FirebaseService.SELECT_Userdata(id);
     this.userdata = userdata;
     if (userdata.length) {
       this.check = true
       var alerts = userdata[0].alertlist
       this.alertlist = alerts
       for (var i in alerts) {
         // console.log(alerts[i]);
         if (alerts[i].check === false) {
           this.unread_alertlist.push(alerts[i])
         }
       }
     } else {
       this.check = false
     }
     // 여기에서 vuex 관련된것만들자~
     this.$store.commit('changealertList', { alert : this.alertlist, unread : this.unread_alertlist})
     this.$session.set('alertList',{ alert : this.alertlist, unread : this.unread_alertlist});
     // console.log(this.$session.get('alertList'), 111)
    },

    async move(check, url, alertindex,user) {
      if(!this.alertlist[this.alertlist.length-alertindex-1].check) {
        this.alertlist[this.alertlist.length-alertindex-1].check = true;
        this.unread_alertlist.pop();
      }

      if( user === "!Chat" ) {
        window.open(document.location.origin + '/' + url)
        FirebaseService.INSERT_alert_Chat(this.alertlist,this.$session.get("session_id"))
      } else {
        window.open(document.location.origin + url)
        var result = await FirebaseService.alertcheck(this.alertlist, this.alertlist.length-alertindex-1, this.$session.get("session_id"))
      }

    },
    colorcheck(check) {
      if (check) {
        return
      } else {
        return 'red'
      }
    },
    async Logout() {
      var res = await FirebaseService.Logout();
      if (res == false) {

        this.showNotification(
          "foo-css",
          "error",
          `${this.$session.get("session_id")}님`,
          `로그아웃 완료!`
        );
        this.$session.set("session_id", "");
        this.$session.set("level", "");
        this.user = "";
        this.$store.commit('changeLevel', "")
        this.$store.commit('setSession', "")
        this.$emit('logout_success')
        // console.log(this.$store.getters.getSession,"setSession")
        // console.log(this.$session.get('session_id'))
      }
    },

    async Signin(id, password) {
      this.check = await FirebaseService.Signin(id, password);
      if (this.check == true) {
        var user_nickname = await FirebaseService.SELECT_UserdataEmail(id);
        var company_nickname = await FirebaseService.SELECT_Companydata(id);
        // console.log(user_nickname[0])
        if (user_nickname[0] !== undefined) {
          this.$session.set("session_id", user_nickname[0].nickname);
          this.$session.set("level", user_nickname[0].level);
          this.user = this.$session.get("session_id");
          this.nowLevel = this.$session.get("level");
          this.fetchData(this.$session.get("session_id"));
        } else if (company_nickname[0] !== undefined) {
          // console.log(company_nickname[0].company_name);
          this.$session.set("session_id", company_nickname[0].company_name);
          this.$session.set("level", company_nickname[0].level);
          this.user = this.$session.get("session_id");
          this.nowLevel = this.$session.get("level");
        }
        this.showNotification(
          "foo-css",
          "success",
          ``,
          `${this.user}님  로그인 완료!`
        );
        this.LoginId = "";
        this.LoginPassword = "";
        this.$store.commit('changeLevel', this.$session.get('level'))
        this.$store.commit('setSession', this.$session.get('session_id'))
        this.$emit('login_success')
      }
    },

    async SigninFacebook() {
      var answer = await FirebaseService.SigninFacebook();
      this.check = answer.result;
      if (this.check == true) {
        this.$session.set("session_id", answer.user);
        this.user = this.$session.get("session_id");
        this.showNotification(
          "foo-css",
          "success",
          `${this.user}님`,
          `로그인 완료!`
        );
        this.dialog = false;
        // console.log(this.$store.getters.getSession,"setSession")
        // console.log(this.$session.get('session_id'))
      }
    },
    signupsuccess() {
      this.signupmodal = false;
      this.showNotification(
        "foo-css",
        "success",
        `회원가입 완료!`,
        `로그인 해주세요!`
      );
    }
  }
};
</script>

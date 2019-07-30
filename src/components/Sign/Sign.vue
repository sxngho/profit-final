<template>
  <div class="display:inline">
    <v-dialog v-model="dialog" max-width="600px" v-if=" user== '' || user == undefined ">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" style="height:100%;">Sign In</v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Sign In</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="ID" required v-model="LoginId"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="LoginPassword"
                  @keyup.enter="dialog = false, Signin(LoginId, LoginPassword)"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn rounded color="#4267b2" dark @click="SigninFacebook()" style="width:100%;">
            <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook으로 로그인하기
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false, Signin(LoginId, LoginPassword)"
          >Login</v-btn>
          <br />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="signupmodal" max-width="500px" v-if=" user== '' || user == undefined ">
      <template v-slot:activator="{ on: { click } }">
        <v-btn text v-on:click="click" style="height:100%;">Sign Up</v-btn>
      </template>
      <v-card>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <SignupforUserModal v-on:signup="signupsuccess" />
          <SignupforCompanyModal v-on:signup="signupsuccess" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="signupmodal=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      text
      v-if="user !=='' && user !== undefined"
      :to="{ name: 'story', params: { id: user }}"
      style="height:100%;">
      {{user}}
    </v-btn>

    <v-btn
      text
      @click="Logout()"
      v-if="user!=='' && user!==undefined"
      style="height:100%;">
      Log Out</v-btn>
    <v-btn text>
      <i class="fa fa-globe" aria-hidden="true"></i>
      <!-- 여기에 알람을 넣어야하나.. -->
    </v-btn>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";

import SignupforCompanyModal from "./SignUpForCompany";
import SignupforUserModal from "./SignUpForUser";

export default {
  data: () => ({
    user: "",

    dialog: false,
    signupmodal: false,
    userpage : "",
    LoginId: "",
    LoginPassword: "",

    signupforuser: false,
    signupforcompany: false,
    Level : "",
  }),
  components: {
    SignupforCompanyModal,
    SignupforUserModal
  },
  mounted() {
    this.user = this.$session.get("session_id");
    this.userpage = "/story/" + this.user;
    this.Level = this.$session.get('level');
  },
  methods: {
    showNotification (group, type ,title, text) {
       this.$notify({
         group,
         title,
         text,
         type,
       })
     },
    async Logout() {
      var res = await FirebaseService.Logout();
      if (res == false) {
        this.showNotification("foo-css","error",`${this.$session.get("session_id")}님`,`로그아웃 완료!`);
        this.$session.set("session_id", "");
        this.user = "";

        // console.log(this.$store.getters.getSession,"setSession")
        // console.log(this.$session.get('session_id'))
      }
    },


    async Signin(id, password) {
      this.check = await FirebaseService.Signin(id, password);

      var userlist = await FirebaseService.SELECT_AllUserdata();
      var companylist = await FirebaseService.SELECT_AllCompanydata();

      var level = -1;

      if (this.check == true) {
        var user_nickname = await FirebaseService.SELECT_UserdataEmail(id);
        var company_nickname = await FirebaseService.SELECT_Companydata(id);
        // console.log(user_nickname[0])
        if ( user_nickname[0] !== undefined ) {
            this.$session.set("session_id", user_nickname[0].nickname);
            this.user = this.$session.get("session_id");
        } else if ( company_nickname[0] !== undefined ) {
          console.log(company_nickname[0].company_name)
            this.$session.set("session_id", company_nickname[0].company_name);
            this.user = this.$session.get("session_id");
        }

        for(var user in userlist) {
          if ( userlist[user].name == id ) {
            this.$session.set("level",userlist[user].level);
            level = userlist[user].level;
          }
        }
        for(var company in companylist) {
          if ( companylist[company].name == id ) {
            this.$session.set("level",companylist[company].level);
            level = companylist[company].level;
          }
        }
        this.$session.set("level", level);
        this.showNotification("foo-css","success",level+`레벨의 `+`${this.user}님 `,`로그인 완료!`);
        this.LoginId = '';
        this.LoginPassword= '';
      }
    },


    async SigninFacebook() {
      var answer = await FirebaseService.SigninFacebook();
      this.check = answer.result;
      if (this.check == true) {
        this.$session.set("session_id", answer.user);
        this.user = this.$session.get("session_id");
        this.showNotification("foo-css","success",`${this.user}님`,`로그인 완료!`);
        this.dialog = false;
        // console.log(this.$store.getters.getSession,"setSession")
        // console.log(this.$session.get('session_id'))
      }
    },
    signupsuccess() {
      this.signupmodal = false;
      this.showNotification("foo-css","success",`회원가입 완료!`,`로그인 해주세요!`);
    }
  }
};
</script>

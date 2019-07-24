<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px" v-if=" user== '' || user == undefined ">
      <template v-slot:activator="{ on }">
        <v-btn flat class="black--text" v-on="on">Sign In</v-btn>
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
                <v-text-field label="Password*" type="password" required v-model="LoginPassword"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn round color="#4267b2" dark @click="SigninFacebook()" style="width:100%;">
            <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook으로 로그인하기
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="dialog = false, Signin(LoginId, LoginPassword)"
          >Login</v-btn>
          <br />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="signupmodal" max-width="500px" v-if=" user== '' || user == undefined ">
      <template v-slot:activator="{ on: { click } }">
        <v-btn flat class="black--text" v-on:click="click">Sign Up</v-btn>
      </template>
      <v-card>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <SignupforUserModal />
          <SignupforCompanyModal />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="signupmodal=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn class="black--text" flat v-if="user!=='' && user!==undefined">
      <router-link style="text-decoration:none; color:black" :to="{ name: 'story', params: { id: user }}"> {{user}} </router-link>
    </v-btn>
    <v-btn class="black--text" flat @click="Logout()" v-if="user!=='' && user!==undefined">Log Out</v-btn>
  </v-layout>
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
  }),
  components: {
    SignupforCompanyModal,
    SignupforUserModal
  },
  mounted() {
    this.user = this.$session.get("session_id");
    this.userpage = "/story/" + this.user;
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
      if (this.check == true) {
        this.$session.set("session_id", id);
        this.user = this.$session.get("session_id");
        this.showNotification("foo-css","success",`${this.user}님`,`로그인 완료!`);
      }
    },
    async SigninFacebook() {
      var answer = await FirebaseService.SigninFacebook();
      this.check = answer.result;
      if (this.check == true) {
        this.$session.set("session_id", answer.user);
        this.user = this.$session.get("session_id");
        // console.log(this.$store.getters.getSession,"setSession")
        // console.log(this.$session.get('session_id'))
      }
    }
  }
};
</script>

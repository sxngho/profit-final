<template>
  <!-- <v-toolbar flat color="#fff00" style="flex:0">
    <v-toolbar-title>
      <v-btn text class="font-bold-light title" to="/" style="height:100%; color:blueviolet" >Sharefolio</v-btn>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <Sign v-on:login_success="login_success" v-on:logout_success="logout_success"/>

      <v-btn text class="font-bold-light" to="/Manager" v-if="this.$store.getters.getLevel===0 || this.$store.getters.getLevel===1">Manager</v-btn>
    </v-toolbar-items>
  </v-toolbar> -->

  <v-layout  style="flex:0; padding:0 10px; z-index:4; position:absolute; width:100%;">
    <v-layout row wrap>
      <v-btn text class="font-bold-light title" to="/" style="height:100%; color:blueviolet">Sharefolio</v-btn>
      <v-spacer />
      <div>
        <Sign v-on:login_success="login_success" v-on:logout_success="logout_success"/>
        <v-btn text class="font-bold-light" to="/Manager" v-if="this.$store.getters.getLevel===0 || this.$store.getters.getLevel===1">Manager</v-btn>
      </div>
    </v-layout>
  </v-layout>
</template>

<script>
import Sign from "../Sign/Sign";
import FirebaseService from "@/services/FirebaseService";
export default {
  name: "Header",
  props: {},
  components: {
    Sign,
  },
  data: () => ({
    unread_alertlist:[],
    user:"",
    check:false,
    userdata:[],
  }),
  mounted() {
    this.user = this.$session.get("session_id")
    // this.get_userdata(this.$session.get("session_id"));
    this.$store.commit('setSession', this.$session.get("session_id"))
    this.$store.commit('changeLevel', this.$session.get("level"))
  },
  methods : {
    async get_userdata(id) {
     this.unread_alertlist = [];
     if ( this.$store.getters.getLevel === 2 ) {
      var userdata = await FirebaseService.SELECT_Userdata(id)
      this.userdata = userdata
      if (userdata.length) {
        this.check = true
        var alerts = userdata[0].alertlist
        for (var i in alerts) {
          if (alerts[i].check === false) {
          this.unread_alertlist.push(alerts[i])
          }
        }
      } else {
        this.check = false
      }
     }
    },
    login_success() {
      this.check = true
    },
    logout_success() {
      this.check = false
    }
  },

};
</script>

<style scoped>
.content {
  margin-left: 30px;
}
</style>

<template>
  <v-toolbar flat color="#fff" style="flex:0">
    <v-toolbar-title>
      <v-btn
        text
        class="font-bold-light title"
        to="/"
        style="height:100%; color:blueviolet"
      >Sharefolio</v-btn>
    </v-toolbar-title>
    <v-spacer />
    <!-- <div id="google_translate_element"></div> -->
    <v-toolbar-items>
      <Sign />
      <v-btn text to="/Alert">
        <i class="fa fa-globe" aria-hidden="true"></i>
        <span id="unread_alret" style="color:red;">{{unread_alertlist.length}}</span>
      </v-btn>
      <v-btn text class="font-bold-light" to="/Chat">chat</v-btn>
      <v-btn text class="font-bold-light" to="/Manager">Manager</v-btn>
      <v-btn text class="font-bold-light" to="/companyIntro">Company</v-btn>
    </v-toolbar-items>
  </v-toolbar>
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
    fake:false,
  }),
  mounted() {
    this.get_userdata(this.$session.get("session_id"))
  },
  methods : {
    async get_userdata(id) {
      var userdata = await FirebaseService.SELECT_Userdata(id)
      var alerts = userdata[0].alertlist

      for (var i in alerts) {
        if (alerts[i].check === false) {
        this.unread_alertlist.push(alerts[i])
        }
      }
    }
  },


};
</script>

<style scoped>
.content {
  margin-left: 30px;
}
</style>

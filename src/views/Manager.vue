<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout><v-flex style="margin:30px;" /></v-layout>

    <div class="sidetoolbar white--text">
      <!-- <div href="m.naver.com" ><img src="../assets/icon_set/customer-support.svg" fill="yellow" /></div> -->
      <div class="sidetooltxt" @click="compo=1">home</div><br/>
      <div class="sidetooltxt" @click="compo=2">weblog</div><br/>
      <div class="sidetooltxt" @click="compo=3">users</div><br/>
      <div class="sidetooltxt" @click="compo=4">companys</div><br/>
      <div class="sidetooltxt" @click="compo=5">siren</div><br/>
    </div>

    <v-container style="margin-left:65px;">
      <Main v-if="compo==1"/>
      <WebLog v-if="compo==2"/>
      <Users v-if="compo==3"/>
      <Company v-if="compo==4"/>
      <Report v-if="compo==5"/>
    </v-container>

  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Main from "../components/Manager/Main";
import WebLog from "../components/Manager/WebLog";
import Users from "../components/Manager/Users";
import Company from "../components/Manager/Company";
import Report from "../components/Manager/Report";


export default {
  name: "Manager",
  components: {
    Main,
    WebLog,
    Users,
    Company,
    Report,
  },
  methods: {
    async get_userdata() {
      this.user = this.$session.get('session_id')
      if (this.user) {
        var userdata = await FirebaseService.SELECT_Userdata(this.user)
        this.level = userdata[0].level
        if (this.level >= 2) {
          alert('권한이 없습니다. 필요 level : 0, 1 (운영자, 관리자)')
          location.href=`${document.location.origin}`
        }
      } else {
        alert('권한이 없습니다. 필요 level : 0, 1 (운영자, 관리자)')
        location.href=`${document.location.origin}`
      }
    }
  },
  data() {
    return {
      compo:1,
      user: "",
      level:"",
    };
  },
  mounted() {
    this.get_userdata()
  }
};

</script>

<style>
.sidetoolbar{
  height: 100%;
  width: 65px;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  margin-top:64px;
}

.sidetooltxt{
  cursor:pointer;
  padding: 10px 0 0 2px;
}
</style>

<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout><v-flex style="margin:30px;" /></v-layout>

    <div class="sidetoolbar white--text">
      <!-- <a href="m.naver.com" ><img src="../assets/icon_set/customer-support.svg" fill="yellow" /></a> -->
      <a class="sidetooltxt" @click="compo=1">home</a><br/>
      <a class="sidetooltxt" @click="compo=2">weblog</a><br/>
      <a class="sidetooltxt" @click="compo=3">users</a><br/>
      <a class="sidetooltxt" @click="compo=4">companys</a><br/>
      <a class="sidetooltxt" @click="compo=5">siren</a><br/>
    </div>

    <div style="margin-left:65px;">
      <Main v-if="compo==1"/>
      <WebLog v-if="compo==2"/>
      <Users v-if="compo==3"/>
      <Company v-if="compo==4"/>
      <Report v-if="compo==5"/>
    </div>


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

  },
  data() {
    return {
      compo:5,
    };
  },
};

</script>

<style>
.sidetoolbar{
  height: 100%;
  width: 65px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 60px;
}

.sidetooltxt{
  cursor:pointer;
  padding: 10px 0 0 2px;
}
</style>

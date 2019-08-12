<template>
  <div class="MainPage">
    <!-- <Banner />
    <Filters /> -->
    <!-- <PortfolioList /> -->
    <!-- <button class="mainMoreBtn">MORE</button> -->
    <full-page ref="fullpage" :options="options" id="fullpage">
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
    </full-page>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Banner from "../components/MainPage/Banner";
import Filters from "../components/MainPage/Filters";
// import PortfolioList from "../components/MainPage/PortfolioList";
import Vue from "vue";
import Section1 from "../components/MainPage/Section1";
import Section2 from "../components/MainPage/Section2";
import Section3 from "../components/MainPage/Section3";
import Section4 from "../components/MainPage/Section4";

export default {
  name: "Main",
  components: {
    Filters,
    Banner,
    // PortfolioList,
    Section1,
    Section2,
    Section3,
    Section4,
  },
  data() {
    return {
      options:{
        licenseKey: 'YOUR_KEY_HERE',
        sectionsColor: ['#D0D9F2','#91A9D9','#99B1BF','#F2F2F2',],
      },
    }
  },
  created() {},
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.userdata = await FirebaseService.SELECT_ALLUser();
      this.$store.commit("changeLevel", this.$session.get("level"));
      // var result = Math.floor(Math.random() * this.userdata.length);
      // this.randId = this.userdata[result].nickname;
    },
    isUserCheck() {
      if (this.level === 2) {
        return true;
      } else {
        return false;
      }
    },
    alert_message_user() {
      this.$swal(
         '권한이 없습니다.',
         '로그인이 필요한 기능입니다',
         'error'
       )
    },
  }
};
</script>

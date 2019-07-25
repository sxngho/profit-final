<!-- UserSideInfo -->
<!-- 정말 많은 도움이 된 사이트: http://bitly.kr/e2faEb -->
<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm8>
        <Linechart/>
      </v-flex>
      <v-flex xs12 sm4>
        <h1>시간별 방문자 추이</h1>
        해야하는것 : 일간(완료), 주간, 월간, 연간
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm8>
        <Barchart/>
      </v-flex>
      <v-flex xs12 sm4>
        <h1>게시판별 방문자 추이</h1>
        해야하는것 : 일간, 주간(완료), 월간, 연간
      </v-flex>
    </v-layout>

    <!-- <v-layout row wrap>
      <v-flex xs4 v-for="item in loglist" >
        <h3>{{item.date}}</h3>
        {{item.date.seconds}}<br/>
        {{item.date.nanoseconds}}<br/>
        {{item.login_user}}<br/>
        {{item.url}}<br/>
        <v-btn v-if="item.date != null" @click="timestampToDate(item.date.seconds)">
          시간
        </v-btn>
        <br/>
      </v-flex>
    </v-layout> -->
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Linechart from "./Chart/LineChart";
import Barchart from "./Chart/BarChart"

export default {
  data() {
    return{
      loglist:[],
    };
  },
  components:{
    Linechart,
    Barchart,
  },
  created() {
    this.filldata();
  },
  methods: {
    async filldata(){
      this.loglist = await FirebaseService.SELECT_ALLWebLog();
    }
  },

};
</script>
<!--
var dd = new Date(item.date.seconds*1000);
var day = days[dd.getDay()];
var year = dd.getFullYear();
var month = months[dd.getMonth()];
var date = dd.getDate();
var hours = dd.getHours();
var minutes = dd.getMinutes();
var second = dd.getSeconds();
-->

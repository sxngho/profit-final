<!-- UserSideInfo -->
<template>
  <div>
    <v-layout row wrap>
      <v-flex>
        
      </v-flex>
    </v-layout>


    <v-layout row wrap>
      <v-flex xs4 v-for="item in loglist">
        <h3>{{item.date}}</h3>
        {{item.date.seconds}}<br/>
        {{item.date.nanoseconds}}<br/>
        {{item.login_user}}<br/>
        {{item.url}}<br/>
        <br/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import LineChart from "vue-chartjs"

export default {
  data() {
    return {
      loglist:[],
    }
  },
  props: {

  },
  components:{

  },
  created() {
    this.getWebLog();
    console.log(this.loglist);
  },
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  },
  methods: {
    async getWebLog(){
      this.loglist = await FirebaseService.SELECT_ALLWebLog();
    }
  },
  watch: {
  }

};
</script>

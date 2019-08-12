<template>
  <div class="section">
    <v-container >
      <v-layout row wrap justify-center>
        <v-flex xs9 text-center>
          <div style="width:100%" text-center class="display-3">
            Hot Portfolio!
            <!-- {{this.hotprojects}} -->
          </div>

          <v-carousel hide-delimiters style="height:100%; margin:50px 0;">
          <!-- <v-carousel cycle hide-delimiters style="height:100%; margin:50px 0;"> -->
            <v-carousel-item v-for="(item, i) in hotprojects">

              <v-card height="100%" class="black--text" style="background:white; padding:50px;">

                  <!-- <v-layout row wrap justify-center>
                    <v-btn @click="gogo(hotprojects[i][0])" text outlined>완1성하기</v-btn>
                  </v-layout> -->


                  <div class="mainProjectTitle" style="display:inline-block;">
                    <h2 style="display:inline">{{hotprojects[i][1].projecttitle}}</h2>
                    {{hotprojects[i][1].session_id}}

                  </div>

                <v-layout row wrap justify-center style="padding:20px; width:100%; height:90%;">
                  <!-- <v-flex xs12 hidden-sm-and-up>
                    <v-avatar size="130">
                      <img src="https://i.imgur.com/8tFN1Zj.jpg" alt="gg"/>
                    </v-avatar>
                  </v-flex> -->

                  <v-flex sm5 hidden-xs-only style="overflow:hidden; padding:20px 0;">

                      <img :src="hotprojects[i][1].projectimage || 'https://i.imgur.com/8tFN1Zj.jpg'" alt="gg" style="width:250px; height:250px;"/>

                    <!-- <img :src="company.company_logo || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'" style="width:150px; height:90px" /> -->

                  </v-flex>
                  <v-flex xs12 offset-sm1 sm5 style="padding:20px 0;">
                    <span class="grey--text caption">{{hotprojects[i][1].projectdescription}}</span>
                    <br/><br/>
                    <div style="display:inline;" justify-center>
                      <v-chip v-for="item in hotprojects[i][1].projecttech" color="indigo" small outlined style="margin:2px; color:black;">
                        {{item}}
                      </v-chip>
                      <br/><br/>
                      상세내용<br/><br/>
                      <p v-html="hotprojects[i][1].projectcontent"></p>
                    </div>


                  </v-flex>

                </v-layout>

                <div class="text-center;">
                  <v-btn @click="gogo(hotprojects[i][0])">보러가기</v-btn>
                </div>

              </v-card>

            </v-carousel-item>

          </v-carousel>


        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";

export default {
  name: "section3",
  components: {
  },
  data() {
    return {
      hotprojects : []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      var result = await FirebaseService.SELECT_HOTProjects()
      // console.log(result)
      for (var item in result) {
        this.hotprojects.push([result[item].id, result[item].data()])
      }
    },
    gogo(project_id) {
            // path: "/project/:pcode",
      window.open(document.location.origin + '/project/' + project_id)
      // var url = document.location.href
      // console.log(project_id, '땃냐')
    }
  }
};
</script>

<style>
.mainProjectTitle {
  display: flex;
  justify-content: space-around;
}
</style>

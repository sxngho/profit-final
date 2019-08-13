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

                  <div v-if="i<3" style="position:absolute; left:30px; top:20px;">
                    <img src="https://i.imgur.com/ZqeqPI2.png"  width="100px" height="100px" />
                    <span style="position:absolute; top:39px; left:45px;">{{i+1}}</span>
                  </div>

                  <div class="mainProjectTitle" style="display:inline-block;  text-overflow: ellipsis; overflow:hidden;">
                    <h2 style="display:inline">{{hotprojects[i][1].projecttitle}}</h2>
                    {{hotprojects[i][1].session_id}}
                  </div>

                  <div style="display:inline-block; position:absolute; right:5%;">
                    <!-- <v-badge color="#E74C3C" overlap> -->
                      <!-- <template slot="badge">  </template> -->
                        <!-- 이미 좋아요 눌렀다면 다른 fa 를 보여주는 것도 좋겠다. -->
                        <i class="fa fa-heart fa-2x" style="color:red;">
                          <div style="position:relative; top:-23px; font-size:15px; color:white;">
                            <span style="font-weight:bold;">{{hotprojects[i][1].likeitcount}}</span>
                          </div>
                        </i>

                    <!-- </v-badge> -->
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
                      <p v-html="hotprojects[i][1].projectcontent" class="txtBox2"></p>
                    </div>


                  </v-flex>



                </v-layout>

                <div class="text-center;">
                  <v-btn color="primary" @click="gogo(hotprojects[i][0])">보러가기</v-btn>
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
      // console.log(this.hotprojects, 'final')
    },
    gogo(project_id) {
      window.open("../project/" + project_id, project_id,"titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600");
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

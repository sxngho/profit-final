<template>
  <div class="section">
    <v-container >
      <v-layout row wrap justify-center>
        <v-flex xs9 text-center>
          <div style="width:100%" text-center class="display-3">
            Hot Portfolio!
          </div>

          <v-carousel cycle hide-delimiters style="height:100%; margin:50px 0;">
            <v-carousel-item v-for="(item, i) in 5">
              <v-card height="100%" class="black--text" style="background:white; padding:50px;">
                <span class="headline">프로젝트 제목</span>
                <v-layout row wrap justify-center style="padding:20px;">
                  <v-flex xs12 hidden-sm-and-up>
                    <v-avatar size="130">
                      <img src="https://i.imgur.com/8tFN1Zj.jpg" alt="gg"/>
                    </v-avatar>
                  </v-flex>

                  <v-flex sm5 hidden-xs-only style="overflow:hidden; padding:20px 0;">
                    <img src="https://i.imgur.com/8tFN1Zj.jpg" alt="gg"/>
                  </v-flex>
                  <v-flex xs12 offset-sm1 sm5 style="padding:20px 0;">
                    <span> 제작자 </span>
                    <br/>
                    <span class="grey--text caption">프로젝트 요약</span>
                    <br/>
                    <div style="display:inline;" justify-center>
                      <v-chip v-for="item in 5" color="indigo" small outlined style="margin:2px; color:black;">
                        스킬{{item}}
                      </v-chip>
                    </div>

                  </v-flex>
                </v-layout>
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
    }
  },
  created() {},
  methods: {}
};
</script>

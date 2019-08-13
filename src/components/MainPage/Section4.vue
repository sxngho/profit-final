<template>
  <div class="section">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12 text-center class="display-2">  <span class="fontjua"> CONTACT US </span> </v-flex>
        <v-flex xs6 text-center class="title" ma-9>
          <div class="members fontjua" v-for="member in members">
            <v-avatar size="90" class="grey lighten-2 avatarStyle">
              <img :src="member.img" />
            </v-avatar>
            &nbsp;&nbsp;&nbsp;
            {{member.userName}}
            &nbsp;&nbsp;
            {{member.email}}
          </div>
          <i class="fas fa-map-marker-alt" style="color:grey"></i>&nbsp;
          <span
            class="fontjua"
            style="font-size:13px; color:grey"
          >대전광역시 유성구 동서대로 98-39 SSAFY 대전1반 9조</span>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";

export default {
  name: "section4",
  components: {},
  data() {
    return {
      members: [
        {
          img: "https://i.imgur.com/nb90qCB.jpg",
          userName: "김슬기",
          email: "rlatmf2147@naver.com"
        },
        {
          img: "https://i.imgur.com/ztAPhm2.png",
          userName: "서효정",
          email: "hyoyas@naver.com"
        },
        {
          img: "https://i.imgur.com/4xdolZc.jpg",
          userName: "박상호",
          email: "sxngho@naver.com"
        },
        {
          img: "https://i.imgur.com/0fHlyBN.jpg",
          userName: "김형래",
          email: "hrb0120@gmail.com"
        }
      ]
    };
  },
  created() {
    console.log(this.members);
  },
  methods: {}
};
</script>
<style scoped>
.members {
  display: flex;
  align-items: center;
  padding-left: 70px;
  margin-bottom: 20px;
  color: grey;
  font-size: 25px;
}
</style>

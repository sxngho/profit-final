<template>
  <div class="section">
      <v-layout row wrap justify-center style="width:100%; height:80%">
        <v-flex xs10 offset-xs1 text-center class="display-2">
          <span class="sm-link sm-link_padding-bottom sm-link3">
            <span class="sm-link__label">기업공고</span>
          </span>
        <img src="../../assets/companyListImg.png" style="position:absolute; left:25%; bottom:0%;"/>

        <!-- <v-flex xs12 text-center>
            <div v-if="this.$store.getters.getLevel==2">
              유저에겐 어떻게하면 공고가 보이는지 알려주자
            </div>
          <div v-else-if="this.$store.getters.getLevel==3">
            기업에겐 공고를 어디서 작성하는지 알려주자
          </div>
          비로그인 유저에겐 국물도 없다
        </v-flex> -->

        <v-flex xs12 text-center>
          <router-link :to="{ name: 'recruits' }" class="bannerBtn">
            <div class="bannerBtn sm-link sm-link_padding-all sm-link1">
                <div class="sm-link__label">
                <i class="far fa-handshake fa-7x"/><br/>
                <span>공고페이지</span>
              </div>
            </div>
          </router-link>
        </v-flex>
      </v-flex>
      </v-layout>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";

export default {
  name: "section2",
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

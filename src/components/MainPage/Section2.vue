<template>
  <div class="section">
    <v-layout row wrap justify-center style="height:55%">
      <v-flex xs6 v-show="!showUpRecruit">
        <v-flex xs12 text-center v-show="!showUpRecruit">
          <span class="sm-link sm-link_padding-bottom sm-link3" style="height:7%" @mouseover="showUpCompanyList=true" @mouseleave="showUpCompanyList=false">
            <span class="sm-link__label"><h2> 기업 정보 </h2> </span>
          </span>
        </v-flex>
        <v-flex xs12 text-center v-show="!showUpRecruit">
          <router-link :to="{ name: 'companyListPage' }" class="bannerBtn">
            <div class="bannerBtn sm-link sm-link_padding-all sm-link1">
              <div class="sm-link__label" @mouseover="showUpCompanyList=true" @mouseleave="showUpCompanyList=false">
                <i class="far fa-building fa-7x"/><br/>
                <span>기업리스트</span>
              </div>
            </div>
          </router-link>
        </v-flex>
      </v-flex>
      <v-flex xs6 v-show="showUpRecruit">
        <v-flex xs12 text-center>
        아휴
        </v-flex>
      </v-flex>
      <v-flex xs6 v-show="!showUpCompanyList">
        <v-flex xs12 text-center v-show="!showUpCompanyList">
          <span class="sm-link sm-link_padding-bottom sm-link3" style="height:7%" @mouseover="showUpRecruit=true" @mouseleave="showUpRecruit=false">
            <span class="sm-link__label"><h2> 외주 공고 </h2> </span>
          </span>
        </v-flex>
        <v-flex xs12 text-center v-show="!showUpCompanyList">
          <router-link :to="{ name: 'recruits' }" class="bannerBtn">
            <div class="bannerBtn sm-link sm-link_padding-all sm-link1">
              <div class="sm-link__label"  @mouseover="showUpRecruit=true" @mouseleave="showUpRecruit=false">
                <i class="far fa-handshake fa-7x"/><br/>
                <span>공고페이지</span>
              </div>
            </div>
          </router-link>
        </v-flex>
      </v-flex>
      <v-flex xs6 v-show="showUpCompanyList">
        <v-flex xs12 text-center>
        어휴
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <img src="../../assets/companyListImg.png" style="position:absolute;bottom:0%"/>
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
      showUpCompanyList:false,
      showUpRecruit:false,
    }
  },
  created() {},
  methods: {}
};
</script>

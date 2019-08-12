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
                <i class="far fa-building fa-9x"/><br/>
                <span>기업리스트</span>
              </div>
            </div>
          </router-link>
        </v-flex>
      </v-flex>
      <v-flex xs6 v-show="showUpRecruit">
        <v-flex xs12 text-center text-white>
          다양한 기업들이 올린 외주 공고를 소개합니다.<br/>
          내가 지원할 수 있는 외주 공고를 확인해보세요.
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
            <div class="bannerBtn sm-link sm-link_padding-all sm-link1" @mouseover="showUpRecruit=true" @mouseleave="showUpRecruit=false">
              <div class="sm-link__label">
                <i class="far fa-handshake fa-9x"/><br/>
                <span>공고페이지</span>
              </div>
            </div>
          </router-link>
        </v-flex>
      </v-flex>
      <v-flex xs6 v-show="showUpCompanyList">
        <v-flex xs12 text-center>
          사이트에서 활동중인 기업리스트입니다. <br/>
          기업에 대한 자세한 정보를 확인할 수 있습니다.
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

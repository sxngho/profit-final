<template>
  <v-container wrap>
    <div style="margin-top:56px">
      <div style="padding:3% 5%; border:2px solid grey; border-radius:15px; width:100%;">

        <v-layout wrap row justify-center style="margin-bottom:20px;">
          <v-flex xs12>
            <h1 class="text-center"><span class="fontHannaAir">기업 리스트</span></h1>
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-center style="margin:40px 0;">
          <v-flex xs10>
            <v-text-field v-model="input" placeholder="검색어를 입력하세요!"/>
          </v-flex>
        </v-layout>


        <v-layout wrap row>
          <v-flex xs12 sm6 md4 v-for="company in companys" v-if="company.company_name.includes(input)" style="padding:10px; position:relative">
            <router-link :to="{name : 'company', params: { id: company.company_name }}" style="text-decoration:none;">
              <v-card style="height:200px; width:100%; padding:10px;" outlined>
                <v-layout row wrap justify-center class="text-right">

                    <v-flex xs5 style="width: 100px; max-height: 200px; position:relative;">
                      <v-img :src="company.company_logo || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'" alt="avatar" height="150"/>
                    </v-flex>
                    <v-flex xs5 offset-xs1 class="text-center" style="position:relative;">
                      <div style="position:absolute; bottom:-20px; right:10px; display:inline">
                        <span class="title"><span class="fontNanum">{{company.company_name}}</span></span>
                        <br/>
                        <span class="caption grey--text"><span class="fontNanum">{{company.comsize}}&nbsp;/&nbsp;{{company.industry}}</span></span>
                      </div>
                    </v-flex>

                </v-layout>
              </v-card>
            </router-link>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  data() {
    return {
      companys: [],
      input:"",
    };
  },
  watch: {
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.companys = await FirebaseService.SELECT_AllCompany();
    },
  },
};
</script>

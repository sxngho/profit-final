<template>
  <div>
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <h1>가입 대기중인 기업</h1>
          <v-list>
          <v-list-item
            v-for="(company) in companylist"
            v-if="!company.state"
            @click=""
          >
            <v-list-item-avatar>
              <v-img :src="company.logo"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              {{ company.company_name }}
            </v-list-item-content>

            <v-list-item-action>
              <div>
                <v-btn text outlined color="#00f" small>승인</v-btn>
                <v-btn text outlined color="#f00" small>거절</v-btn>
              </div>
            </v-list-item-action>

          </v-list-item>
        </v-list>

        </v-flex>
      </v-layout>
    </template>

    <template>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <h1>활동중인 기업</h1>
          <v-text-field v-model="input"/>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-expansion-panels>
            <v-expansion-panel
            v-for="company in companylist"
            :key="i"
            v-if="company.company_name.includes(input) && company.state"
            >
              <v-expansion-panel-header>
                <div>
                  <v-avatar v-if="company.logo">
                    <img :src="company.logo" />
                  </v-avatar>
                  {{company.company_name}}
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-btn v-for="item in action" text outlined>
                  {{item}}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-flex>
      </v-layout>
    </template>
</div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default {
  data() {
    return {
      companylist:[],
      input:"",
      action:['뭔가하기','썸띵투두','밴 먹이기'],
    }
  },
  props: {

  },
  components:{

  },
  created() {
    this.filldata();
  },
  methods: {
    async filldata(){
      this.companylist = await FirebaseService.SELECT_AllCompany();
      console.log(this.companylist);
    }
  },
  watch: {
  },

};
</script>

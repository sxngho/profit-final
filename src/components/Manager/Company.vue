<template>
  <div>
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <h1>가입 대기중인 기업</h1>
            <v-list two-line>
              <template v-for="(item, index) in companylist"  v-if="!item.state">

                <v-list-tile
                  :key="item.title"
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    {{ item.company_name }}
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <div>
                      <v-btn flat outline color="#00f" small>승인</v-btn>
                      <v-btn flat outline color="#f00" small>거절</v-btn>
                    </div>
                  </v-list-tile-action>

                </v-list-tile>
                <v-divider/>
              </template>
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
          <v-expansion-panel>
            <v-expansion-panel-content
              v-for="(item,i) in companylist"
              :key="i"
              v-if="item.company_name.includes(input) && item.state"
              >
              <template v-slot:actions>
                <v-icon color="primary">$vuetify.icons.expand</v-icon>
              </template>

              <template v-slot:header>
                <div>
                  <v-avatar>
                    <img :src="item.companylogo" />
                  </v-avatar>
                  {{item.company_name}}
                </div>
              </template>

              <v-card>
                <v-card-text>
                  <v-btn flat outline>뭔가하기</v-btn>
                  <v-btn flat outline color="red">탈퇴시키기</v-btn>
                </v-card-text>
              </v-card>

            </v-expansion-panel-content>
          </v-expansion-panel>
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

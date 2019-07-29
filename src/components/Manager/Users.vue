<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-text-field v-model="input"/>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-expansion-panels>
          <v-expansion-panel
          v-for="user in userlist"
          :key="i"
          v-if="input != null && user.userName.includes(input)"
          >
            <v-expansion-panel-header>
              <div>
                <v-avatar>
                  <img :src="user.userImage" />
                </v-avatar>
                {{user.userName}}
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-btn v-for="item in level" text outlined>
                {{item}}
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
    </v-layout>
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
      user:1,
      userlist:[],
      level:['운영자', '관리자', '유저', '탈퇴'],
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
      this.userlist = await FirebaseService.SELECT_ALLUser();
      console.log(this.userlist);
    }
  },
  watch: {
  },

};
</script>

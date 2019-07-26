<template>
  <div>

    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-text-field v-model="input"/>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(item,i) in userlist"
            :key="i"
            v-if="input != null && item.userName.includes(input)"
            >
            <template v-slot:actions>
              <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </template>

            <template v-slot:header>
              <div>
                <v-avatar>
                  <img :src="item.userImage" />
                </v-avatar>
                {{item.userName}}
              </div>
            </template>

            <v-card>
              <v-card-text>
                <v-btn text outlined>운영자</v-btn>
                <v-btn text outlined>관리자</v-btn>
                <v-btn text outlined>일반유저</v-btn>
                <v-btn text outlined class="red--text">탈퇴시키기</v-btn>
              </v-card-text>
            </v-card>

          </v-expansion-panel-content>
        </v-expansion-panel>
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

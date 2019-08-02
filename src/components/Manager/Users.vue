<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        당신의 level은 {{userlevel}}
        <v-text-field v-model="input"/>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-expansion-panels>
          <v-expansion-panel
          v-for="(user, index) in userlist"
          v-if="user.userName.includes(input)"
          >
            <v-expansion-panel-header>
              <div>
                <v-avatar>
                  <img :src="user.userImage" />
                </v-avatar>
                {{user.nickname}} , level : {{user.level}}
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              회원 관리 :
              <v-btn v-for="item in level" text outlined @click="change_userlevel(user, index, item)">
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
      level:[],
      input:"",
      userlevel : '',
    }
  },
  props: {
  },
  components:{

  },
  created() {
    this.filldata();
    this.user_auth();
  },
  methods: {
    async filldata(){
      this.userlist = await FirebaseService.SELECT_ALLUser();
      // console.log(this.userlist);
    },
    user_auth() {
      this.userlevel = this.$session.get('level');
      if (this.userlevel === 0) {
        this.level = ['관리자', '유저', '탈퇴']
      } else if (this.userlevel === 1) {
        this.level = ['탈퇴']
      }
    },
    change_userlevel(user, index, item) {
      // console.log(user)
      // console.log(index)
      // console.log(item)
      if (confirm('회원의 level을 수정하시겠습니까?')) {
        if (item === '관리자') {
          FirebaseService.UPDATE_Userlevel(user.nickname, 1)
          // console.log('이 사람을 관리자(1)로 바꿔야합니다.')
        } else if (item === '유저') {
          FirebaseService.UPDATE_Userlevel(user.nickname, 2)
          // console.log('이 사람을 유저(2)로 바꿔야 합니다.')
        } else {
          // 일단 막아뒀습니다.
          FirebaseService.DELETE_user(user.nickname)
          this.userlist.splice(index, 1)
          // console.log('이 사람을 탈퇴시켜야 합니다.')
        }
        this.filldata()
      }

    }
  },
  watch: {
  },

};
</script>

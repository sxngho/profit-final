<template>
  <div>
    <v-layout row wrap>
      <v-flex>

        <h1 class="fontjua">유저 관리 페이지</h1>
        <v-text-field v-model="input" placeholder="유저의 닉네임으로 검색할 수 있습니다."/>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex>
        <v-expansion-panels>

          <v-expansion-panel
          v-for="(user, index) in userlist"
          v-if="user.nickname.includes(input) && user.level != 0"
          >
            <v-expansion-panel-header>
              <div>
                <v-avatar>
                  <img :src="user.userImage || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'" />
                </v-avatar>
                {{user.nickname}}
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <span class="fontjua">현재 등급 : </span>

              <span v-if="user.level==1" class="fontjua">관리자</span>
              <span v-if="user.level==2" class="fontjua">일반유저</span><br>

              <span class="fontjua">등급 변경 : </span>

              <v-btn v-for="(item, index2) in change_state_0" v-if="user.level===1 && level==0" text outlined @click="change_userlevel(user, index2, item)" >
                {{item}}
              </v-btn>
              <v-btn v-for="(item, index2) in change_state_1" v-if="user.level===2 && level==0" text outlined @click="change_userlevel(user, index2, item)">
                {{item}}
              </v-btn>
              <v-btn v-for="(item, index2) in change_state_2" v-if="user.level===2 && level==1" text outlined @click="change_userlevel(user, index2, item)">
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
      input:"",
      userlevel : '',
      change_state_0:['유저', '탈퇴'],
      change_state_1:['관리자', '탈퇴'],
      change_state_2:['탈퇴'],
      level : ''
    }
  },
  props: {
  },
  components:{

  },
  created() {
    this.filldata();
    this.level = this.$session.get('level');
  },
  methods: {
    async filldata(){
      this.userlist = await FirebaseService.SELECT_ALLUser();
      // console.log(this.userlist);
    },
    change_userlevel(user, index2, item) {
      // console.log(user)
      // console.log(index2)
      // console.log(item)
      if (confirm('회원의 level을 수정하시겠습니까?')) {
        if (item === '관리자') {
          FirebaseService.UPDATE_Userlevel(user.nickname, 1)
        } else if (item === '유저') {
          FirebaseService.UPDATE_Userlevel(user.nickname, 2)
        } else {
          // 일단 막아뒀습니다.
          FirebaseService.DELETE_user(user.nickname)
          this.userlist.splice(index, 1)
        }
        this.filldata()
      }

    }
  },
  watch: {
  },

};
</script>

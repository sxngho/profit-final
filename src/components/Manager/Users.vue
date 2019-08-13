<template>
  <div>
    <v-layout row wrap>
      <v-flex >

        <h1 class="fontjua">유저 관리 페이지</h1>
        <v-chip v-if="level==0" color="red" small class="subtitle-1 white--text"><span class="fontYanolja "> 운영자 </span></v-chip>
        <v-chip v-else color="success" small class="subtitle-1 white--text"><span class="fontYanolja "> 관리자</span> </v-chip>
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
                <v-chip v-if="user.level===0" color="red" small outlined> 운영자 </v-chip>
                <v-chip v-if="user.level===1" color="success" small outlined> 관리자 </v-chip>
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <span v-if="(level==0&&(user.level===1 || user.level===2))||(user.level===2 && level==1)">
                <v-chip text outlined small>
                  <span class="subtitle-1">
                    <span class="fontYanolja">{{leveltag[user.level]}}</span>
                  </span>
                </v-chip>
                &nbsp;&nbsp;&nbsp;
                <span class="title"><span class="fontYanolja">회원관리</span></span>
                &nbsp;:&nbsp;
              </span>
              <span v-else-if="user.level ===0">
                <v-chip outlined color="red" small>운영자</v-chip>
              </span>
              <v-chip v-for="(item, index2) in change_state_0" v-if="user.level===1 && level==0" text @click="change_userlevel(user, index2, item.val)" style="margin-right:2px; color:white;" :color="item.color" v-html="item.tag">
                <!-- {{item}} -->
              </v-chip>
              <v-chip v-for="(item, index2) in change_state_1" v-if="user.level===2 && level==0" text @click="change_userlevel(user, index2, item.val)" style="margin-right:2px; color:white;" :color="item.color" v-html="item.tag">
                <!-- {{item}} -->
              </v-chip>
              <v-chip v-for="(item, index2) in change_state_2" v-if="user.level===2 && level==1" text @click="change_userlevel(user, index2, item.val)" style="margin-right:2px; color:white;" :color="item.color" v-html="item.tag">
                <!-- {{item}} -->
              </v-chip>
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
      leveltag:['운영자','관리자','유저','기업'],
      userlist:[],
      input:"",
      userlevel : '',
      change_state_0:[
        { tag:'<i class="fas fa-angle-double-down"></i> &nbsp; <span class="subtitle-1 white--text"><span class="fontYanolja">유저</span></span>', color:"success", val:'유저'},
        { tag:'<span class="subtitle-1 white--text"><span class="fontYanolja">탈퇴</span></span>', color:"red", val:'탈퇴'}
        // '<i class="fas fa-angle-double-down"></i> 유저', '탈퇴'
      ],
      change_state_1:[
        { tag:'<i class="fas fa-angle-double-up"></i>&nbsp;<span class="subtitle-1 white--text"><span class="fontYanolja">관리자</span></span>', color:"success", val:'관리자'},
        { tag:'<span class="subtitle-1 white--text"><span class="fontYanolja">탈퇴</span></span>', color:"red", val:'탈퇴'}
        // '<i class="fas fa-angle-double-up"></i> 관리자', '탈퇴'
      ],
      change_state_2:[
        { tag:'<span class="subtitle-1 white--text"><span class="fontYanolja">탈퇴</span></span>', color:"red", val:'탈퇴'}
        // '탈퇴'
      ],
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

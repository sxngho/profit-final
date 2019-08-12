<template>
  <div class="followList__container">
    <!-- followerlist :  {{view1}}, {{view2}}, {{this.$store.getters.getfollowerList}}, {{followings}} -->
    <div  class="followrList__container__content" v-if="view1">
      <div v-for="human in this.$store.getters.getfollowerList" class="content__follower">
        <Follower :follower="human" />
      </div>
    </div>
    <div class="followrList__container__content" v-if="view2">
      <div v-for="human2 in followings" class="content__follower">
        <Following :following="human2" />
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Follower from "../Followers/Follower";
import Following from "../Followers/Following";
import { mapState } from "vuex";

export default {
  data() {
    return {
      userdata: "",
      followers: [],
      followings: [],
      level: ""
    };
  },
  components: {
    Follower,
    Following,
  },
  props : {
    view1 : {type:Boolean},
    view2 : {type:Boolean},
  },

  created() {
    // console.log(this.$route.params.id)
    this.userid = this.$route.params.id
    this.level = this.$session.get("level");
    this.SELECT_Userdata();

  },
  methods: {
    async SELECT_Userdata() {
      this.userdata = await FirebaseService.SELECT_Userdata(this.$route.params.id)
      this.followers = this.userdata[0].followerlist;
      this.followings = this.userdata[0].followinglist;
      this.$store.commit('setfollowerList', this.userdata[0].followerlist)
      // console.log(this.$store.getters.getfollowerList, '현재 나의 상태는??')
      // if (this.level !== "") {
      //   // 로그인한 경우
      //   if (this.level == 3) {
      //     // 회사인 경우
      //     this.userdata = await FirebaseService.SELECT_Companynickname(
      //       this.$session.get("session_id")
      //     );
      //     this.followers = this.userdata.followerlist;
      //     this.followings = this.userdata.followinglist;
      //   } else {
      //     // 회사가 아닌 경우
      //     this.userdata = await FirebaseService.SELECT_Userdata(
      //       this.$route.params.id
      //     );
      //     this.followers = this.userdata[0].followerlist;
      //     this.followings = this.userdata[0].followinglist;
      //   }
      // }

    },
    // gogo(human) {
    //   this.$router.push(`/story/${human}`)
    //   // console.log(11)
    // }
  },
  mounted() {
    // this.view1 = this.$store.state.followerView;
    // this.view2 = this.$store.state.followingView;
  },
  computed: mapState(["followerView", "followingView"]), // 뷰엑스 값을 여기서 참조하겠다.
  watch: {
    //값이 변할때마다 할 일들? new / old
    followerView(to, from) {
      this.view1 = this.$store.state.followerView;
    },
    followingView(to, from) {
      this.view2 = this.$store.state.followingView;
    }
  }
};
</script>

<style scoped>
.followList__container {
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>

<template>
  <div class="followList__container">
    <div v-show="this.view1" class="followrList__container__content">
      <div v-for="human in followers" class="content__follower">
        <Follower v-bind:follower="human" />
      </div>
    </div>
    <div v-show="this.view2" class="followrList__container__content">
      <div v-for="human in followings" class="content__follower">
        <Follower v-bind:follower="human" />
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Follower from "../Followers/Follower";
import { mapState } from "vuex";

export default {
  data() {
    return {
      userData: "",
      followers: [],
      followings: [],
      view1: false,
      view2: false
    };
  },
  components: {
    Follower
  },
  created() {
    this.SELECT_Userdata();
  },
  methods: {
    async SELECT_Userdata() {
      this.user = await FirebaseService.SELECT_Userdata(
        this.$session.get("session_id")
      );
      this.followers = this.user[0].followerlist;
      this.followings = this.user[0].followinglist;
      // this.$store.state.followerView = false;
      // this.$store.state.followingView = false;
    }
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
<template>
  <div class="topbar__container">
    <div class="topbar__container__content">
      <!--추후 기능 추가하면 다시 추가 예정-->
      <!-- <div class="content__stars">
        <div class="stars__title">Stars &nbsp</div>
        <div class="stars__amount">{{starNumber}} &nbsp&nbsp</div>
      </div>-->
      <button class="content__followers" @click="followerView()">
        <div class="stars__title">Followers &nbsp</div>
        <div class="stars__amount">{{followerNumber}} &nbsp&nbsp</div>
      </button>
      <button class="content__followings" @click="followingView()">
        <div class="stars__title">Following &nbsp</div>
        <div class="stars__amount">{{followingNumber}}</div>
      </button>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      userdata: "",
      followerNumber: "",
      starNumber: "9",
      followingNumber: "",
      level:"",
    };
  },
  methods: {
    async SELECT_Userdata() {
      if (this.level !== "") {
        // 로그인한 경우
        if (this.level == 3) {
          // 회사인 경우
          this.userdata = await FirebaseService.SELECT_Companynickname(this.$session.get('session_id'))
          this.followerNumber = this.userdata.followerlist.length;
          this.followingNumber = this.userdata.followinglist.length;
        } else {
          // 회사가 아닌 경우
          this.userdata = await FirebaseService.SELECT_Userdata(
            this.$session.get("session_id")
          );
          this.followerNumber = this.userdata[0].followerlist.length;
          this.followingNumber = this.userdata[0].followinglist.length;
        }
      } else {
        // 로그인하지 않은 경우
      }
    },
    followerView() {
      this.$store.commit("setFollowerView", true);
      // this.$store.state.followerView = true;
      if (this.$store.state.followingView === this.$store.state.followerView) {
        this.$store.commit("setFollowingView", !this.$store.state.followingView);
      }
    },
    followingView() {
      // this.$store.commit("setFollowingView", !this.$store.state.followingView);
      // this.$store.commit("setFollowerView", !this.$store.state.followerView);

      this.$store.state.followingView = true;

      if (this.$store.state.followingView === this.$store.state.followerView) {
        this.$store.state.followerView = !this.$store.state.followerView;
      }
    }
  },
  created() {
    this.level = this.$session.get('level')
    this.SELECT_Userdata();
  }
};
</script>

<style scoped>
.topbar__container {
  display: flex;
  align-items: center;
  height: 45px;
  background-color: #333333;
  color: white;
  font-size: 16px;
}
.topbar__container__content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.content__stars {
  display: flex;
}
.content__followers {
  display: flex;
}
.content__followings {
  display: flex;
}
</style>

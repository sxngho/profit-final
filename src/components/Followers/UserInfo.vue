<template>
  <div class="userInfo__container">
    <div class="userInfo__container__content">
      <div class="content__userImg">
        <img :src="userImg" style="height:100%; width:100%; border-radius:50px" />
      </div>
      <div class="content__userName">&nbsp {{userName}} / Followers</div>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  data() {
    return {
      userdata: "",
      userName: "",
      userImg: "",
      level : "",
    };
  },
  created() {
    this.level = this.$session.get('level')
    this.SELECT_Userdata();
  },
  methods: {
    async SELECT_Userdata() {

      if (this.level !== undefined) {
        // 로그인한 경우
        if (this.level == 3) {
          // 회사인 경우
          this.userdata = await FirebaseService.SELECT_Companynickname(this.$session.get('session_id'))
          this.userName = this.userdata.company_name;
          this.userImg = this.userdata.company_logo;
        } else {
          // 회사가 아닌 경우
          this.userdata = await FirebaseService.SELECT_Userdata(
            this.$session.get("session_id")
          );
          this.userName = this.userdata[0].userName;
          this.userImg = this.userdata[0].userImage;
        }
      }
    }
  }
};
</script>

<style scoped>
.userInfo__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  /* background-color: aqua; */
}
.userInfo__container__content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content__userImg {
  height: 50px;
  width: 50px;
}
</style>

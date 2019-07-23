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
      user: "",
      userName: "",
      userImg: ""
    };
  },
  created() {
    this.SELECT_Userdata();
  },
  methods: {
    async SELECT_Userdata() {
      this.user = await FirebaseService.SELECT_Userdata(
        this.$session.get("session_id")
      );
      this.userName = this.user[0].userName;
      this.userImg = this.user[0].userImage;
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

<template>
  <div class="follower__container">
    <hr />
    <div class="container__content box" >

      <div class="content__followerImg" style="cursor:pointer;" >
        <img :src="userImg" style="height:95px; width:95px; border-radius:50px" @click="gotostory(nickname)"/>
      </div>
      <div class="content__followerInfo box" >
        <!-- <div class="followerInfo__name">{{userName}}</div> -->
        <div class="followerInfo__name">{{nickname}}</div>
        <!-- <div class="followerInfo__intro">"{{userIntro}}"</div> -->
      </div>
      <div v-if="projectList.length" v-for="item in projectList" class="content__followerPortfolioList box">
        <MPortfolio :project="item" :nickname="nickname" />
      </div>
      <div v-if="!projectList.length" >
        No project
      </div>

    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import MPortfolio from "../Followers/MPortfolio";
export default {
  name: "Follower",
  props: ["follower"],
  data() {
    return {
      user: "",
      projectList: [],
      userName: "",
      userImg: "",
      nickname : "",
      // userIntro: ""
    };
  },
  components: {
    MPortfolio
  },
  created() {
    // console.log(this.follower)
    this.SELECT_Projects();
    this.SELECT_Userdata();
  },
  methods: {
    async SELECT_Projects() {
      this.user = await FirebaseService.SELECT_Projects(this.follower);
      for (let i = 0; i < this.user.length; i++) {
        this.projectList.push(this.user[i].project_id);
      }
      // console.log(this.projectList);
    },
    async SELECT_Userdata() {
      this.user = await FirebaseService.SELECT_Userdata(this.follower);
      this.userName = this.user[0].userName;
      this.userImg = this.user[0].userImage;
      this.nickname = this.user[0].nickname;
      // console.log(this.user[0].userIntro);
      // this.userIntro = this.user[0].userIntro;
      // console.log(this.user[0].userImage);
    },
    gotostory(nickname) {
      // console.log(`${document.location.origin}/story/${nickname}`, 1)
      window.open(`${document.location.origin}/story/${nickname}`)
    }
  }
};
</script>

<style scoped>
.box {
  width: 240px;
  height: 165px;
}
.container__content {
  display: flex;
}
.follower__container {
  width: 100%;
  height: 165px;
}
.followerInfo__name {
  padding-top: 50px;
  width: 200px;
}
.content__followerImg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
}

.content__followerInfo {
  width: 300px;
}
.content__followerPortfolioList {
  width: 210px;
  grid-gap: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

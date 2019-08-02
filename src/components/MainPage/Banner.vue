<template>
  <div class="banner__container">
    <div class="banner__content">
      <router-link to="/studio" class="bannerBox" style="text-decoration:none">
        <div class="studio contentBox">
          <div class="iconBox">
            <i class="far fa-keyboard fa-7x" style="color:blueviolet"></i>
          </div>
          <br />
          <div class="studio_title titleBox">
            <span class="fontStyle">작업실</span>
          </div>
        </div>
      </router-link>

      <router-link to="/recruits" class="bannerBox" style="text-decoration:none">
        <div class="recuritList contentBox">
          <div class="iconBox">
            <i class="far fa-handshake fa-7x" style="color:blueviolet"></i>
          </div>
          <br />
          <div class="recuritList_title titleBox">
            <span class="fontStyle">외주 공고 리스트</span>
          </div>
        </div>
      </router-link>

      <router-link to="/companyListPage" class="bannerBox" style="text-decoration:none">
        <div class="companyList contentBox">
          <div class="iconBox">
            <i class="far fa-building fa-7x" style="color:blueviolet"></i>
          </div>
          <br />
          <div class="companyList_title titleBox">
            <span class="fontStyle">기업 리스트</span>
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'story', params: { id: randId }}" class="bannerBox" style="text-decoration:none">
        <button class="bannerBox" @click="randomUser()">
          <div class="randomList contentBox">
            <div class="iconBox">
              <i class="far fa-list-alt fa-7x" style="color:blueviolet"></i>
            </div>
            <br />
            <div class="randomList_title titleBox">
              <span class="fontStyle">유저 랜덤 리스트</span>
            </div>
          </div>
        </button>
      </router-link>

    </div>
  </div>

</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  data() {
    return {
      userdata : "",
      randId : "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.userdata = await FirebaseService.SELECT_ALLUser();
      var result = Math.floor(Math.random() * this.userdata.length);
      this.randId = this.userdata[result].nickname;
    },
    async randomUser() {
      var result = Math.floor(Math.random() * this.userdata.length);
      this.randId = this.userdata[result].nickname;
    }
  }
};
</script>

<style scoped>
.banner__container {
  width: 100%;
  height: 300px;
  background-color: white;
}
.banner__content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.02rem;
  background-color: lightgrey;
}
.bannerBox {
  height: 300px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contentBox {
  height: 250px;
  width: 80%;
}
.titleBox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.iconBox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
}
.fontStyle {
  font-size: 20px;
  color: grey;
}
</style>

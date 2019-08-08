<template>
  <div class="banner__container">
    <div class="banner__content">
      <!-- 1-1 스토리 : User가 일반 유저인 경우에는 아래의 router-link 가 노출됩니다. -->
      <router-link
        :to="{ name: 'story', params: { id: this.$session.get('session_id') }}"
        class="bannerBox"
        style="text-decoration:none"
        v-if="this.$store.getters.getLevel==2"
      >
        <!-- <router-link to="/studio" class="bannerBox" style="text-decoration:none" v-if="isUserCheck()"> -->
        <div class="studio contentBox">
          <div class="iconBox">
            <i class="far fa-keyboard fa-7x" style="color:blueviolet"></i>
          </div>
          <br/>
          <div class="studio_title titleBox">
            <span class="fontStyle">스토리</span>
          </div>
        </div>
      </router-link>

      <!-- 1-2 스토리 : User가 회사 유저인 경우에는 아래의 router-link 가 노출됩니다. -->
      <router-link
        :to="{ name: 'company', params: { id: this.$session.get('session_id') }}"
        class="bannerBox"
        style="text-decoration:none"
        v-if="this.$store.getters.getLevel==3"
      >
        <div class="studio contentBox">
          <div class="iconBox">
            <i class="far fa-keyboard fa-7x" style="color:blueviolet"></i>
          </div>
          <br/>
          <div class="studio_title titleBox">
            <span class="fontStyle">스토리</span>
          </div>
        </div>
      </router-link>

      <!-- 1-3 스토리 : User가 로그인하지 않은 경우, studio로 가는 활동을 막기 위해 fake로 아래 div를 노출합니다. -->
      <div
        class="bannerBox"
        style="text-decoration:none; cursor:pointer;"
        v-if="typeof(this.$store.getters.getLevel)!=='number'"
        @click="alert_message_user()"
      >
        <div class="studio contentBox">
          <div class="iconBox">
            <i class="far fa-keyboard fa-7x" style="color:blueviolet"></i>
          </div>
          <br />
          <div class="studio_title titleBox">
            <span class="fontStyle">스토리</span>
          </div>
        </div>
      </div>

      <!-- 2-1 외주 공고 리스트 : User가 일반 유저인 경우에는 아래의 router-link 가 노출됩니다. -->
      <router-link
        to="/recruits"
        class="bannerBox"
        style="text-decoration:none"
        v-if="typeof(this.$store.getters.getLevel)=='number'"
      >
        <div class="recruitList contentBox">
          <div class="iconBox">
            <i class="far fa-handshake fa-7x" style="color:blueviolet"></i>
          </div>
          <br />
          <div class="recruitList_title titleBox">
            <span class="fontStyle">외주 공고 리스트</span>
          </div>
        </div>
      </router-link>

      <!-- 2-2 외주 공고 리스트 : User가 일반 유저가 아닌 경우, studio로 가는 활동을 막기 위해 fake로 아래 div를 노출합니다. -->
      <div class="bannerBox" style="text-decoration:none; cursor:pointer;" v-if="typeof(this.$store.getters.getLevel)=='string'" @click="alert_message_user()">
        <div class="studio contentBox">
          <div class="iconBox">
            <i class="far fa-handshake fa-7x" style="color:blueviolet"></i>
          </div>
          <br />
          <div class="studio_title titleBox">
            <span class="fontStyle">외주 공고 리스트</span>
          </div>
        </div>
      </div>

      <!-- 3 기업 리스트 -->
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

      <!-- 4 유저 랜덤 리스트 -->
      <router-link
        :to="{ name: 'story', params: { id: randId }}"
        class="bannerBox"
        style="text-decoration:none"
      >
        <button class="bannerBox" @click="randomUser()">
          <div class="randomList contentBox">
            <div class="iconBox">
              <i class="far fa-list-alt fa-7x" style="color:blueviolet"></i>
            </div>
            <br />
            <div class="randomList_title titleBox">
              <span class="fontStyle">랜덤 스토리</span>
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
      userdata: "",
      randId: "",
      level: ""
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
      this.$store.commit("changeLevel", this.$session.get("level"));
    },
    async randomUser() {
      var result = Math.floor(Math.random() * this.userdata.length);
      this.randId = this.userdata[result].nickname;
    },
    isUserCheck() {
      if (this.level === 2) {
        return true;
      } else {
        return false;
      }
    },
    alert_message_user() {
      this.$swal(
         '권한이 없습니다.',
         '로그인이 필요한 기능입니다',
         'error'
       )
    },
  }
};
</script>

<style scoped>
.banner__container {
  width: 100%;
  height: 250px;
  background-color: white;
}
.banner__content {
  display: block;
  background-color: lightgrey;
}
.bannerBox {
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contentBox {
  height: 50px;
  width: 100%;
}
.titleBox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.iconBox {
  display: none;
}
.fontStyle {
  font-size: 20px;
  color: grey;
}
@media screen and (min-width: 500px) {
  .banner__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.02rem;
    background-color: lightgrey;
  }
  .contentBox {
    font-size: 15px;
  }
  .fontStyle {
    font-size: 12px;
  }
  .iconBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
  }
  .contentBox {
    height: 250px;
    width: 80%;
  }
  .bannerBox {
    height: 300px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .banner__container {
    width: 100%;
    height: 300px;
    background-color: white;
  }
}
@media screen and (min-width: 850px) {
  .contentBox {
    font-size: 20px;
  }
  .fontStyle {
    font-size: 20px;
  }
  .iconBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
  }
  .contentBox {
    height: 250px;
    width: 80%;
  }
  .bannerBox {
    height: 300px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .banner__container {
    width: 100%;
    height: 300px;
    background-color: white;
  }
}
</style>

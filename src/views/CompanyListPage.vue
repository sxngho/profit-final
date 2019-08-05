<template>
  <div>
    <div class="searchBar__container">
      <div class="searchBar__content">
        <div class="searchBar__icon">
          <i class="fas fa-search fa-2x"></i>
        </div>
        <div class="searchBar__input">
          <input
            type="text"
            v-model="inputKeyword"
            class="searchBar__input__box"
            placeholder="회사명을 입력하세요."
            @keyup.enter="seacrh(inputKeyword)"
          />
          <button
            v-show="noneEnter"
            v-for="item in this.showCompanyList"
            class="keywordBottomBar"
            @click="searchOnClick(item)"
          >{{item.company_name}}</button>
        </div>
      </div>
    </div>
    <!--companyList-->
    <div class="companyList__container">
      <div v-show="inputValue" v-for="company in this.showCompanyList" class="companyList__content">
        <router-link :to="{name : 'company', params: { id: company_name }}">
          <button class="company__container">
            <div class="company__content">
              <div class="companyImage">
                <img :src="company.company_logo" style="width:150px; height:90px" />
              </div>
              <div class="companyName">{{company.company_name}}</div>
            </div>
          </button>
        </router-link>
      </div>
      <div v-show="noneValue" v-for="company in this.allCompanyList" class="companyList__content">
        <router-link :to="{name : 'company', params: { id: company_name }}">
          <button class="company__container">
            <div class="company__content">
              <div class="companyImage">
                <img :src="company.company_logo" style="width:150px; height:90px" />
              </div>
              <div class="companyName">{{company.company_name}}</div>
            </div>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  data() {
    return {
      inputKeyword: "",
      inputValue: false,
      noneValue: true,
      noneEnter: true,
      showCompanyList: [],
      allCompanyList: []
    };
  },
  watch: {
    inputKeyword() {
      if (this.inputKeyword !== "") {
        this.showCompanyList = [];
        for (let i = 0; i < this.allCompanyList.length; i++) {
          if (
            this.allCompanyList[i].company_name.indexOf(this.inputKeyword) !==
            -1
          ) {
            this.showCompanyList.push(this.allCompanyList[i]);
          }
        }

        this.inputValue = true;
        this.noneValue = false;
      } else {
        this.noneValue = true;
        this.inputValue = false;
        this.showCompanyList = [];
      }
      this.noneEnter = true;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.allCompanyList = await FirebaseService.SELECT_AllCompany();
    },
    searchOnClick(company) {
      this.showCompanyList = [];
      for (let i = 0; i < this.allCompanyList.length; i++) {
        if (
          this.allCompanyList[i].company_name.indexOf(company.company_name) !==
          -1
        ) {
          this.showCompanyList.push(this.allCompanyList[i]);
        }
      }
    },
    seacrh() {
      this.noneEnter = false;
    }
  }
};
</script>

<style scoped>
.searchBar__content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
}
.searchBar__container {
  padding-left: 90px;
  padding-right: 90px;
  margin-bottom: 50px;
}
.searchBar__input {
  height: 30px;
  width: 100%;
}
.searchBar__icon {
  width: 40px;
}
.searchBar__input__box {
  width: 100%;
  height: 32px;
  text-decoration: none;
}
.showkeyword {
  width: 500px;
  height: 100px;
  background-color: red;
}
.keywordBottomBar {
  z-index: 100px;
  width: 100%;
  text-align: left;
  background-color: white;
  display: block;
  position: relative;
}

.companyList__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.1rem;
  padding-left: 90px;
  padding-right: 90px;
  background-color: white;
}
.company__container {
  width: 100%;
  height: 220px;
  border: 1px solid lightgray;
}
.companyImage {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.companyName {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
}
</style>

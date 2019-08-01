<template>
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
          @keyup.enter="seacrh"
        />
        <button
          v-for="item in this.$store.state.showCompanyListBottomBar"
          class="keywordBottomBar"
          @click="searchOnClick(item)"
        >{{item}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      inputKeyword: "",
      showing: false
    };
  },
  watch: {
    inputKeyword(to, from) {
      if (this.inputKeyword === "") {
        this.$store.commit("showAllCompany");
        this.$store.commit("clearBottomBar");
      } else {
        this.$store.commit("filterCompanyBottomBar", this.inputKeyword);
      }
    }
  },
  methods: {
    seacrh() {
      this.$store.state.showCompanyList = [];
      this.$store.commit("filterCompany", this.inputKeyword);
    },
    searchOnClick(keyword) {
      this.$store.state.showCompanyList = [];
      this.$store.commit("filterCompany", keyword);
      this.$store.commit("clearBottomBar");
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
</style>

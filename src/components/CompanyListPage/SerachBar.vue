<template>
  <div class="searchBar__container">
    <div class="searchBar__content">
      <div class="searchBar__icon">
        <i class="fas fa-search fa-2x"></i>
      </div>
      <div class="searchBar__input">
        <v-autocomplete
          v-model="inputKeyword"
          class="searchBar__input__box"
          placeholder="회사명을 입력하세요."
          :items="this.$store.state.companyList"
          @keyup.enter="seacrh"
        ></v-autocomplete>
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
      console.log(this.inputKeyword);
      if (this.inputKeyword === "") {
        this.$store.commit("showAllCompany");
      }
    }
  },
  methods: {
    seacrh() {
      this.$store.state.showCompanyList = [];
      this.$store.commit("filterCompany", this.inputKeyword);
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
</style>

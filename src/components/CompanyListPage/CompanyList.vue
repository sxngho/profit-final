<template>
  <div class="companyList__container">
    <div v-for="company in this.companyList" class="companyList__content">
      <Company v-bind:propsData="company" />
    </div>
  </div>
</template>

<script>
import Company from "./Company";
import FirebaseService from "@/services/FirebaseService";
export default {
  data() {
    return {
      companyList: []
    };
  },
  created() {
    this.fetchData();
    this.$store.commit("showAllCompany");
  },
  methods: {
    async fetchData() {
      this.companyList = await FirebaseService.SELECT_AllCompany();
    }
  },
  components: {
    Company
  }
};
</script>

<style scoped>
.companyList__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.1rem;
  padding-left: 90px;
  padding-right: 90px;
  background-color: white;
}
.companyList__content {
}
</style>

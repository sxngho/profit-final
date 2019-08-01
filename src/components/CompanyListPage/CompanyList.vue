<template>
  <div class="companyList__container">
    <div v-for="company in this.$store.state.showCompanyList" class="companyList__content">
      <Company v-bind:propsData="company" />
    </div>
  </div>
</template>

<script>
import Company from "./Company";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.commit("showAllCompany");
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

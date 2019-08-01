<template>
  <div>
    <SearchBar />
    <CompanyList />
  </div>
</template>

<script>
import SearchBar from "../components/CompanyListPage/SerachBar";
import CompanyList from "../components/CompanyListPage/CompanyList";
export default {
  components: {
    SearchBar,
    CompanyList
  }
};
</script>

<style>
</style>

<template>
  <div class="MainPage">
    <Banner />
    <Filters />
    <PortfolioList />
    <!-- <button class="mainMoreBtn">MORE</button> -->
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Banner from "../components/MainPage/Banner";
import Filters from "../components/MainPage/Filters";
import PortfolioList from "../components/MainPage/PortfolioList";
import Vue from "vue";

export default {
  name: "Main",
  components: {
    Filters,
    Banner,
    PortfolioList,
  },
  created() {
  },
  methods: {
  },
};
</script>

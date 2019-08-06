<template>
  <div class="PortfolioList__container">
    <div class="PortfolioList__container__content">
      <div
        v-for="item in this.$store.state.showPortfolioList"
        class="content__portfolioList"
        v-if="item.data.state < 3"
      >
        <!-- {{item.data.state}} -->
        <Portfolio v-bind:portfolio="item" />
      </div>
    </div>
    <button class="mainMoreBtn" @click="morePortfolio">MORE</button>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Portfolio from "../MainPage/Portfolio";
export default {
  components: {
    Portfolio
  },
  data() {
    return {
      allPortfolio: [],
      bottolePortfolio: [],
      end: 6,
      start: 0,
      PageLength: "",
      PortfolioList: []
    };
  },
  created() {
    this.SELECT_ALLProjects();
  },
  methods: {
    async SELECT_ALLProjects() {
      this.allPortfolio = await FirebaseService.SELECT_ALLProjects();
      console.log("SELECT_ALLProjects",this.allPortfolio.length);
      for (let i = this.start; i < this.end; i++) {
        this.bottolePortfolio.push(this.allPortfolio[i]);
      }
      this.$store.commit("selectAllPortfolioList", this.allPortfolio);
    },
    morePortfolio() {
      console.log("aaaaaaaaaa")
      if (this.end < this.PageLength) {
        this.end += 6;
        this.start += 6;
        if (this.end > this.PageLength) {
          this.end = this.PageLength;
        }
        this.SELECT_ALLProjects();
      }
    }
  }
};
</script>

<style scoped>
.PortfolioList__container__content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.PortfolioList__container {
  padding-left: 100px;
  padding-right: 40px;
  padding-top: 50px;
}
.mainMoreBtn {
  margin-left: 550px;
  font-size: 20px;
  background: #929292;
  color: white;
  border-radius: 5%;
  width: 80px;
  height: 35px;
}
</style>
<template>
  <div class="PortfolioList__container">
    <div class="PortfolioList__container__content">
      <div
        v-for="item in this.$store.state.showPortfolioList"
        class="content__portfolioList"
        v-if="item.data.state < 3"
      >
        <Portfolio v-bind:portfolio="item" />
      </div>
    </div>
    <div class="morebtnContent">
      <button class="mainMoreBtn" @click="morePortfolio">MORE</button>
    </div>
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
      for (let i = this.start; i < this.end; i++) {
        this.bottolePortfolio.push(this.allPortfolio[i]);
      }
      this.$store.commit("selectAllPortfolioList", this.allPortfolio);
    },
    morePortfolio() {
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
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
.PortfolioList__container {
  padding-top: 50px;
}
.morebtnContent {
  width: 100%;
  display: flex;
  justify-content: center;
}
.mainMoreBtn {
  font-size: 20px;
  background: #929292;
  color: white;
  width: 100%;
  height: 35px;
}
.content__portfolioList {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (min-width: 500px) {
  .PortfolioList__container__content {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 850px) {
  .PortfolioList__container__content {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

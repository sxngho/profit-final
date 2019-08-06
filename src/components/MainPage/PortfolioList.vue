<template>
  <div class="PortfolioList__container">
    <div class="PortfolioList__container__content">
      <div
        v-for="item in bottolePortfolio"
        class="content__portfolioList"
      >
        <!-- {{item.data.state}} -->
        <Portfolio v-bind:portfolio="item"/>
      </div>
    </div>
    <button class="mainMoreBtn" v-if="moreBtn" @click="morePortfolio">MORE</button>
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
      PortfolioList: [],
      moreBtn : true,
    };
  },
  mounted() {
    this.SELECT_ALLProjects();
  },
  methods: {
    async SELECT_ALLProjects() {
      this.allPortfolio = await FirebaseService.SELECT_ALLProjects();
      this.PageLength = this.allPortfolio.length
      if( this.PageLength <= 6  ) {
        this.moreBtn = false;
      }
      for (let i = this.start; i < this.end; i++) {
        if ( this.allPortfolio[i].data.state == 3 ) {
          this.start++;
          this.end++;
          if (this.end > this.PageLength) {
            this.end = this.PageLength;
          }
        } else {
          this.bottolePortfolio.push(this.allPortfolio[i]);
        }
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
        if( this.PageLength <= this.end ) {
          this.moreBtn = false;
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

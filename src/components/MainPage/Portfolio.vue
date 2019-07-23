<template>
  <div class="Portfolio__container">
    <div class="Portfolio__container__content">
      <button class="Portfolio__box" @click="popdetail(portfolioId)">
        <img :src="protfolioImg" style="height:280px; width:330px" />
      </button>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  props: ["portfolio"],
  data() {
    return {
      portfolioId: "",
      protfolioImg: "",
      portfolioInfo: ""
    };
  },
  created() {
    this.SELECT_Project();
  },
  methods: {
    async SELECT_Project() {
      this.portfolioId = this.portfolio.project_id;
      this.portfolioInfo = await FirebaseService.SELECT_Project(
        this.portfolio.project_id
      );
      this.protfolioImg = this.portfolioInfo.projectimage;
      // console.log(this.protfolioImg);
      // console.log(this.portfolioId);
    },
    popdetail(pcode) {
      window.open("../project/" + pcode);
    }
  }
};
</script>

<style scoped>
.Portfolio__box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  height: 290px;
  width: 340px;
}
</style>

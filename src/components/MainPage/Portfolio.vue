<template>
  <div class="Portfolio__container">
    <!-- {{portfolio.project_id}} -->
    <div class="Portfolio__container__content">
      <button class="Portfolio__box" @click="popdetail(portfolioId)">
        <img :src="protfolioImg" style="height:280px; width:330px" />
      </button>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";
export default {
  props: ["portfolio"],
  watch: {
    portfolio() {
      this.SELECT_Project();
    }
  },
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
  // updated() {
  //   this.SELECT_Project();
  // },
  methods: {
    async SELECT_Project() {
      this.portfolioId = this.portfolio.project_id;
      // console.log("test");
      // console.log(this.portfolio);
      // console.log(this.portfolioId);
      this.portfolioInfo = await FirebaseService.SELECT_Project(
        this.portfolio.project_id
      );
      this.protfolioImg = this.portfolioInfo.projectimage;
    },
    popdetail(pcode) {
      window.open(
        "../project/" + pcode,
        pcode,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600,replace=true"
      );
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

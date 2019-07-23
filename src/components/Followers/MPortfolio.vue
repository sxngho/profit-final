<template>
  <div class="mportfolio__container">
    <div class="mportfolio__container__content">
      <div class="portfolio__box">
        <button style="height:100%; width:100%;" @click="popdetail(projectId)">
          <img :src="projectInfo" style="height:140px; width:200px;" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  created() {
    this.SELECT_Project();
  },
  props: ["project"],
  data() {
    return {
      projectInfo: "",
      projectId: ""
    };
  },
  methods: {
    async SELECT_Project() {
      const info = await FirebaseService.SELECT_Project(this.project);
      this.projectInfo = info.projectimage;
      this.projectId = this.project;
    },
    popdetail(pcode) {
      window.open("../project/" + pcode);
    }
  }
};
</script>

<style scoped>
.portfolio__box {
  display: flex;
  justify-content: flex;
  align-items: center;
  background-color: white;
  height: 150px;
  width: 220px;
}
.mportfolio__container__content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>

<template>
  <div class="mportfolio__container">
    <div class="mportfolio__container__content">
      <div class="portfolio__box">
        <button style="height:100%; width:100%;" @click="popdetail(projectId, user)">
          <img :src="projectInfo|| 'http://design-ec.com/d/e_others_50/l_e_others_500.png'" style="height:140px; width:200px;" />
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
  props: ["project", "user"],
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
    popdetail(pcode, user) {
      // console.log(user)
      // window.open(`${document.location.origin}+`)
      window.open("../project/" + pcode, pcode,"titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600");
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

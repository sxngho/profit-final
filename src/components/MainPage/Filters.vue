<template>
  <div class="filter__Container">
    <div class="filter__content">
      <button v-for="(tech,index) in this.techs" class="techBtn" @click="addTech(index)">{{tech}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      techs: ["C", "C#", "JavaScript", "Android", "JQuery"]
    };
  },
  methods: {
    addTech: function(index) {}
  }
};
</script>

<style>
.filter__Container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
}
/* .filter__content {
  display: flex;
  justify-content: center;
  align-items: center;
} */
.techBtn {
  color: #858585;
  font-size: 15px;
  margin-right: 25px;
}
</style>

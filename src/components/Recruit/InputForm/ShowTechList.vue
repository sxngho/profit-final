<template>
  <div class="showTechList__container">
    <button
      v-for="item in this.$store.state.showTechList"
      @click="clickTech(item)"
      class="showTechBox"
    >{{item}}</button>
  </div>
</template>

<script>
export default {
  methods: {
    clickTech(tech) {
      this.$store.commit("addTechList", tech);
    }
  }
};
</script>

<style scoped>
.showTechList__container {
  display: flex;
}
.showTechBox {
  margin-right: 5px;
  width: 110px;
  height: 40px;
  display: block;
  background-color: white;
  color: blueviolet;
  border: 1px solid blueviolet;
  margin-top: 10px;
}
</style>
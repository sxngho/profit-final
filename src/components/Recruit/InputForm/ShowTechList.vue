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

<style>
.showTechBox {
  width: 90px;
  height: 40px;
  display: block;
  background-color: white;
  color: blueviolet;
  border: 1px solid blueviolet;
  border-radius: 5%;
  margin-top: 10px;
}
</style>
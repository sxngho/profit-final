<template>
  <div class="selectTechList__container">
    <ul class="selectTechList__content">
      <li
        v-for="(item,index) in this.$store.state.requiredSkills"
        @click="clickTech(item)"
        class="selectTechBox"
      >
        {{item}}
        <button class="removeBtn" v-on:click="removeTech(index)">x</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    removeTech(index) {
      this.$store.commit("deleteTechList", index);
    }
  }
};
</script>

<style>
.selectTechList__container {
  margin-top: 15px;
  margin-bottom: 15px;
}
.selectTechList__content {
  display: flex;
  list-style: none;
}
.selectTechBox {
  text-align: center;
  background: blueviolet;
  color: white;
  margin-right: 10px;
  width: 130px;
  height: 30px;
  border: 1px solid blueviolet;
  border-radius: 5%;
}
@media screen and (min-width: 500px) {
  .selectTechList__content {
    display: flex;
    list-style: none;
  }
}
@media screen and (min-width: 850px) {
  .selectTechList__content {
    display: flex;
    list-style: none;
  }
  .selectTechBox {
    text-align: center;
    background: blueviolet;
    color: white;
    margin-right: 10px;
    width: 110px;
    height: 30px;
    border: 1px solid blueviolet;
    border-radius: 5%;
  }
}
</style>
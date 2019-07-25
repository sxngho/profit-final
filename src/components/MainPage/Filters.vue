<template>
  <div class="filter__Container">
    <div class="filter__content">
      <button
        v-for="(tech,index) in this.techs"
        class="techBtn"
        @click="addTech(index)"
        v-bind:class="{selectedBtn : tech.isCheck}"
      >{{tech.title}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      techs: [
        {
          title: "c",
          isCheck: false
        },
        {
          title: "c#",
          isCheck: false
        },
        {
          title: "javascript",
          isCheck: false
        },
        {
          title: "android",
          isCheck: false
        },
        {
          title: "jquery",
          isCheck: false
        },
        {
          title: "vue",
          isCheck: false
        },
        {
          title: "python",
          isCheck: false
        },
        {
          title: "java",
          isCheck: false
        }
      ]
    };
  },
  methods: {
    addTech: function(index) {
      if (!this.techs[index].isCheck) {
        this.techs[index].isCheck = true;
        this.$store.commit("addFilterTech", this.techs[index]);
      } else {
        this.techs[index].isCheck = false;
        this.$store.commit("deleteFilterTech", this.techs[index]);
      }
    }
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
.techBtn {
  color: #858585;
  width: 110px;
  height: 40px;
  margin-right: 25px;
  font-size: 19px;
  padding: 5px;
}
.selectedBtn {
  color: white;
  background: blueviolet;
  border-radius: 5%;
}
</style>
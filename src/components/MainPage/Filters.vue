<template>
  <div class="filter__Container">
    <button class="left" @click="left" v-bind:class="{moveLeft : leftMove}">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="tech__container">
      <div
        class="filter__content"
        v-bind:style="{'transform' : 'translate(-' + (index)+ 'px,0px)'}"
      >
        <button
          v-for="(tech,index) in this.techs"
          class="techBtn"
          @click="addTech(index)"
          v-bind:class="{selectedBtn : tech.isCheck}"
        >{{tech.title}}</button>
      </div>
    </div>
    <button class="right" @click="right" v-bind:class="{}">
      <i class="fas fa-chevron-right"></i>
    </button>
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
      ],
      leftMove: false,
      rightMove: false,
      index: 0
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
    },
    left() {
      this.index -= 120;
    },
    right() {
      //한칸 움직일 때마다 120으로 설정했음.
      if (this.index < 360) this.index += 120;
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
  /* width: 110px; */
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
.moveLeft {
  background-color: red;
}
.filter__content {
  transition: 0.5s ease-in-out;
  /* transform: translate(-110px); */
}
@media screen and (max-width: 500px) {
  .filter__content {
    width: 100px;
    display: flex;
    /* overflow: hidden; */
  }
  .left {
    position: absolute;
    left: 10px;
    align-self: center;
  }
  .right {
    position: absolute;
    right: 10px;
    align-self: center;
  }
  .techBtn {
    width: 200px !important;
  }
  .tech__container {
    width: 70%;
    overflow: hidden;
  }
}
@media screen and (min-width: 500px) {
  .left {
    display: none;
  }
  .right {
    display: none;
  }
}
</style>
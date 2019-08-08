<template>
  <div class="filter__Container">
    <button class="left" @click="left" v-bind:class="{moveLeft : leftMove}">
      <i class="fas fa-chevron-left fa-2x" style="color:grey"></i>
    </button>
    <div class="tech__container">
      <div
        class="filter__content"
        v-bind:style="{'transform' : 'translate(-' + (index)+ 'px,0px)'}"
      >
        <div class="imgBanner">
          <img :src="img1" style="height:300px; width:1000px" />
          <img :src="img2" style="height:300px; width:1000px" />
          <img :src="img3" style="height:300px" />
        </div>
      </div>
    </div>
    <button class="right" @click="right" v-bind:class="{}">
      <i class="fas fa-chevron-right fa-2x" style="color:grey"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftMove: false,
      rightMove: false,
      index: 0,
      img1:
        "https://images.samsung.com/is/image/samsung/p5/sec/galaxy-note10/home/bespoke_PC_v3.jpg?$ORIGIN_JPG$",
      img2:
        "https://steemitimages.com/0x0/https://steemitimages.com/DQmcdG1hzZugCa1oUjHGgJ184fDaTeTpuiz96kXqa7Y21kT/DSC04805-1.jpg",
      img3:
        "https://images.samsung.com/is/image/samsung/p5/sec/galaxy-note10/home/190627_mupung_aircon_MainKV_MO_Bg.jpg?$ORIGIN_JPG$"
    };
  },
  methods: {
    left() {
      this.index -= 1000;
    },
    right() {
      if (this.index < 2000) this.index += 1000;
    }
  }
};
</script>

<style scoped>
.imgBanner {
  display: flex;
  justify-content: center;
}
.filter__Container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
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
.tech__container {
  width: 70%;
  overflow: hidden;
}
.filter__content {
  width: 100px;
  display: flex;
  /* overflow: hidden; */
}
.left {
  position: absolute;
  left: 130px;
  align-self: center;
}
.right {
  position: absolute;
  right: 130px;
  align-self: center;
}
.techBtn {
  width: 200px !important;
}
.tech__container {
  width: 70%;
  overflow: hidden;
}
</style>
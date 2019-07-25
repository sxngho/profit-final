<template>
  <div class="footer__container">
    <hr />
    <div class="container__content">
      <div class="content__intro">
        <h2>Production period 2019.07.01 - 2019.08.16 &copy;hyoya,sxngho,seulgi,palkim &nbsp</h2>
        <a href="https://lab.ssafy.com/Kim-Seul-Gi/webmobile-sub2">
          <i class="fab fa-gitlab fa-2x" style="color:#999999"></i>
        </a>
      </div>
      <div class="content__icon content"></div>
    </div>
    <!-- <div class="container__weather">
      <div class="weather__content">
        <p>도시 : {{city}} &nbsp</p>
        <p>습도 : {{humidity}}% &nbsp</p>
        <p>현재날씨 : {{weather}}</p>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      city: "",
      humidity: "",
      weather: ""
    };
  },
  computed: {
    hasResult: function() {
      return this.posts.length > 0;
    }
  }
  // mounted() {
  //   const BASE_URL =
  //     "http://api.openweathermap.org/data/2.5/weather?q=Daejeon&appid=8524498325d50c1573d0f08755ed342c";
  //   this.$http.get(`${BASE_URL}`).then(result => {
  //     this.city = result.data.name;
  //     this.humidity = result.data.main.humidity;
  //     this.weather = result.data.weather[0].main;
  //   });
  // }
};
</script>

<style>
.content__intro {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 10px;
  height: 80px;
}
.footer__container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background-color: white;
}
.weather__content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
}
</style>

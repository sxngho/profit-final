<template>
  <div class="Profilecontainer">
    <div class="ProfileContent">
      <div class="ProfileContent__title">
        <h2>포트폴리오를 등록하면 기업이 먼저 면접을 제안합니다.</h2>
      </div>
      <div class="ProfileContent__btn">
        <button @click="GetSession">포트폴리오 등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    GetSession() {
      window.open("../story/" + this.$session.get("session_id"));
    }
  }
};
</script>

<style scoped>
.Profilecontainer {
  display: flex;
  align-items: center;
  background: white;
  height: 260px;
  padding-left: 30px;
  padding-right: 30px;
}
.ProfileContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #248bf7;
  height: 90px;
  width: 100%;
}
.ProfileContent__title {
  color: white;
}
h2 {
  padding-top: 33px;
  padding-bottom: 33px;
  padding-left: 30px;
}
button {
  color: #248bf7;
  background-color: white;
  border-radius: 2%;
  margin-right: 50px;
  /* height: 50px; */
  /* width: 180px; */
  padding: 15px 45px;
}
</style>
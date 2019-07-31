<template>
  <router-link :to="{name : 'company', params: { id: propsData }}">
    <button class="company__container">
      <div class="company__content">
        <div class="companyImage">
          <img src="https://i.imgur.com/ohiDbgF.png" style="width:150px; height:90px" />
        </div>
        <div class="companyName">{{propsData}}</div>
      </div>
    </button>
  </router-link>
</template>

<script>
export default {
  props: ["propsData"],
  data() {
    return {
      user: ""
    };
  }
};
</script>

<style scoped>
.company__container {
  width: 100%;
  height: 220px;
  border: 1px solid lightgray;
}
.companyImage {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.companyName {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  /* background-color: red; */
}
</style>

<template>
  <v-layout row justify-center style="background:white; padding:2.0vw 0;">
    <v-flex xs2 class="text-md-center">
      <span>{{company.name}}</span>
    </v-flex>
    <div class="recruitBtnContainer">
      <a href="/recruitEditorPage" class="recruitBtn">Recruit 등록하기</a>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      company: {
        name: "멀티캠퍼스"
      }
    };
  }
};
</script>
<style scoped>
.recruitBtn {
  background-color: blueviolet;
  color: white;
  text-decoration: none;
}
.recruitBtnContainer {
  display: flex;
  justify-content: flex-end;
}
</style>

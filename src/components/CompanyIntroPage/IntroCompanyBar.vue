<template>
  <v-layout row justify-center style="background:white; padding:2.0vw 0;">
    <v-flex xs2 class="text-md-center">
      <span>{{company.name}}</span>
    </v-flex>

    <!-- <v-flex xs2 class="text-md-center">
      <button class="btn">star</button>
      <span>99</span>
    </v-flex>-->
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

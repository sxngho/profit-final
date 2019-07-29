<template>
  <v-toolbar flat color="#fff" style="flex:0">
    <v-toolbar-title>
      <v-btn
        text
        class="font-bold-light title"
        to="/"
        style="height:100%; color:blueviolet"
      >Sharefolio</v-btn>
    </v-toolbar-title>
    <v-spacer />
    <!-- <div id="google_translate_element"></div> -->
    <v-toolbar-items>
      <Sign />

      <v-btn text>
        <i class="fa fa-globe" aria-hidden="true"></i>
      </v-btn>
      <v-btn text class="font-bold-light" to="/Chat">chat</v-btn>
      <v-btn text class="font-bold-light" to="/Manager">Manager</v-btn>
      <v-btn text class="font-bold-light" to="/companyIntro">Company</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Sign from "../Sign/Sign";

export default {
  name: "Header",
  props: {},
  components: {
    Sign
  }
};
</script>

<style scoped>
.content {
  margin-left: 30px;
}
</style>

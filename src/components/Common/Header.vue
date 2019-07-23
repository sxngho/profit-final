<template>
  <div class="headerBar">
    <div style="background:white" class="toolBar">
      <v-toolbar-title>
        <a class="font-bold-light content" href="/">Sharefolio</a>
      </v-toolbar-title>
      <v-spacer />
      <!-- <div id="google_translate_element"></div> -->
      <Sign />
      <v-btn flat>
        <i class="fa fa-globe" aria-hidden="true"></i>
      </v-btn>
      <v-btn flat class="font-bold-light" href="/Manager">Manager</v-btn>
      <v-btn flat class="font-bold-light" href="/story">Story</v-btn>
      <v-btn flat class="font-bold-light" href="/companyIntro">Company</v-btn>
    </div>
    <hr />
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
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
  a {
    text-decoration: none;
    color: #2c2c2c;
  }
  .headerBar {
    position: fixed;
    z-index: 10;
    width: 100%;
  }
  .toolBar {
    display: flex;
    align-items: center;
  }
</style>

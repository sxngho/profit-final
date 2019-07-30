<template>
  <v-app>
    <notifications group="foo-css" position="top right" :speed="500" />
    <Header v-if="!$store.state.no_header"/>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>

    <Footer v-if="!$store.state.no_header"/>
  </v-app>
</template>

<script>
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>

<style type="text/css">
@font-face{
  font-family: 'binggraeregular';
  src:url('assets/font/Binggrae/binggrae-webfont.woff')  format('woff');
  font-weight: normal;
  font-style: normal;
}

*{
  font-family: 'binggraeregular';
}
</style>

<template>
  <v-app>
    <notifications group="foo-css" position="top right" :speed="500" />
    <Header v-if="!$store.state.no_header" ref="header"/>
    <hr/>
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
  data() {
    return {
      fetch : false,
    };
  },
  created() {
    if (this.$session.get("session_id")===undefined) {
      this.$session.set('session_id', "")
    } else {
      this.fetch = true;
    }
    if (this.$session.get("level")===undefined) {
      this.$session.set('level', "")
    }
    if (this.$session.get("alertList")===undefined) {
      this.$session.set('alertList', {alert : [], unread : []})
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if( this.fetch ) {
        this.$refs.header.fetchAlert();
        this.fetch = false;
      }
    },
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

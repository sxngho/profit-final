<template>
  <v-app>
    <notifications group="foo-css" position="top right" :speed="500" />
    <Header v-if="!$store.state.no_header"/>
    <!-- <hr/> -->
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
  created() {
    if (this.$session.get("session_id")===undefined) {
      this.$session.set('session_id', "")
    }
    if (this.$session.get("level")===undefined) {
      this.$session.set('level', "")
    }
    if (this.$session.get("alertList")===undefined) {
      this.$session.set('alertList', {alert : [], unread : []})
    }
  }
};
</script>

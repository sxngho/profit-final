<template>
  <v-app>
    <v-content style="margin-top:60px">
      <IntroCompanyBar />
      <v-layout xs12 rows wrap>
        <v-flex xs7>
          <ContentBody />
        </v-flex>
        <v-flex xs5>
          <ContentSide />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import ContentBody from "../components/CompanyIntroPage/ContentBody";
import IntroCompanyBar from "../components/CompanyIntroPage/IntroCompanyBar";
import ContentSide from "../components/CompanyIntroPage/ContentSide";
export default {
  name: "CompanyIntro",
  components: {
    ContentBody,
    IntroCompanyBar,
    ContentSide
  }
};
</script>

<style scoped>
</style>
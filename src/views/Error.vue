<template>
  <v-app>
    <v-content style="margin-top:60px">
      <v-layout xs12 rows wrap>
        <v-flex>
          <div>
            error 페이지입니다.
          </div>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Error",
  data: () => ({
  }),
  mounted() {
  },
  methods : {
  },
};
</script>

<style scoped>
</style>

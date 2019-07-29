<template>
  <v-container>
    <v-layout wrap row>
      <h1>여기가 공동으로 사용할 공동패드다</h1><br/>
      <h2>협의하는 내용이 실시간으로 보인다</h2>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Consult",
  components: {
  },
  methods: {

  },
  data() {
    return {

    };
  },
  created() {
    this.$store.state.no_header = true;
  },
};

</script>

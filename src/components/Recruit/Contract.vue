<template>
  <v-container>
    <v-layout wrap row>
      <h1>여기가 수정불가능한 계약서를 띄워줄 페이지이다</h1><br/>
      <h2>수정불가, 단지 조회만 하는 기능이라 보면 무방하다</h2>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Constract",
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

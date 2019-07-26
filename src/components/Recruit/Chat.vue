<template>
  <div>
    <v-layout wrap row>
      <h1>여기가 채팅창이다</h1><br/>
      <h2>상호상이 알아서 할것이다</h2>
    </v-layout>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Chat",
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

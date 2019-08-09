<template>
  <div class="section">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12 text-center class="display-2">
          CONTACT US
        </v-flex>
        <v-flex xs6 text-center class="title" ma-9>
          찾아오시는길 : 어쩌고 저쩌고 <br/>
          email 문의 : 어딘가 <br/>
          이거 아이콘으로 해라 암튼 끗!
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";

export default {
  name: "section4",
  components: {
  },
  data() {
    return {
    }
  },
  created() {},
  methods: {}
};
</script>

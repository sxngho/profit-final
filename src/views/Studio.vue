<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout><v-flex style="margin:30px;" /></v-layout>
    
    <v-container row wrap >
      <!-- 작업중 리스트 -->
      <div>
        <h1>작업중인 리스트</h1>
        <v-layout row wrap>
          <v-flex xs4 style="background:white;">
            <v-card outlined>
              <v-card-title>
                프젝이름
              </v-card-title>
              <v-card-text>
                남은기간, 페이, 회사이름
              </v-card-text>
              <v-card-actions>
                <v-btn>완료</v-btn>
                <v-btn>채팅창</v-btn>
                <v-btn>계약서</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

      <v-divider/>

      <!-- 찜 리스트 -->
      <div>
        <h1>찜 리스트</h1>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card>
              <v-card-title>
                프젝이름
              </v-card-title>
              <v-card-text>
                회사명, 기술 스택들, 요약, 마감기간
              </v-card-text>
              <v-card-actions>
                <v-btn>채팅방</v-btn>
                <v-btn>협의내용</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

      <v-divider/>
    </v-container>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Studio",
  components: {
  },
  methods: {

  },
  data() {
    return {

    };
  },
  mounted() {
  },
};

</script>

<style>
</style>

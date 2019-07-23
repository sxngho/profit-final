<template>
  <v-container style="height:60px">
    <v-layout row>
      <v-flex xs3 sm2 style="margin-top:-30px">
        <v-overflow-btn :items="category" label="분류" target="#dropdown-example"></v-overflow-btn>
      </v-flex>

      <v-spacer class="hidden-sm-and-up"></v-spacer>
      <v-layout class="hidden-xs-only">
        <v-flex column>
          <!-- <v-btn v-for="t in tags">{{ t.tag }}</v-btn> -->
        </v-flex>

        <v-spacer class="hidden-sm-and-up"></v-spacer>
        <v-layout class="hidden-xs-only">
          <v-flex column></v-flex>
        </v-layout>

        <v-flex xs3 sm2 style="margin-top:-30px">
          <v-overflow-btn :items="filter" label="필터" target="#dropdown-example"></v-overflow-btn>
        </v-flex>
      </v-layout>

      <v-layout row class="hidden-sm-and-up">
        <v-flex>
          <!-- <v-btn v-for="t in tags">{{ t.tag }}</v-btn> -->
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data: () => ({
    category: ["HOT", "POPULAR", "Controversial", "NEW"],
    filter: ["Team Name", "Developer Name", "Language"],
    tags: [
      { tag: "C" },
      { tag: "C++" },
      { tag: "Java" },
      { tag: "Java Script" }
    ]
  })
};
</script>

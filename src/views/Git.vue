<template>
  <div>
    <!-- TODO 여백 -->
    <v-layout row><v-flex style="margin:50px;" /></v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <h1>Git Rep List</h1>
        <GutRepList/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GitRepGraph from "../components/GitRep/GitRepGraph";
import GutRepList from "../components/GitRep/GitRepList";
import GitRepository from "../components/GitRep/GitRepository";

export default {
  name: "Git",
  components:{
    GitRepGraph,
    GutRepList,
    GitRepository
  }
};

</script>

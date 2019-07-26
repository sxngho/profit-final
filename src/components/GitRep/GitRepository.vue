<template>
  <div class="py-3">
  <div id="graph-container"></div>
    <v-layout>
      <v-flex xs12>
        <v-btn text @click="gotorepo(repos.path_with_namespace)">
          <h2 class="font-weight-regular cutoneline">
              {{repos.path_with_namespace}}
          </h2>
          <p class="subheading mb-1 grey--text text--darken-1 font-weight-light cutfourlines">{{repos.namespace.name}}</p>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
   name: 'GitRepository',
   props: {
      repos: {type: null}
   },
   data() {
      return {
         stats: {},
      }
   },
   methods:{
     gotorepo(tmp){
       var target = "https://lab.ssafy.com/"+tmp;
       window.open(target);
     }
   }
}
</script>

<style>
.cutoneline {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.cutfourlines {
 overflow: hidden;
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 4;
}
</style>

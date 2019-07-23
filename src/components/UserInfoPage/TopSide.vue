<!--userState -->
<template>
    <v-flex
    class="subheading grey--text text-md-center"
    style="border-bottom:1px #cecece solid; padding-bottom:1vw;" >
      followers {{followers}} stars {{stars}}
    </v-flex>
</template>

<script>
export default {
  props:{
    followers:{type:Number, default:0},
    stars:{type:Number, default:0}
  }
};
</script>

<style scoped>
</style>

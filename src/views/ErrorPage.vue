<template>
  <div style="margin:10%;">
    <!-- <span>해당 자료를 찾을 수 없습니다.</span> -->
  </div>
</template>

<script>

export default {
  components: {
  },
  mounted() {
    this.$swal({
       title: 'URL ERROR',
       text: "유효하지 않은 URL 입니다.",
       type: 'warning',
       showCancelButton: false,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: '메인 페이지',
       cancelButtonText: '취소',
      }).then((result) => {
       if (result.value) {
         this.$router.push({name:'main'})
               // this.$router.push({name: 'story', params: {id : session_id}});
       }
     })
  }
};
</script>

<style>

</style>

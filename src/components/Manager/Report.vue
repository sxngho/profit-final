<!-- UserSideInfo -->
<template>
  <div>
    <h1>This is Report</h1>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      reportlist:[],
    }
  },
  props: {

  },
  components:{

  },
  created() {
    this.filldata();
  },
  methods: {
    async filldata(){
      this.reportlist = await FirebaseService.SELECT_AllReport();
      console.log(this.reportlist);
    }
  },
  watch: {
  }

};
</script>

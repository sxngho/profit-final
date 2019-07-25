<!-- UserSideInfo -->
<template>
  <div>
    <v-layout row wrap>
      <v-flex offset-xs1 xs10>
        <v-layout row wrap v-for="(item, idx) in userlist">
            {{item.userName}}
          <v-spacer/>
            <img src="../../assets/icon_set/delete.png" alt=""/>
        </v-layout>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      user:1,
      userlist:[],
      item: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
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
      this.userlist = await FirebaseService.SELECT_AllUserdata();
      console.log(this.userlist);
    }
  },
  watch: {
  },

};
</script>

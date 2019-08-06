<template>
  <v-container>

    <v-layout row wrap class="ma-3">
      <v-card style="width:100%;min-height:560px;" outlined>
        <v-flex xs12 class="ma-4">
          <p class="text-center font-weight-bold display-1">{{recruit.data.projectTitle}}</p>
        </v-flex>

        <v-flex xs12>
          <p class="text-center grey--text">{{recruit.data.projectSummary}}</p>
        </v-flex>

        <v-flex xs8 offset-xs2>
          <table style="width:100%" class="text-center">
            <tr>
              <th><span class="caption">category </span></th>
              <td><v-chip small color="red" outlined>{{recruit.data.category}}</v-chip></td>
            </tr>
            <tr>
              <th><span class="caption">Term</span></th>
              <td><span class="indigo--text title">{{recruit.data.closingDate}}</span></td>
            </tr>
            <tr>
              <th><span class="caption">Pay</span></th>
              <td><span class="indigo--text title">{{recruit.data.budget}}</span></td>
            </tr>
          </table>
        </v-flex>

        <v-divider style="margin:20px 0px;"/>

        <v-flex xs10 offset-xs1>
          <p v-html="recruit.data.projectContent"></p>
        </v-flex>

        <v-flex style="width:100%; margin:20px;">
          <v-layout row justify-center>
            <!-- <vue-star animate="animated rubberBand" color="#ff7d7d" v-show="!alreadyDibs" >
              <i slot="icon" class="fa fa-heart" color="#cecece" ></i>
            </vue-star>
            <i class="fa fa-heart" color="#ff7d7d" v-show="alreadyDibs"/> -->

            <!-- @click="dib(recruit_id)"-->
              <v-btn @click="dib(recruit_id)" v-if="!alreadyDibs" outlined color="red">
              찜!
              </v-btn>
              <v-btn  @click="dib(recruit_id)" v-if="alreadyDibs" outlined color="red">
              찜 취소
            </v-btn>

  <!-- @click="dib(recruit_id)" -->
          </v-layout>
        </v-flex>


      </v-card>
    </v-layout>

  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import VueStar from 'vue-star'

export default {
  name: "RecruitDetail",
  components: {
    VueStar
  },
  created() {
    this.$store.state.no_header = true;
  },
  mounted() {
    this.fetchData(this.$route.params.rcode);
  },
  methods: {
    async fetchData(recruitId) {
      console.log("this is fetchData");
      this.recruit = await FirebaseService.SELECT_RecruitInfoByRecruitId(recruitId);
      this.userdata = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      this.recruit_id = this.$route.params.rcode;
      this.alreadyDibs = this.userdata[0].dibs.includes(this.recruit_id);
    },
    dib(recruit_id) {
      console.log("this is dib");
      if ( !this.userdata[0].dibs.includes(recruit_id) ) {
        this.userdata[0].dibs.push(recruit_id);
        FirebaseService.UPDATE_userDibs(this.userdata[0].dibs, this.$session.get('session_id'));
        console.log("complete!");
      } else {
        this.userdata[0].dibs.splice(this.userdata[0].dibs.indexOf(recruit_id),1);
        FirebaseService.UPDATE_userDibs(this.userdata[0].dibs, this.$session.get('session_id'));
      }
      this.alreadyDibs = !this.alreadyDibs;
    },
  },
  data() {
    return {
      alreadyDibs : false,
      recruit : {
        id:"",
        data:{
          projectTitle:"",
          projectSummary:"",
          category:"",
          closingDate:"",
          budget:"",
          projectContent:"",
        }
      },
      recruit_id : "",
    };
  },
};
</script>

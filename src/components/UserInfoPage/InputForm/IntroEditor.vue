<template>
    <v-dialog v-model="intromodal"  max-width="600px">
      <template v-slot:activator="{ on }">
        <img src="../../../assets/icon_set/pencil.png" alt="edit" style="cursor:pointer;" v-on="on">
      </template>

      <v-card>
        <v-toolbar>
          <span class="font-weight-regular headline">자기소개 수정</span>
          <v-spacer/>
          <div @click="clearIntro"><i class="fa fa-close"/></div>
        </v-toolbar>

        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs10>
              <span class="subheading font-weight-bold">설명</span>
              <v-textarea
              outlined
              clearable
              v-model="intro"
              v-on:keyup.enter="sendIntro(intro)"
              >
            </v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-layout row wrap justify-center>
          <v-btn v-on:click="sendIntro(intro)"  text outlined> 등록 </v-btn>
        </v-layout>

      </v-card>
    </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

  export default {
    data() {
      return {
      intromodal:false,
      intro : "",
      }
    },
    created() {
      this.SELECT_Userdata();
    },

    methods : {
      addNewCareer(){
        this.careers.push(this.career);
      },
      deleteCareer(index){
        this.careers.splice(index,1);
      },
      sendIntro(intro) {
        this.$emit('sendIntro',intro);
        this.SELECT_Userdata();
        this.intromodal = false;
      },
      clearIntro() {
        this.intro = '';
        this.intromodal = false;
      },
      async SELECT_Userdata() {
        var userdata = await FirebaseService.SELECT_Userdata(this.$route.params.id);
        this.intro = userdata[0].userIntro
      },
    },
  }
</script>

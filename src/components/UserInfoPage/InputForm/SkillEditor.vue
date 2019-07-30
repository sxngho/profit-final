<template>
    <v-dialog v-model="skillmodal"  max-width="600px">
      <template v-slot:activator="{ on }">
        <img src="../../../assets/icon_set/pencil.png" alt="edit" style="cursor:pointer;"
        v-on="on" @click="initShowModal"/>
      </template>

      <!-- Modal -->
      <v-card>
        <v-toolbar>
          <span class="font-weight-regular headline">Skill Editor</span>
          <v-spacer/>
          <div @click="skillmodal = false"><i class="fa fa-close"/></div>
        </v-toolbar>

        <!-- container -->
        <v-card-text>
          <v-layout row wrap>

            <v-flex xs12>
              <span class="subheading font-weight-bold">Show</span><br/>
              <v-btn
              v-for="item in this.selectList"
              small text outlined rounded
              @click="deleteTech(item)">
                {{ item }}
              </v-btn>
            </v-flex>

            <br/><br/>
              <v-flex xs12 style="border-bottom:1px #cecece solid; margin-bottom:10px;">
                <div/>
              </v-flex>
            <br/><br/>

            <v-flex xs12>
              <span class="subheading font-weight-bold">보유스킬</span><br/>
              <v-btn v-for="item in this.unselectList"
               small text outlined rounded
                @click="addTech(item)">
                {{ item }}
              </v-btn>
            </v-flex>

          </v-layout>
        </v-card-text>

        <!-- action -->
        <v-layout row wrap justify-center>
          <v-btn v-on:click="sendSkill(selectList,unselectList)" text outlined> 등록 </v-btn>
        </v-layout>

      </v-card>
    </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

  export default {
    props: [
      'userSkills',
      'showSkillList',
    ],
    data() {
        return {
        skillmodal:false,
        receiveUserSkills:this.userSkills,
        receiveShowSkillList:this.showSkillList,
        unselectList:[],
        selectList:[],
      }
    },
    created() {
    },
    methods : {
      deleteTech(item){
        this.selectList.splice(this.selectList.indexOf(item),1);
        this.calcDiff();
      },
      addTech(tech){
        this.selectList.push(tech);
        this.calcDiff();
      },
      sendSkill(selectList,unselectList) {
        this.$emit('sendSkill',selectList,unselectList);
        this.skillmodal = false;
      },
      calcDiff(){
        var tmp =[];
        for(var i=0; i<this.receiveUserSkills.length; i++){
          if(!this.selectList.includes(this.receiveUserSkills[i])){
            tmp.push(this.receiveUserSkills[i]);
          }
        }
        this.unselectList = tmp;
      },
      async initShowModal(){
        var skill = await FirebaseService.SELECT_UserSkillByNickname(this.$session.get('session_id'));
        console.log(skill)
        this.receiveUserSkills = skill[0].us;
        this.receiveShowSkillList = skill[0].ss;
        this.selectList = skill[0].ss;
        this.calcDiff();
      },
    },

  }
</script>

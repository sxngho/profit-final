<template>
    <v-dialog v-model="skillmodal"  max-width="600px">
      <template v-slot:activator="{ on }">
        <img src="../../../assets/icon_set/pencil.png" alt="edit" style="cursor:pointer;"
        v-on="on" @click="initShowModal"/>
      </template>

      <!-- Modal -->
      <v-container class="inputmodal">
        <v-layout row wrap style="padding:10px 20px;">
          <v-spacer/>
          <span class="font-weight-regular headline">Skill Editor</span>
          <v-spacer/>
          <div @click="skillmodal = false"><i class="fa fa-close"/></div>
        </v-layout>

        <!-- container -->
        <v-card-text>
          <v-layout row wrap>
            <p style="width:100%;" class="text-center caption grey--text"> - 자신있는 기술스택을 선택하여 다른 사용자에게 보여주세요! -</p>
            <v-flex xs12>
              <p class="subheading font-weight-bold text-center">Show</p>
              <v-layout row wrap justify-center>
                <v-chip v-for="item in this.selectList" small text outlined @click="deleteTech(item)"
                  style="margin:0 2px;" color="#2C3E50">
                  {{ item }}
                </v-chip>
              </v-layout>
            </v-flex>

            <v-flex xs12 style="margin-top:40px;">
              <p class="subheading font-weight-bold text-center">보유스킬</p>
              <v-layout row wrap justify-center>
                <v-chip v-for="item in this.unselectList" small text outlined @click="addTech(item)"
                  style="margin:0 2px;">
                  {{ item }}
                </v-chip>
              </v-layout>
            </v-flex>

          </v-layout>
        </v-card-text>

        <!-- action -->
        <v-layout row wrap justify-center>
          <v-btn v-on:click="sendSkill(selectList,unselectList)" text outlined> 등록 </v-btn>
        </v-layout>

      </v-container>
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
        // console.log(skill)
        this.receiveUserSkills = skill[0].us;
        this.receiveShowSkillList = skill[0].ss;
        this.selectList = skill[0].ss;
        this.calcDiff();
      },
    },

  }
</script>

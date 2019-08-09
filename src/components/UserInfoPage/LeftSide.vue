<!-- UserSideInfo -->
<template>
  <div style="padding:3vw; border-right:1px #cecece solid;">

    <!--USER SKILLS-->
    <v-layout wrap>

      <v-flex xs12 class="text-center title">
        Skills
        <SkillEditor
        v-on:sendSkill="receiveSkill"
        v-if="this.$route.params.id==this.$store.getters.getSession"
      />
      </v-flex>

      <v-flex xs12>
        <!-- 저장된  : {{this.selectList}} -->
       <div v-if="!this.selectList.length" class="caption">
         <p> 등록된 기술이 없습니다. </p>
       </div>

       <div v-else
         style="padding:10px 0px;">
         <v-chip-group
          multiple
          column
          active-class="primary--text primary"
          >
           <v-chip
            v-for="s in userdata[0].showSkillList"
            style="cursor:pointer;"
            v-on:click="toStoryFilter(s)" color="#cecece" outlined>
             {{s}}
           </v-chip>
         </v-chip-group>
       </div>
     </v-flex>
   </v-layout>

    <!--USER Careers-->
    <v-layout wrap style="margin-top:3vw;">
      <v-flex xs12 class="text-center title">
        Career
        <CareerEditor v-on:sendCar="receiveCar" v-if="this.$route.params.id==this.$store.getters.getSession"/>
      </v-flex>
      <v-flex xs12>
        <!-- v-for Career-->
        <div v-if="careerToggle" class="caption">
          <p> 등록된 경력이 없습니다. </p>
        </div>

        <div v-if="!careerToggle">

          <!-- 내가 여기 주인입니까? -->
          <div v-if="this.$route.params.id==this.$store.getters.getSession">
            <div
            v-for="(c, index) in userdata[0].userCareers"
            class="caption grey--text"
            @mouseover="showRmCarBtn(index)" @mouseleave="hideRmCarBtn(index)"
            style="position:relative; padding:15px 6px; border-bottom:1px #cecece solid;">
              <v-flex
                v-on:click="rmCareer(userdata[0].userCareers,c,userdata[0].nickname,reload,index)"
                v-show:false
                class ="carbtn"
                style="z-index:2; right:0; top:35%; position: absolute; display: none;">
                <img
                  src="../../assets/icon_set/delete.png"
                  alt="delcar"
                  style="cursor:pointer; width:25px; height:25px;"/>
              </v-flex>
              <span class="subheading black--text">{{c.Company}}<br/></span>
              <span class="body-2">{{c.Position}}<br/></span>
              <span class="gray--text">{{c.Description}}</span>
              <span class="gray--text" v-if="c.Startday !=''"><br/>{{c.Startday}} ~ {{c.Endday}}</span>
            </div>
          </div>

          <!-- 내가 여기 주인이 아닙니까? -->
          <div v-if="this.$route.params.id!=this.$store.getters.getSession">
            <div
            v-for="(c, index) in userdata[0].userCareers"
            class="caption grey--text"
            style="position:relative; padding:15px 6px; border-bottom:1px #cecece solid;">
              <span class="subheading black--text">{{c.Company}}<br/></span>
              <span class="body-2">{{c.Position}}<br/></span>
              <span class="gray--text">{{c.Description}}</span>
              <span class="gray--text" v-if="c.Startday !=''"><br/>{{c.Startday}} ~ {{c.Endday}}</span>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>

    <!--USER Education-->
    <v-layout wrap style="margin-top:4vw;">
      <v-flex xs12 class="text-center title"> Education <EducationEditor v-on:sendEdu="receiveEdu" v-if="this.$route.params.id==this.$store.getters.getSession"/></v-flex>
      <v-flex xs12>
        <!-- v-for Education -->
        <div v-if="educationToggle" class="caption">
          <p> 등록된 교육이력이 없습니다. </p>
        </div>

        <div v-if="!educationToggle">

          <!-- 내가 여기 주인입니까? -->
          <div v-if="this.$route.params.id==this.$store.getters.getSession">
            <div
              v-for="(e, index) in userdata[0].userEducations"
              class="grey--text caption"
              @mouseover="showRmEduBtn(index)" @mouseleave="hideRmEduBtn(index)"
              style="position:relative; padding:15px 6px; border-bottom:1px #cecece solid;">
              <v-flex
                v-on:click="rmEducation(userdata[0].userEducations,e,userdata[0].nickname,reload,index)"
                v-show:false
                text outlined small absolute fab
                class ="edubtn"
                style="z-index:2; right:0; top:35%; position: absolute; display: none;">
                <img
                  src="../../assets/icon_set/delete.png"
                  alt="deledu"
                  style="cursor:pointer; width:25px;height:25px;"/>
              </v-flex>
              <span class="subheading black--text">{{e.Agency}}<br/></span>
              <span class="body-2">{{e.Degree}}<br/></span>
              <span class="">{{e.Startday}} ~ {{e.Endday}}<br/></span>
            </div>
          </div>

          <!-- 내가 여기 주인이 아닙니까? -->
          <div v-if="this.$route.params.id!=this.$store.getters.getSession">
            <div
              v-for="(e, index) in userdata[0].userEducations"
              class="grey--text caption"
              style="position:relative; padding:15px 6px; border-bottom:1px #cecece solid;">
              <span class="subheading black--text">{{e.Agency}}<br/></span>
              <span class="body-2">{{e.Degree}}<br/></span>
              <span class="">{{e.Startday}} ~ {{e.Endday}}<br/></span>
            </div>
          </div>


        </div>
        <!-- {{this.$store.getters.getSession}} -->
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import CareerEditor from "./InputForm/CareerEditor";
import EducationEditor from "./InputForm/EducationEditor";
import IntroEditor from "./InputForm/IntroEditor";
import SkillEditor from "./InputForm/SkillEditor";

export default {
  data() {
    return {
      image : '',
      isFollow:false,
      educationToggle : false,
      careerToggle : false,
      skillToggle : false,
      imageToggle : false,
      userdata: [
        {userName : ''} ,
        {userIntro : ''} ,
        {userEducations : ''},
        {userImage : ''},
        {userSkills : ''},
        {showSkillList:''} ],
      showRmImgBtn : false,
      showUpImgBtn : false,
      reload : false,
      selectList : [],
    }
  },
  props: {
  },
  components:{
    CareerEditor,
    EducationEditor,
    IntroEditor,
    SkillEditor,
  },
  mounted() {
    this.SELECT_Userdata();
    this.isFollowCheck();
    this.$store.commit('setSession', this.$session.get('session_id'))
    // console.log(this.$route.params.id, 1)
    // console.log(this.$store.getters.getSession, 2)
  },
  methods: {
    toStoryFilter(tech) {
      this.$emit('toStoryFilter',tech)
    },
    showNotification (group, type ,title, text) {
      this.$notify({
        group,
        title,
        text,
        type,
      })
    },
    async SELECT_Userdata() {
      this.toStory(true);
      this.userdata = await FirebaseService.SELECT_Userdata(this.$route.params.id);

      this.selectList = this.userdata[0].showSkillList

      if ( this.userdata[0].userIntro == "" ) {
        this.userdata[0].userIntro = "소개말이 없습니다."
      }
      if ( this.userdata[0].userImage == "" ) {
        this.imageToggle = true;
        this.image = "";
      } else {
        this.imageToggle = false;
        this.image = this.userdata[0].userImage;
      }
      if ( this.userdata[0].userEducations.length == 0 ) {
        this.educationToggle = true;
      } else {
        this.educationToggle = false;
      }
      if ( this.userdata[0].userCareers.length == 0 ) {
        this.careerToggle = true;
      } else {
        this.careerToggle = false;
      }
      if ( this.userdata[0].userSkills.length == 0 ) {
        this.skillToggle = true;
      } else {
        this.skillToggle = false;
      }
      this.toStory(false);
    },
    receiveSkill(selectList,unselectList) {
      FirebaseService.UPDATE_userSkill(selectList,this.$route.params.id);
      this.userdata[0].showSkillList = selectList;
      this.userdata[0].userSkills = unselectList;
      this.selectList = selectList
      // console.log(selectList, 1)
      // console.log(unselectList, 2)
      this.$swal('수정 완료!','내 스킬정보 수정이 완료되었습니다.','success')
    },
    async receiveEdu(edu) {
      this.userEducations = await FirebaseService.SELECT_Userdata(this.$route.params.id);
      FirebaseService.UPDATE_userEdu(edu,this.userEducations[0].userEducations,this.$route.params.id);
      // 새로운 데이터 값을 가지는 유저데이터를 가져옴
      this.SELECT_Userdata();
      this.$swal('수정 완료!','내 교육정보 등록이 완료되었습니다.','success')
    },
    async receiveCar(car) {
      this.userCareers = await FirebaseService.SELECT_Userdata(this.$route.params.id);
      FirebaseService.UPDATE_userCar(car,this.userCareers[0].userCareers,this.$route.params.id);
      // 새로운 데이터 값을 가지는 유저데이터를 가져옴
      this.SELECT_Userdata();
      this.$swal('수정 완료!','내 경력정보 등록이 완료되었습니다.','success')
    },
    async follow(){
      var follower = await FirebaseService.SELECT_Userdata(this.$route.params.id);
      var following = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      await FirebaseService.follow(
        this.$route.params.id,
        this.$session.get('session_id'),
        follower[0].followerlist,
        following[0].followinglist
      );
      this.isFollowCheck();

      var Json = new Object();
      Json.session_id = this.$session.get('session_id')
      Json.url = '/story/' + this.$session.get('session_id')
      Json.user = this.$session.get('session_id')
      // console.log(this.$route.params.id) // 내가 하고자 하는 사람
      // console.log(follower) // 그 사람의 정보.

      FirebaseService.INSERT_alert_Follow(this.$route.params.id, Json, follower[0])

    },
    async unfollow(){
      var follower = await FirebaseService.SELECT_Userdata(this.$route.params.id);
      var following = await FirebaseService.SELECT_Userdata(this.$session.get('session_id'));
      await FirebaseService.unfollow(
        this.$route.params.id,
        this.$session.get('session_id'),
        follower[0].followerlist,
        following[0].followinglist
      );
      this.isFollowCheck();
    },
    async isFollowCheck() {
      var following = await FirebaseService.SELECT_Userdata(this.$route.params.id);
      var tmp = following[0].followerlist.includes(this.$session.get('session_id'));
      this.isFollow=tmp;
    },
    toStory(load) {
      this.$emit('toStory',load);
    },
    showRmEduBtn(index) {
      $('.edubtn').eq(index).show();
    },
    hideRmEduBtn(index) {
      $('.edubtn').eq(index).hide();
    },
    showRmCarBtn(index) {
      $('.carbtn').eq(index).show();
    },
    hideRmCarBtn(index) {
      $('.carbtn').eq(index).hide();
    },

    async rmCareer(userCareers, c, userId, reload,index){
      this.$swal({
         title: '정말 삭제하시겠습니까?',
         text: "삭제한 경력정보는 되돌릴 수 없습니다!",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '삭제',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('Deleted!','경력정보 삭제가 완료되었습니다.','success')
           var reload = FirebaseService.DELETE_userCareer(userCareers,c,userId,reload)
           // this.userdata[0].userCareers.splice(index,1);
           if ( this.userdata[0].userCareers.length == 0 ) {
             this.careerToggle = true;
           } else {
             this.careerToggle = false;
           }
         }
       })
       // this.userdata = await FirebaseService.SELECT_Userdata(this.$route.params.id);
    },
    async rmEducation(userEducations, e, userId, reload,index){
      this.$swal({
         title: '정말 삭제하시겠습니까?',
         text: "삭제한 교육정보는 되돌릴 수 없습니다!",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '삭제',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('Deleted!','교육정보 삭제가 완료되었습니다.','success')
           var reload = FirebaseService.DELETE_userEducations(userEducations, e, userId, reload);
           if ( this.userdata[0].userEducations.length == 0 ) {
             this.educationToggle = true;
           } else {
             this.educationToggle = false;
           }
         }
       })
      // this.userdata = await FirebaseService.SELECT_Userdata(this.$route.params.id);
    },
    setFile() {
      var file = document.querySelector('#file')
      file.click();
    },
  },
  computed: {
      getReload() {
          return this.$store.getters.getReload
      }
  },
  watch: {
      getReload(val, oldVal) {
          // console.log('watched: ', val)
          this.SELECT_Userdata();
          // console.log(this.userdata,"aaa")
          // console.log("왓치")
      }

  },

};
</script>

<template>
  <v-flex class="text-xs-center" style=" padding: 10px 5px;">
    <v-flex hidden-xs-only>
      <button flat class="white--text" @click="popdetail(project_id)" style="height:80%;width:80%;">
        <v-img :src="projectimage" height="20vw" width="100%"></v-img>
        <div>
          <div class="black--text">{{projecttitle}}</div>
          <span class="grey--text">{{projectdescription}}</span>
        </div>
      </button>
      <div style="float:right; margin-right:1vw;">
        <v-flex
          v-if="isMine"
          @click="UPDATE_Project(project_id)"
          class="d-inline"
          style="margin-right:1vw;">
          <img src="../../assets/icon_set/technics.png" alt="Smiley" style="cursor: pointer; height:25px;"/>
        </v-flex>
        <v-flex
          v-if="isMine"
          @click="DELETE_Project(project_id)"
          class="d-inline"
          style="margin-right:1vw;">
          <img src="../../assets/icon_set/delete.png" alt="Smiley" style="cursor: pointer; height:30px;"/>
        </v-flex>
      </div>

      <!-- <ProjectList v-if="!stateAdd"></ProjectList> -->
    </v-flex>

    <v-flex hidden-sm-and-up>
      <button flat class="white--text" @click="popdetail(project_id)" style="height:80%;width:80%;">
        <v-img :src="projectimage" height="45vw" width="100%"></v-img>
        <div>
          <div class="black--text">{{projecttitle}}</div>
          <span class="grey--text">{{projectdescription}}</span>
        </div>
      </button>


    </v-flex>


  </v-flex>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import BigImg from "../Common/BigImg";

export default {
  components: {
    BigImg,
  },
  props: {
    projectimage: { type: String }, //프로젝트 메인 이미지
    projecttitle: { type: String }, // 프로젝트 이름
    projectdescription: { type: String }, //프로젝트 간단 설명
    project_id: { type: String },
    project_writer: {type: String},
  },
  data: () => ({
    popol: false,
    // projecttitle : "프로젝트이름",
    projectThumbnailurl: "https://source.unsplash.com/random/1600x900",
    developer: "개발자이름",
    projectThumbnail: "../assets/logo.png",
    date: "",
    // description: "여기에는 프로젝트 디스크립션이 들어갈 공간입니다ㅏㅏㅏㅏ",
    projectData : '',
    user:'',
    login:'',
    isMine: '',
  }),
  methods: {
    popdetail(pcode) {
      var toggle = this.$store.getters.getPVT;
      if (toggle) {
        window.open(
          "../project/" + pcode,
          "name(이름지정)",
          "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
        );
      } else {
        this.$emit('popdetail',pcode);
      }},

      UPDATE_Project(pcode) {
        this.$emit('UPDATE_Project',pcode);
      },
      DELETE_Project(project_id) {
        if (confirm("알림 : 삭제된 프로젝트는 복구가 불가능합니다. 삭제하시겠습니까?")) {
          FirebaseService.DELETE_project(project_id)
          this.reload_userskill(this.login)
        }
      },
      async reload_userskill(session_id) {
      var projects =  await FirebaseService.SELECT_Projects(session_id);
      await FirebaseService.reload_userskill(session_id,projects);
    },
  },

  created() {
    this.user = this.$route.params.id;
    this.login = this.$session.get("session_id");
    if (this.user == this.login) {
      this.isMine = true;
    } else {
      this.isMine = false;
    }
  }
};
</script>

<style>
.tag {
  border: solid 1px purple;
  border-radius: 10px;
  color: purple;
  padding-right: 2px;
}
.tech {
  border: solid 1px gray;
  border-radius: 10px;
  margin: 2px 5px;
  color: gray;
  padding: 2px 14px !important;
}
</style>

<template>
  <v-flex  style="padding: 5px 5px 45px 5px; background: #d2d2d233;">
    <div @click="popdetail(project_id)">
      <v-img :src="projectimage" height="20vw"></v-img>
      <div>
        <div class="black--text text-center"><span v-if="projectstate==3" style="color:red;">블라인드 처리됨</span>&nbsp; {{projecttitle}}</div>
        <div class="grey--text text-center">{{projectdescription}}</div>
      </div>
    </div>
    <div style="float:right; margin-right:1vw;">
      <v-flex
        v-if="this.$store.getters.getSession==this.$route.params.id"
        @click="UPDATE_Project(project_id)"
        class="d-inline"
        style="margin-right:1vw;">
        <img src="../../assets/icon_set/technics.png" alt="Smiley" style="cursor: pointer; height:25px;"/>
      </v-flex>
      <v-flex
        v-if="this.$store.getters.getSession==this.$route.params.id"
        @click="DELETE_Project(project_id, index)"
        class="d-inline"
        style="margin-right:1vw;">
        <img src="../../assets/icon_set/delete.png" alt="Smiley" style="cursor: pointer; height:30px;"/>
      </v-flex>
    </div>
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
    index : {type:Number}, // 프로젝트의 인덱스
    projectstate : {type:Number},

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
  }),
  methods: {
    popdetail(pcode) {
      var toggle = this.$store.getters.getPVT;
      if (toggle) {
        window.open(
          "../project/" + pcode,
          pcode,
          "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600,replace=true"
        );
      } else {
        this.$emit('popdetail',pcode);
      }},

      UPDATE_Project(pcode) {
        this.$emit('UPDATE_Project',pcode);
      },
      DELETE_Project(project_id, index) {
        this.$swal({
           title: '정말 삭제하시겠습니까?',
           text: "삭제된 프로젝트는 복구가 불가능합니다.",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: '삭제',
           cancelButtonText: '취소',
          }).then((result) => {
           if (result.value) {
             this.$swal('Deleted!','프로젝트 삭제가 완료되었습니다.','success')
             this.$emit('delete', project_id, index)
             FirebaseService.DELETE_project(project_id)
             this.reload_userskill(this.login)
           }
         })
      },
      async reload_userskill(session_id) {
      var projects =  await FirebaseService.SELECT_Projects(session_id);
      await FirebaseService.reload_userskill(session_id,projects);
    },
  },
  created() {
    this.user = this.$route.params.id;
    this.login = this.$session.get("session_id");
    this.$store.commit('setSession', this.login)
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

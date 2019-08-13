<template>
  <v-layout row wrap justify-center>
    <v-flex xs11 style="padding:2px;">
      <v-layout row wrap @click="popdetail(project_id)" style="padding:10px 20px;; cursor:pointer; background:white;border: 1px solid #cecece; border-radius: 9px;">
        <span class="fontDoHyeon">{{projecttitle}}</span>
        <v-spacer/>
        <div style="display:inline;">
          <v-chip style="margin:0 2px;" x-small outlined v-for="tech in projecttech" color="#cecece" label >{{ tech }}</v-chip>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import BigImg from "../Common/BigImg";

export default {
  components: {
    BigImg
  },
  props: {
    projectimage: { type: String }, //프로젝트 메인 이미지
    projecttitle: { type: String }, // 프로젝트 이름
    projectdescription: { type: String }, //프로젝트 간단 설명
    project_id: { type: String },
    project_writer: { type: String },
    projectrank: { type: String },
    projectcontent: { type: String },
    projecttech: { type: Array },
    projectterm: { type: String },
    projectcontent: { type: String }
  },
  data: () => ({
    popol: false,
    // projecttitle : "프로젝트이름",
    projectThumbnailurl: "https://source.unsplash.com/random/1600x900",
    developer: "개발자이름",
    projectThumbnail: "../assets/logo.png",
    date: "",
    // description: "여기에는 프로젝트 디스크립션이 들어갈 공간입니다ㅏㅏㅏㅏ",
    projectData: "",
    user: "",
    login: "",
    isMine: ""
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
        // console.log(pcode, '첫단계 옴??')
        this.$emit("popdetail", pcode);
      }
    }
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

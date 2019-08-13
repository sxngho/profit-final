<template>
  <div>
    <v-flex class="text-xs-center">
      <v-btn text class="white--text" @click="popdetail(project_id)" style="height:80%;width:80%;">
        <v-layout align-center>
          <v-flex xs2 hidden-xs-only>
            <v-img :src="projectimage" height="5vw" width="100%"></v-img>
          </v-flex>
          <v-flex xs12>
            <div>
              <div class="black--text" style="font-weight:900">{{projecttitle}}</div>
              <div class="black--text">{{projectterm}} {{projectrank}}</div>
              <p
                class="grey--text"
                v-html="projectcontent"
                style="height:100px; width:100%; overflow: hidden; 
  text-overflow: ellipsis; font-size:8px"
              />
              <v-chip v-for="tech in projecttech" class="tech d-inline-block caption">{{ tech }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-btn>
      <!-- <ProjectList v-if="!stateAdd"></ProjectList> -->
    </v-flex>
  </div>
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
          "name(이름지정)",
          "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=700,height=600"
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
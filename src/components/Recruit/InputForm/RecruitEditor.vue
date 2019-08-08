<template>
  <div class="recruitEditor__container">
    <div class="recruitEditor__content">
      <div class="category__content contentBox">
        <div class="category__title titleBox">카테고리</div>
        <div class="category__select inputBox">
          <v-autocomplete v-model="category" :items="categoryList" placeholder="선택하세요."></v-autocomplete>
        </div>
      </div>
      <div class="projectTitle__content contentBox">
        <div class="projectTitle__title titleBox">프로젝트 제목</div>
        <div class="projectTitle__input inputBox">
          <input
            type="text"
            style="width:500px"
            v-model="projectTitle"
            placeholder="프로젝트 제목을 입력하세요."
            maxlength="27"
          />
        </div>
      </div>
      <div class="duration__content contentBox">
        <div class="duration__title titleBox">예상 기간</div>
        <div class="duration__input inputBox">{{this.createDay}}&nbsp~&nbsp{{this.endDay}}</div>
      </div>
      <v-date-picker v-model="endDay" color="purple lighten-1"></v-date-picker>

      <div class="budget__content contentBox">
        <div class="budget__title titleBox">책임자</div>
        <div class="budget__input inputBox">
          <input type="text" v-model="chief" placeholder="홍길동" />
        </div>
      </div>
      <div class="budget__content contentBox">
        <div class="budget__title titleBox">지출 가능 예산</div>
        <div class="budget__input inputBox">
          <input type="text" v-model="budget" placeholder="0" />원
        </div>
      </div>
      <div class="budget__content contentBox">
        <div class="budget__title titleBox">위약금</div>
        <div class="budget__input inputBox">
          <input type="text" v-model="penalty" placeholder="0" />원
        </div>
      </div>
      <div class="projectSummary__content contentBox">
        <div class="projectSummary__title titleBox">프로젝트 요약</div>
        <div class="projectSummary__input inputBox">
          <textarea
            style="width:300px"
            v-model="projectSummary"
            placeholder="최대 30글자까지 입력 가능합니다."
            maxlength="30"
          ></textarea>
        </div>
      </div>
      <div class="projectContent__content contentBox">
        <div class="projectContent__title titleBox">프로젝트 내용</div>
        <div class="projectContent__input inputBox" style="width:550px; height:700px">
          <vue-editor v-model="projectContent" style="width:550px; height:530px;"></vue-editor>
        </div>
      </div>
      <div class="techList__content contentBox">
        <div class="techList__title titleBox">관련 기술</div>
        <div class="techList__input inputBox">
          <input
            type="text"
            v-model="techName"
            placeholder="프로젝트에 필요한 기술을 검색 후 클릭하세요."
            style="width:500px"
          />
        </div>
      </div>
      <ShowTechList />
      <SelectTechList />
      <div class="closingDate__content contentBox">
        <div class="closingDate__title titleBox">모집 마감일자</div>
        <div class="closingDate__input inputBox">
          <!-- <v-overflow-btn :items="closingDateList" label="마감일" v-model="closingDate"></v-overflow-btn> -->
          <v-autocomplete v-model="closingDate" :items="closingDateList"></v-autocomplete>
        </div>
      </div>
      <button
        style="margin-left:350px; margin-top:50px; background:blueviolet; color:white; width:50px; height:30px"
        @click="submit"
      >등록</button>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import ShowTechList from "../InputForm/ShowTechList";
import SelectTechList from "../InputForm/SelectTechList";
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      categoryList: [
        "앱",
        "웹",
        "임베디드",
        "빅데이터",
        "블록체인",
        "인공지능"
      ],
      closingDateList: ["7일 후", "14일 후", "21일 후", "28일 후", "50일 후"],
      category: "",
      closingDate: "",
      projectTitle: "",
      budget: "",
      projectContent: "",
      projectSummary: "",
      endDay: new Date().toISOString().substr(0, 10),
      createDay: new Date().toISOString().slice(0, 10),
      techName: "",
      showTechList: [],
      user: "",
      recruitImage: "",
      chief: "",
      penalty: ""
    };
  },
  components: {
    VueEditor,
    ShowTechList,
    SelectTechList
  },
  created() {
    this.user = this.$session.get("session_id");
  },
  watch: {
    techName(to, from) {
      this.showTechList = [];
      if (this.techName === "") {
        this.showTechList = [];
      } else {
        for (let i = 0; i < this.$store.state.techList.length; i++) {
          if (
            this.$store.state.techList[i].indexOf(
              this.techName.toLowerCase()
            ) !== -1
          ) {
            this.showTechList.push(this.$store.state.techList[i]);
          }
        }
      }
      this.$store.commit("showingSameTechList", this.showTechList);
    },
    budget: function(newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.budget = result));
    },
    penalty: function(newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.penalty = result));
    }
  },
  methods: {
    showNotification(group, type, title, text) {
      this.$notify({
        group,
        title,
        text,
        type
      });
    },
    async submit() {
      const recruitInfo = {
        category: this.category,
        projectTitle: this.projectTitle,
        createDay: this.createDay,
        endDay: this.endDay,
        budget: this.budget,
        projectSummary: this.projectSummary,
        projectContent: this.projectContent,
        requiredSkills: this.$store.state.requiredSkills,
        closingDate: this.closingDate,
        session_id: this.user,
        chief: this.chief,
        penalty: this.penalty
      };
      console.log("infotest");
      console.log(recruitInfo);
      if (this.$session.get("session_id")) {
        var result = await FirebaseService.INSERT_recruitInfo(recruitInfo);
        this.showNotification(
          "foo-css",
          "success",
          `${this.$session.get("session_id")}님`,
          `recruitInfo 내용이 올라갔습니다.!`,
          console.log(recruitInfo)
        );
      } else {
        alert("권한이 없습니다.");
      }
    }
  }
};
</script>

<style scoped>
.recruitEditor__container {
  background-color: white;
  width: 1080px;
  height: 1800px;
  margin-left: 150px;
  margin-right: 150px;
}
.titleBox {
  display: flex;
  align-items: center;
  height: 50px;
  width: 180px;
  background-color: blueviolet;
  border: 1px solid #2c2c2c;
  color: white;
}
.inputBox {
  display: flex;
  align-items: center;
  height: 50px;
  width: 550px;
  background-color: white;
  border: 1px solid #2c2c2c;
}
.contentBox {
  display: flex;
}
</style>

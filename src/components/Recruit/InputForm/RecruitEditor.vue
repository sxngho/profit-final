<template>
  <div class="recuritEditor__container">
    <div class="recuritEditor__content">
      <div class="category__content contentBox">
        <div class="category__title titleBox">카테고리</div>
        <div class="category__select inputBox">
          <v-overflow-btn :items="categoryList" label="분류" v-model="category"></v-overflow-btn>
        </div>
      </div>
      <div class="projectTitle__content contentBox">
        <div class="projectTitle__title titleBox">프로젝트 제목</div>
        <div class="projectTitle__input inputBox">
          <input type="text" style="width:300px" v-model="projectTitle" />
        </div>
      </div>
      <div class="duration__content contentBox">
        <div class="duration__title titleBox">예상 기간</div>
        <div class="duration__input inputBox"></div>
      </div>
      <div class="budget__content contentBox">
        <div class="budget__title titleBox">지출 가능 예산</div>
        <div class="budget__input inputBox">
          <input type="text" v-model="budget" />원
        </div>
      </div>
      <div class="projectSummary__content contentBox">
        <div class="projectSummary__title titleBox">프로젝트 요약</div>
        <div class="projectSummary__input inputBox">
          <textarea style="width:300px" v-model="projectSummary"></textarea>
        </div>
      </div>
      <div class="projectContent__content contentBox">
        <div class="projectContent__title titleBox">프로젝트 내용</div>
        <div class="projectContent__input inputBox" style="width:550px; height:500px">
          <vue-editor v-model="projectContent" style="width:550px; height:500px"></vue-editor>
        </div>
      </div>
      <div class="techList__content contentBox">
        <div class="techList__title titleBox">관련 기술</div>
        <div class="techList__input inputBox"></div>
      </div>
      <div class="closingDate__content contentBox">
        <div class="closingDate__title titleBox">모집 마감일자</div>
        <div class="closingDate__input inputBox">
          <v-overflow-btn :items="closingDateList" label="마감일" v-model="closingDate"></v-overflow-btn>
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
      closingDateList: [
        "7월26일",
        "7월27일",
        "7월28일",
        "7월29일",
        "7월30일",
        "7월31일",
        "8월01일",
        "8월02일",
        "8월03일",
        "8월04일"
      ],
      category: "",
      closingDate: "",
      projectTitle: "",
      duration: "",
      budget: "",
      projectContent: "",
      projectSummary: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    submit: function() {
      alert("등록완료!");
    }
  }
};
</script>

<style scoped>
.recuritEditor__container {
  background-color: white;
  width: 1080px;
  height: 1000px;
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
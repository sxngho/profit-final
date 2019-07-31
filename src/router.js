import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Story from "./views/Story.vue";
import CompanyIntro from "./views/CompanyIntro.vue";
import Git from "./views/Git.vue";
import Followers from "./views/Followers.vue";
import Project from "./views/Project.vue";
import Vuex from "vuex";
import store from "./store";
import Manager from "./views/Manager.vue";
import Chat from "./views/chat.vue";
import Recruit from "./views/Recruit.vue";
import RecruitDetail from "./components/Recruit/RecruitDetail.vue";
import Studio from "./views/Studio.vue";
import ReChat from "./components/Recruit/Chat.vue";
import Consult from "./components/Recruit/Consult.vue";
import Contract from "./components/Recruit/Contract.vue";
import RecuritEditorPage from "./views/RecuritEditorPage.vue";
import Alert from "./views/Alert.vue";
import Company from "./views/Company.vue";

Vue.use(Vuex);
Vue.use(store);
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // 형식통일
  // path, name은 모두 소문자
  // component는 카멜 표기법
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/story/:id",
      name: "story",
      component: Story
    },
    {
      path: "/companyIntro",
      name: "companyIntro",
      component: CompanyIntro
    },
    {
      path: "/git",
      name: "git",
      component: Git
    },
    {
      path: "/followers",
      name: "followers",
      component: Followers
    },
    {
      path: "/project/:pcode",
      name: "project",
      component: Project
    },
    {
      path: "/manager",
      name: "manager",
      component: Manager
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat
    },
    {
      path: "/recruits",
      name: "recruits",
      component: Recruit
    },
    {
      path: "/recruit/:rcode",
      name: "recruit",
      component: RecruitDetail
    },
    {
      path: "/studio",
      name: "studio",
      component: Studio
    },
    {
      path: "/chat/:ccode",
      name: "chat",
      component: ReChat
    },
    {
      path: "/consult/:ccode",
      name: "consult",
      component: Consult
    },
    {
      path: "/contract/:ccode",
      name: "contract",
      component: Contract
    },
    {
      path: "/recuriteditorpage",
      name: "recuriteditorpage",
      component: RecuritEditorPage
    },
    {
      path: "/alert",
      name: "alert",
      component: Alert
    },
    {
      path: "/company",
      name: "company",
      component: Company
    }
  ]
});

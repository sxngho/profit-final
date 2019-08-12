import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // https://joshua1988.github.io/web-development/vuejs/vuex-start/

  // State : 컴포넌트 간에 공유할 data 속성을 의미한다.
  // 정의 -> this.$store.state.변수명
  state: {
    session_id: "",
    check_false: false,
    check_true: true,
    projectViewToggle: false,
    no_header: false,
    followerView: false,
    followingView: false,
    followerList:[],
    followingList:[],
    techFilterList: [],
    allPortfolioList: [],
    showPortfolioList: [],
    techList: [
      "vue", "javascript", "jquery", "java", "c", "c++", "react", "python", "spring", "django", "node.js", "express",
      "c#", "php", "html", "ios", "css", "mysql", "mongoDB", ".net", "objective-c", "angular.js",
      "json", "r", "ajax", "ruby", "scala", "typescript", "swift", "linux", "nosql"
    ],
    showTechList: [],
    requiredSkills: [],
    reload: true,
    companyList: [],
    showCompanyList: [],
    showCompanyListBottomBar: [],
    level: "",
    alertList: { alert: [], unread: [] },
    start: 0,
    end: 13,
    pageLength: "",
    isFetch: false,
  },
  // Getter : get 함수 정의
  // 정의 -> return state.변수명
  // 호출 -> this.$store.getters.함수명;
  getters: {
    getSession: function (state) {
      return state.session_id;
    },
    getPVT: function (state) {
      return state.projectViewToggle;
    },
    getReload: function (state) {
      return state.reload;
    },
    getLevel: function (state) {
      return state.level;
    },
    getalertList: function (state) {
      return state.alertList;
    },
    getIsFetch : function(state) {
      return state.isFetch;
    },
    getfollowerList: function (state) {
      return state.followerList
    },
    getfollowingList: function (state) {
      return state.followingList
    },
  },

  // Mutations : 값변경 / 동기
  // 호출 -> this.$store.commit('함수명');
  mutations: {
    onReload: function (state, payload) {
      return (state.reload = !state.reload);
    },
    setSession: function (state, payload) {
      return (state.session_id = payload);
    },
    SetFetch: function (state, payload) {
      return (state.isFetch = payload);
    },
    convertPVT: function (state, payload) {
      return (state.projectViewToggle = payload);
    },
    setFollowerView: (state, val) => {
      state.followerView = val;
    },
    setFollowingView: (state, val) => {
      state.followingView = val;
    },
    setfollowerList: function (state, payload) {
      return state.followerList = payload;
    },
    setfollowingList: function (state, payload) {
      return state.followingList = payload;
    },
    addFilterTech: function (state, payload) {
      state.techFilterList.push(payload);
      state.showPortfolioList = state.allPortfolioList;
      const all = state.allPortfolioList;
      const bottle = [];

      for (let i = 0; i < all.length; i++) {
        const isPush = false;
        for (let j = 0; j < state.techFilterList.length; j++) {
          if (isPush) {
            break;
          }
          for (let k = 0; k < all[i].projecttech.length; k++) {
            if (state.techFilterList[j].title === all[i].projecttech[k]) {
              bottle.push(all[i]);
              isPush = true;
              break;
            }
          }
        }
      }
      state.showPortfolioList = bottle;
    },
    deleteFilterTech: function (state, payload) {
      const index = state.techFilterList.indexOf(payload);
      state.techFilterList.splice(index, 1);
      state.showPortfolioList = state.allPortfolioList;
      if (state.techFilterList.length !== 0) {
        const all = state.allPortfolioList;
        const bottle = [];
        for (let i = 0; i < all.length; i++) {
          const isPush = false;
          for (let j = 0; j < state.techFilterList.length; j++) {
            if (isPush) {
              break;
            }
            for (let k = 0; k < all[i].projecttech.length; k++) {
              if (state.techFilterList[j].title === all[i].projecttech[k]) {
                bottle.push(all[i]);
                isPush = true;
                break;
              }
            }
          }
        }
        state.showPortfolioList = bottle;
      }
    },
    moreBtnClick: function (state, payload) {
      state.pageLength = payload;
      console.log(state.pageLength);
      if (state.end < state.pageLength) {
        state.end += 12;
        state.start += 12;
        if (state.end > state.pageLength) {
          state.end = state.pageLength;
        }
        this.commit('pushPortfolio');
      }
    },
    pushPortfolio: function (state) {
      for (let i = state.start; i < state.end; i++) {
        state.showPortfolioList.push(state.allPortfolioList[i]);
      }
    },
    selectAllPortfolioList: function (state, payload) {
      state.allPortfolioList = payload;
      this.commit('pushPortfolio');
    },
    showingSameTechList: function (state, payload) {
      state.showTechList = payload;
    },
    addTechList: function (state, payload) {
      state.requiredSkills.push(payload);
    },
    deleteTechList: function (state, payload) {
      state.requiredSkills.splice(payload, 1);
    },
    filterCompany: function (state, payload) {
      for (let i = 0; i < state.companyList.length; i++) {
        if (state.companyList[i].indexOf(payload) !== -1) {
          state.showCompanyList.push(state.companyList[i]);
        }
      }
    },
    clearShowCompanyList: function (state, payload) {
      state.showCompanyList = [];
    },
    showAllCompany: function (state, payload) {
      state.showCompanyList = [];
      for (let i = 0; i < state.companyList.length; i++) {
        state.showCompanyList.push(state.companyList[i]);
      }
    },
    filterCompanyBottomBar: function (state, payload) {
      state.showCompanyListBottomBar = [];
      for (let i = 0; i < state.companyList.length; i++) {
        if (state.companyList[i].indexOf(payload) !== -1) {
          state.showCompanyListBottomBar.push(state.companyList[i]);
        }
      }
    },
    clearBottomBar: function (state, payload) {
      state.showCompanyListBottomBar = [];
    },
    changeLevel: function (state, payload) {
      state.level = payload;
    },
    changealertList: function (state, payload) {
      state.alertList = payload;
    }
  },

  // Action : 값변경 / 비동기
  // 보통 http.get 이나 axios는 action에서 처리함.
  actions: {}
});

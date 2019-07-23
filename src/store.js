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
    followingView: false
  },
  // Getter : get 함수 정의
  // 정의 -> return state.변수명
  // 호출 -> this.$store.getters.함수명;
  getters: {
    getSession: function(state) {
      return state.session_id;
    },
    getPVT: function(state) {
      return state.projectViewToggle;
    }
  },

  // Mutations : 값변경 / 동기
  // 호출 -> this.$store.commit('함수명');
  mutations: {
    setSession: function(state, payload) {
      return (state.session_id = payload);
    },
    convertPVT: function(state, payload) {
      return (state.projectViewToggle = payload);
    },
    setFollowerView: (state, val) => {
      state.followerView = val;
    },
    setFollowingView: (state, val) => {
      state.followingView = val;
    }
  },

  // Action : 값변경 / 비동기
  // 보통 http.get 이나 axios는 action에서 처리함.
  actions: {}
});

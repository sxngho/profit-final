<template>
  <v-dialog v-model="signupforusermodal" max-width="600px" xs6>
    <template v-slot:activator="{ on }">
      <v-layout
        v-on="on"
        justify-center
        style=" cursor:pointer; background:#ECF0F199; margin:0 10px; height:200px; color:#2980B9"
      >
        <div style="display:inline; margin:auto;" class="text-center">
          <i class="far fa-user fa-5x" />
          <br />
          <br />개인용
        </div>
      </v-layout>
    </template>

    <v-container class="signmodal">
      <v-layout row wrap style="padding:10px 20px;">
        <v-spacer />
        <span class="font-weight-regular headline">유저 회원가입</span>
        <v-spacer />
      </v-layout>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- User name -->
            <!-- email -->
            <v-flex xs12>
              <v-text-field
                @blur="idCheck"
                label="* 아이디 "
                placeholder="  user@gmail.com"
                required
                v-model="signup_id"
                :rules="[idRules.required, idRules.emailMatch]"
              >
                <template v-slot:append-outer>
                  <small
                    style="color:red;white-space: nowrap;"
                    v-if="!signup_id_Validation && signup_id_Msg!=='' && signup_id !== ''"
                  >{{signup_id_Msg}}</small>
                  <small
                    style="color:green;white-space: nowrap;"
                    v-if="signup_id_Validation && signup_id_Msg!=='' && signup_id !== ''"
                  >{{signup_id_Msg}}</small>
                </template>
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                @blur="nicknameCheck"
                label="* 닉네임"
                required
                v-model="nickname"
                :rules="[nicknameRules.required]"
              >
                <template v-slot:append-outer>
                  <small
                    style="color:red;white-space: nowrap;"
                    v-if="!nicknameValidation && nicknameMsg!=='' && nickname !== ''"
                  >{{nicknameMsg}}</small>
                  <small
                    style="color:green;white-space: nowrap;"
                    v-if="nicknameValidation && nicknameMsg!=='' && nickname !== ''"
                  >{{nicknameMsg}}</small>
                </template>
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field label="* 성명" required v-model="userName"></v-text-field>
            </v-flex>

            <!-- Password -->
            <v-flex xs12>
              <v-text-field
                class="pwfield"
                @blur="passwordCheck"
                label="* 비밀번호"
                type="password"
                required
                v-model="signup_password"
                :rules="[pwdRules.required]"
              ></v-text-field>
              <v-text-field
                class="pwfield"
                @blur="passwordCheck"
                label="* 비밀번호 확인 "
                type="password"
                required
                v-model="signup_password_check"
                :rules="[pwdRules.repeat]"
              >
                <template v-slot:append-outer>
                  <small
                    style="color:red;white-space: nowrap;"
                    v-if="!signup_password_Validation &&
                  signup_password_check !== '' && signup_password !== '' && signup_password_Msg !== '' "
                  >{{signup_password_Msg}}</small>
                  <small
                    style="color:green;white-space: nowrap;"
                    v-if="signup_password_Validation &&
                  signup_password_check !== '' && signup_password !== '' && signup_password_Msg !== '' "
                  >{{signup_password_Msg}}</small>
                </template>
              </v-text-field>
            </v-flex>

            <!-- PhoneNumber -->
            <v-flex xs12>
              <v-text-field
                @blur="phoneCheck"
                label="* 핸드폰 번호"
                required
                v-model="phonenumber"
                :rules="[phonenumberRules.required, phonenumberRules.check]"
              >
                <template v-slot:append-outer>
                  <small
                    style="color:red;white-space: nowrap;"
                    v-if="!phonenumberValidation &&
                  phonenumber !== '' && phonenumberMsg !== '' "
                  >{{phonenumberMsg}}</small>
                </template>
              </v-text-field>
            </v-flex>

            <small>*은 필수입력 항목입니다.</small>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="signupforusermodal = false">닫기</v-btn>
        <v-btn
          color="blue darken-1"
          text
          v-if="signup_id_Validation && signup_password_Validation && phonenumberValidation && nicknameValidation"
          @click="SignupUser(signup_id, signup_password, phonenumber, userSkills, userImage, userName, userIntro, userCareers, userEducations, nickname, showPhoneNumber)"
        >회원가입</v-btn>
        <v-btn color="blue darken-1" text v-else disabled>회원가입</v-btn>
      </v-card-actions>
    </v-container>
  </v-dialog>
</template>

<script>
document.ready;
</script>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    userIdData: [],
    companyIdData: [],

    idLabel: "* 아이디",
    signupforusermodal: false,
    careers: [],
    career: "",
    signup_id: "",
    signup_id_Validation: false,
    signup_id_Msg: "",

    signup_password: "",
    signup_password_check: "",
    signup_password_Validation: false,
    signup_password_Msg: "",

    phonenumber: "",
    phonenumberValidation: false,
    phonenumberMsg: "",
    showPhoneNumber: true,

    userSkills: [],
    userImage: "",
    userName: "",
    userIntro: "",
    userCareers: [],
    userEducations: [],
    nickname: "",
    nicknameValidation: false,
    nicknameMsg: "",

    idRules: {
      required: value => !!value || "필수입력입니다",
      emailMatch: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "이메일 형식이여야 합니다!";
      }
    },
    nicknameRules: {
      required: value => !!value || "필수입력입니다"
    },
    pwdRules: {
      required: value => !!value || "필수입력입니다",
      repeat: value => !!value || "비밀번호를 재입력해주세요!"
    },
    phonenumberRules: {
      required: value => !!value || "필수입력입니다",
      check: value => {
        const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        return pattern.test(value) || "폰 번호 형식이여야 합니다!";
      }
    }
  }),
  mounted() {
    this.fetchData();
  },
  watch: {
    signup_id: function() {
      if (this.signup_id.length == 0) {
        this.signup_id_Msg = "";
      }
    },
    nickname: function() {
      if (this.nickname.length == 0) {
        this.nicknameMsg = "";
      }
    },
    signup_password: function() {
      if (this.signup_password.length == 0) {
        this.signup_password_Msg = "";
      }
    },
    signup_password_check: function() {
      if (this.signup_password_check.length == 0) {
        this.signup_password_Msg = "";
      }
    },
    phonenumber: function() {
      var arr = this.phonenumber.split("-");
      var pn = "";
      for (var i in arr) {
        pn += arr[i];
      }
      if (this.phonenumber.length == 0) {
        this.phonenumberMsg = "";
      } else if (pn.length > 10) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (this.phonenumber.match(phoneno)) {
          this.phonenumberValidation = true;
        } else {
          this.phonenumberValidation = false;
          this.phonenumberMsg =
            "핸드폰 번호 양식을 지켜주세요. ex ) 010-1234-5678";
        }
      }
    }
  },
  methods: {
    phoneCheck() {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if (this.phonenumber.match(phoneno)) {
        this.phonenumberValidation = true;
      } else {
        this.phonenumberValidation = false;
        this.phonenumberMsg =
          "핸드폰 번호 양식을 지켜주세요. ex ) 010-1234-5678";
      }
    },
    nicknameCheck() {
      for (var i in this.userIdData) {
        if (this.userIdData[i].id == this.nickname) {
          this.nicknameValidation = false;
          this.nicknameMsg = "이미 존재하는 닉네임입니다.";
          return;
        }
      }
      for (var j in this.companyIdData) {
        if (this.companyIdData[j].id == this.nickname) {
          this.nicknameValidation = false;
          this.nicknameMsg = "이미 존재하는 닉네임입니다.";
          return;
        }
      }
      var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; //특수문자 체크
      if (pattern_spc.test(this.nickname)) {
        this.nicknameValidation = false;
        this.nicknameMsg = "닉네임에 특수문자는 사용이 불가능합니다.";
      } else {
        this.nicknameValidation = true;
        this.nicknameMsg = "사용 가능한 닉네임입니다.";
      }
    },
    idCheck() {
      for (var i in this.userIdData) {
        if (this.userIdData[i].data.email == this.signup_id) {
          this.signup_id_Validation = false;
          this.signup_id_Msg = "이미 존재하는 아이디입니다.";
          return;
        }
      }
      for (var j in this.companyIdData) {
        console.log(this.companyIdData[j].data.id);
        if (this.companyIdData[j].data.id == this.signup_id) {
          this.signup_id_Validation = false;
          this.signup_id_Msg = "이미 존재하는 아이디입니다.";
          return;
        }
      }
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.signup_id.match(mailformat)) {
        this.signup_id_Validation = true;
        this.signup_id_Msg = "사용 가능한 아이디입니다.";
      } else {
        this.signup_id_Validation = false;
        this.signup_id_Msg = "아이디를 이메일 형식으로 입력해주세요.";
      }
    },
    passwordCheck() {
      if (this.signup_password_check !== "" && this.signup_password !== "") {
        if (this.signup_password_check == this.signup_password) {
          if (this.signup_password.length < 6) {
            this.signup_password_Validation = false;
            this.signup_password_Msg = "비밀번호는 최소 6자리이상이어야합니다.";
          }
          this.signup_password_Validation = true;
          this.signup_password_Msg = "비밀번호가 일치합니다.";
        } else {
          this.signup_password_Validation = false;
          this.signup_password_Msg = "비밀번호가 일치하지 않습니다.";
        }
      }
    },
    async fetchData() {
      this.userIdData = await FirebaseService.SELECT_UserIdData();
      this.companyIdData = await FirebaseService.SELECT_CompanyIdData();
    },
    addNewCareer() {
      this.careers.push(this.career);
    },
    deleteCareer(index) {
      this.careers.splice(index, 1);
    },
    async SignupUser(
      id,
      password,
      phonenumber,
      userSkills,
      userImage,
      userName,
      userIntro,
      userCareers,
      userEducations,
      nickname,
      showPhoneNumber
    ) {
      var arr = phonenumber.split("-");
      var pn = "";
      for (var i in arr) {
        pn += arr[i];
      }
      var result = await FirebaseService.SignupUser(
        id,
        password,
        pn,
        userSkills,
        userImage,
        userName,
        userIntro,
        userCareers,
        userEducations,
        nickname,
        showPhoneNumber
      );
      if (result == true) {
        this.signupforusermodal = false;
        this.userName = "";
        this.nickname = "";
        this.signup_id = "";
        this.signup_password = "";
        this.phonenumber = "";
        this.$emit("signup");
        this.$swal(
          "회원가입에 성공하였습니다.",
          "스토리 페이지에서 정보를 입력해주세요!",
          "success"
        );
        // this.showNotification("foo-css","success",`${nickname}님`,`회원가입 완료!`);
      }
    }
  }
};
</script>


<style>
.pwfield {
  font-family: "monospace";
}
</style>

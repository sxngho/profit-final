<template>

    <v-dialog v-model="signupforcompanymodal" max-width="600px" xs6>

      <template v-slot:activator="{ on }" >
        <v-layout v-on="on" justify-center style=" cursor:pointer; background:#ECF0F199; margin:0 10px; height:200px; color:#2980B9">
          <div style="display:inline; margin:auto;" class="text-center">
            <i class="far fa-building fa-5x"/><br/><br/>회사용
          </div>
        </v-layout>
      </template>


      <v-container class="signmodal">
        <v-layout row wrap style="padding:10px 20px;">
          <v-spacer/>
          <span class="font-weight-regular headline">기업 회원가입</span>
          <v-spacer/>
        </v-layout>


        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field @blur="idCheck" label="* 아이디 " placeholder="company@gmail.com" required v-model="signup_id" :rules="[idRules.required, idRules.emailMatch]">
                  <template v-slot:append-outer>
                    <!-- <small style="color:red" v-if="!signup_id_Validation && signup_id_Msg!=='' && signup_id !== ''"> {{signup_id_Msg}} </small> -->
                    <small style="color:green;white-space: nowrap;" v-if="signup_id_Validation && signup_id_Msg!=='' && signup_id !== ''"> {{signup_id_Msg}} </small>
                  </template>
                </v-text-field>
              </v-flex>

              <!-- Company Name -->
              <v-flex xs12>
                <v-text-field label="* 회사이름" required v-model="company_name"></v-text-field>
              </v-flex>

              <!-- Password -->
              <v-flex xs12>
                <v-text-field class="pwfield" @blur="passwordCheck" label="* 비밀번호" type="password" required v-model="signup_password"
                :rules="[pwdRules.required]">
                </v-text-field>
                <v-text-field class="pwfield" @blur="passwordCheck" label="* 비밀번호 확인 " type="password" required v-model="signup_password_check"
                :rules="[pwdRules.repeat]">
                <template v-slot:append-outer>
                  <small style="color:red; white-space: nowrap;" v-if="!signup_password_Validation &&
                  signup_password_check !== '' && signup_password !== '' && signup_password_Msg !== '' "> {{signup_password_Msg}} </small>
                  <small style="color:green; white-space: nowrap;" v-if="signup_password_Validation &&
                  signup_password_check !== '' && signup_password !== '' && signup_password_Msg !== '' "> {{signup_password_Msg}} </small>
                </template>
                </v-text-field>
              </v-flex>

            </v-layout>
          </v-container>

          <!-- *은 필수입력 항목입니다. -->
          <small> *은 필수입력 항목입니다. </small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="signupforcompanymodal = false"> 닫기 </v-btn>
          <v-btn color="blue darken-1" text
          v-if="signup_id_Validation && signup_password_Validation"
          @click="SignupCompany(company_name, signup_id, signup_password)"> 회원가입 </v-btn>
          <v-btn color="blue darken-1" text v-else disabled>회원가입</v-btn>
        </v-card-actions>
      </v-container>
    </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

  export default {
    data: () => ({
      userIdData : [],
      companyIdData : [],

      signupforcompanymodal: false,
      company_name : '',

      signup_id: "",
      signup_id_Validation : false,
      signup_id_Msg : "",

      signup_password: "",
      signup_password_check : "",
      signup_password_Validation : false,
      signup_password_Msg : "",

      idRules:{
        required: value => !!value || '필수입력입니다',
        emailMatch: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '이메일 형식이여야 합니다!'
          },
      },
      pwdRules:{
        required: value => !!value || '필수입력입니다',
        repeat : value => !!value || '비밀번호를 재입력해주세요!',
      },

    }),
    mounted() {
      this.fetchData();
    },
    watch: {
      signup_id: function() {
        if ( this.signup_id.length == 0 ) {
          this.signup_id_Msg = "";
        }
      },
      signup_password: function() {
        if ( this.signup_password.length == 0 ) {
          this.signup_password_Msg = "";
        }
      },
      signup_password_check: function() {
        if ( this.signup_password_check.length == 0 ) {
          this.signup_password_Msg = "";
        } else if ( this.signup_password_check.length == this.signup_password.length ) {
          if ( this.signup_password_check !== '' && this.signup_password  !== '' ) {
            if ( this.signup_password_check == this.signup_password ) {
              this.signup_password_Validation = true;
              this.signup_password_Msg = "비밀번호가 일치합니다.";
            } else {
              this.signup_password_Validation = false;
              this.signup_password_Msg = "비밀번호가 일치하지 않습니다.";
            }
          }
        }
      },
    },
    methods : {
      async fetchData() {
        this.userIdData = await FirebaseService.SELECT_UserIdData();
        this.companyIdData = await FirebaseService.SELECT_CompanyIdData();
      },
      async SignupCompany(company_name, id, password) {
      var result = await FirebaseService.SignupCompany(company_name, id, password)
        if (result == true) {
          this.signupforcompanymodal = false;
          this.company_name='';
          this.signup_id='';
          this.signup_password='';
          this.$emit('signup')
          this.$swal('회원가입에 성공하였습니다.','기업 페이지에서 정보를 입력해주세요!','success')
        } else {
          console.log('안됨')
        }
      },
      idCheck() {
        for(var i in this.userIdData) {
          if ( this.userIdData[i].data.email == this.signup_id ) {
            this.signup_id_Validation = false;
            this.signup_id_Msg = "이미 존재하는 아이디입니다.";
            return ;
          }
        }
        for(var j in this.companyIdData) {
          if ( this.companyIdData[j].data.id == this.signup_id ) {
            this.signup_id_Validation = false;
            this.signup_id_Msg = "이미 존재하는 아이디입니다.";
            return ;
          }
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.signup_id.match(mailformat)) {
          this.signup_id_Validation = true;
          this.signup_id_Msg = "사용 가능한 아이디입니다.";
        } else {
          this.signup_id_Validation = false;
          this.signup_id_Msg = "아이디를 이메일 형식으로 입력해주세요.";
        }
      },
      passwordCheck() {
        if ( this.signup_password_check !== '' && this.signup_password  !== '' ) {
          if ( this.signup_password_check == this.signup_password ) {
            this.signup_password_Validation = true;
            this.signup_password_Msg = "비밀번호가 일치합니다.";
          } else {
            this.signup_password_Validation = false;
            this.signup_password_Msg = "비밀번호가 일치하지 않습니다.";
          }
        }
      },
    }
  }
</script>

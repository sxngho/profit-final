<template>
  <v-dialog v-model="signupforusermodal" max-width="600px" xs6>
    <template v-slot:activator="{ on }">
      <v-btn flat outline color="indigo" v-on="on" style="padding: 100px 80px;">개인용</v-btn>
    </template>

    <v-card>
      <!-- title -->
      <v-card-title>
        <span class="headline">Sign up For User</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- User name -->
            <v-flex xs12 sm6>
              <v-text-field label="first name*" required v-model="first_name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="last name*" required v-model="last_name"></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field label="nickname*" required v-model="nickname"></v-text-field>
            </v-flex>

            <!-- email -->
            <v-flex xs12>
              <v-text-field label="Email*" required v-model="signup_id"></v-text-field>
            </v-flex>

            <!-- Password -->
            <v-flex xs12>
              <v-text-field label="Password*" type="password" required v-model="signup_password"></v-text-field>
            </v-flex>

            <!-- PhoneNumber -->
            <v-flex xs12>
              <v-text-field label="PhoneNumber*" v-model="phonenumber"></v-text-field>
            </v-flex>

            <!-- 경력 -->
            <!--
              <v-flex xs12>
                <v-text-field label="경력을 입력하세요" v-model="career"></v-text-field>
                <v-btn flat @click="addNewCareer"> ADD </v-btn>
                <v-list subheader>
                  <v-list-tile    v-for="(career, index) in careers" >
                    <v-list-tile-content>
                      <v-list-tile-title v-html="career"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <i class="fa fa-minus-circle"  @click="deleteCareer(index)"></i>
                    </v-list-tile-action>
                  </v-list-tile>

                </v-list>
              </v-flex>
            -->

            <!-- 이미지 -->
            <v-flex xs12>
              <!-- TODO Add ImgUpload Btn-->
              <v-flex xs12></v-flex>
            </v-flex>
          </v-layout>
        </v-container>

        <!-- *은 필수입력 항목입니다. -->
        <small>*indicates required field</small>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="signupforusermodal = false">Close</v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="signupforusermodal = false, SignupUser(signup_id, signup_password, first_name, last_name, phonenumber, userSkills, userImage, userName, userIntro, userCareers, userEducations, nickname)"
        >SignUp</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    signupforusermodal: false,
    careers: [],
    career: "",
    signup_id: "",
    signup_password: "",
    first_name: "",
    last_name: "",
    phonenumber: "",
    userSkills: [],
    userImage: "",
    userName: "",
    userIntro: "",
    userCareers: [],
    userEducations: [],
    nickname : '',
  }),
  methods: {
    addNewCareer() {
      this.careers.push(this.career);
    },
    deleteCareer(index) {
      this.careers.splice(index, 1);
    },
    async SignupUser(
      id,
      password,
      first_name,
      last_name,
      phonenumber,
      userSkills,
      userImage,
      userName,
      userIntro,
      userCareers,
      userEducations,
      nickname
    ) {
      var result = await FirebaseService.SignupUser(
        id,
        password,
        first_name,
        last_name,
        phonenumber,
        userSkills,
        userImage,
        userName,
        userIntro,
        userCareers,
        userEducations,
        nickname
      );
      if (result == true) {
        this.$session.set("session_id", id);
        this.$store.commit("setSession", id);
        // console.log(this.$store.getters.getSession,"setSession")
      }
    }
  }
};
</script>

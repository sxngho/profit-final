<template>

    <v-dialog v-model="signupforcompanymodal" max-width="600px" xs6>

      <template v-slot:activator="{ on }" >
        <v-btn flat outline color="indigo" v-on="on" style="padding: 100px 80px;">회사용</v-btn>
      </template>


      <v-card>
        <!-- title -->
        <v-card-title>
          <span class="headline">Sign up For Company</span>
        </v-card-title>


        <v-card-text>
          <v-container grid-list-md>

            <v-layout wrap>
              <!-- Company Name -->
              <v-flex xs12>
                <v-text-field label="Company Name*" required v-model=company_name></v-text-field>
              </v-flex>

              <!-- email -->
              <v-flex xs12>
                <v-text-field label="Email*" required v-model="signup_id"></v-text-field>
              </v-flex>

              <!-- Password -->
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required v-model="signup_password"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple v-model="interests"
                ></v-autocomplete>
              </v-flex>

            </v-layout>
          </v-container>

          <!-- *은 필수입력 항목입니다. -->
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="signupforcompanymodal = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="signupforcompanymodal = false, SignupCompany(company_name, signup_id, signup_password, interests)">SignUp</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

  export default {
    data: () => ({
      signupforcompanymodal: false,
      company_name : '',
      signup_id : '',
      signup_password : '',
      interests : [],
    }),
    methods : {
      async SignupCompany(company_name, id, password, interests) {
      var result = await FirebaseService.SignupCompany(company_name, id, password, interests)
        if (result == true) {
          this.$session.set('session_id', id)
          this.$store.commit('setSession', id)
          // console.log(this.$store.getters.getSession, "setSession")
          // console.log(this.$session.get('session_id'))
        }
      }
    }
  }
</script>

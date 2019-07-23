<template>
  <v-dialog v-model="careermodal"  max-width="600px">

    <template v-slot:activator="{ on }">
      <img src="../../../assets/icon_set/pencil.png" alt="edit" style="cursor:pointer;" v-on="on">
    </template>


    <v-card>
      <v-toolbar>
        <span class="font-weight-regular headline">경력 추가</span>
        <v-spacer/>
        <div @click="clearCar"><i class="fa fa-close"/></div>
      </v-toolbar>

      <v-card-text>
        <v-layout row justify-center wrap>
          <v-flex xs10 sm5>
            <span class="subheading font-weight-bold">*회사명</span>
            <v-text-field
            single-line
            outline
            v-model="carcompany"
            ></v-text-field>
          </v-flex>
          <v-flex hidden-xs-only sm1/>
          <v-flex xs10 sm5>
            <span class="subheading font-weight-bold">직책/직무</span>
            <v-text-field
            single-line
            outline
            v-model="carposition"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row  wrap justify-center>
          <v-flex xs5>
            <span class="subheading font-weight-bold">시작일</span>
            <div><input type="date"
              single-line
              outline
              v-model="carstartday"
              ></input></div>
            </v-flex>
            <v-flex hidden-xs-only sm1/>
            <v-flex xs5>
              <span class="subheading font-weight-bold">종료일</span>
              <div><input type="date"
                single-line
                outline
                v-model="carendday"
                ></input></div>
              </v-flex>
            </v-layout>

            <v-layout hidden-xs-only style="height:1vw;"/>

            <v-layout row wrap justify-center>
              <v-flex xs10 sm11>
                <span class="subheading font-weight-bold">설명</span>
                <v-textarea
                outline
                v-model="cardescription"
                >
              </v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-layout row wrap justify-center>
          <v-btn v-on:click="sendCar(carcompany,carposition,carstartday,carendday,cardescription)" flat outline>등록</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </template>

  <script>

  export default {
    data: () => ({
      careermodal:false,
      carcompany : '',
      carposition : '',
      carstartday : '',
      carendday : '',
      cardescription : '',
    }),
    methods : {
      sendCar(carcompany,carposition,carstartday,carendday,cardescription) {
        var Json = new Object();
        Json.Company = carcompany;
        Json.Position = carposition;
        Json.Startday = carstartday;
        Json.Endday = carendday;
        Json.Description = cardescription;
        this.$emit('sendCar',Json);

        this.carcompany = '';
        this.carposition = '';
        this.carstartday = '';
        this.carendday = '';
        this.cardescription = '';
        this.careermodal = false;
      },
      clearCar() {
        this.carcompany = '';
        this.carposition = '';
        this.carstartday = '';
        this.carendday = '';
        this.cardescription = '';
        this.careermodal = false;
      }
    },
  }
  </script>

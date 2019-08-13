<template>
  <div>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-card outlined class="text-center" style="padding:25px 10px 5px 10px;position:relative; height:320px;">
        <p class="txtline">
          <span class="font-weight-light" style="font-size: 36px;">
            <span class="fontDoHyeon">{{ recruit.data.projectTitle }}</span>
          </span>
          <br/>
          <span class="caption">{{recruit.data.companyId}}</span>
        </p>
        <div>
          <div style="margin-bottom:10px;">
            <v-chip v-for="skill in recruit.data.requiredSkills"
            outlined small class="pa-2" color="indigo" style="margin:2px;">
              {{skill}}
            </v-chip>
          </div>
          <!-- <span class="indigo--text headline">{{recruit.data.endDay}}</span> -->
          <p class="grey--text txtBox font-weight-thin">
            <span class="fontDoHyeon ">{{recruit.data.projectSummary}}</span>
          </p>
          <span class="caption"> {{recruit.data.createDay}} ~ {{recruit.data.endDay}}</span>
        </div>

        <v-card-actions style="width:100%; position:absolute; bottom:10px;">
          <v-layout row justify-center>
            <v-btn outlined text rounded v-on="on">자세히보기</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </template>

    <div style="overflow:hidden">
      <v-layout row wrap class="ma-3">
        <v-card style="width:100%;min-height:560px;" outlined>
          <v-flex xs12 class="ma-4">
            <p class="text-center font-weight-bold display-1">{{recruit.data.projectTitle}}</p>
          </v-flex>
          <v-flex xs12>
            <p class="text-center grey--text">{{recruit.data.projectSummary}}</p>
          </v-flex>
          <v-flex xs8 offset-xs2>
            <table style="width:100%" class="text-center">
              <tr>
                <th><span class="caption">category </span></th>
                <td><v-chip small color="red" outlined>{{recruit.data.category}}</v-chip></td>
              </tr>
              <tr>
                <th><span class="caption">Term</span></th>
                <td><span class="indigo--text title">{{recruit.data.closingDate}}</span></td>
              </tr>
              <tr>
                <th><span class="caption">Pay</span></th>
                <td><span class="indigo--text title">{{recruit.data.budget}}</span></td>
              </tr>
            </table>
          </v-flex>
          <v-divider style="margin:20px 0px;"/>
          <v-flex xs10 offset-xs1>
            <p v-html="recruit.data.projectContent"></p>
          </v-flex>

          <v-flex style="width:100%; margin:20px;" v-if="level==2">
            <v-layout row justify-center>
                <v-btn @click="dib(recruit_id)" v-if="!alreadyDibs" outlined color="red">
                찜!
                </v-btn>
                <v-btn  @click="dib(recruit_id)" v-if="alreadyDibs" outlined color="red">
                찜 취소
              </v-btn>
            </v-layout>
          </v-flex>

        </v-card>
      </v-layout>

    </v-container>
  </div>
  </v-dialog>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "RecruitDetail",
  components: {
  },
  mounted() {
    this.alreadyDibs = this.userdata[0].dibs.includes(this.recruit_id);
    this.level = this.$session.get('level')
  },
  methods: {
    dib(recruit_id) {
      if ( !this.userdata[0].dibs.includes(recruit_id) ) {
        this.userdata[0].dibs.push(recruit_id);
        this.$emit('Checkflag',recruit_id,true)
        FirebaseService.UPDATE_userDibs(this.userdata[0].dibs, this.$session.get('session_id'));
        this.$swal.fire({
          title: '찜목록에 추가되었습니다.',
          html: "작업실에서 확인이 가능하며 <br/> 채팅방에 들어가시면 지원이 완료됩니다!",
          type: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '확인하러 가기',
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.value) {
            this.$router.push({name: 'story', params: {id : this.$session.get('session_id')}});
            this.dialog = false;
          } else {
            this.dialog = false;
          }
        })

      } else {
        this.userdata[0].dibs.splice(this.userdata[0].dibs.indexOf(recruit_id),1);
        this.$emit('Checkflag',recruit_id,false)
        FirebaseService.UPDATE_userDibs(this.userdata[0].dibs, this.$session.get('session_id'));
        this.$swal(
           '찜 목록에서 삭제',
           '해당 공고가 찜목록에서 삭제되었습니다.',
           'success'
         )
      }
      this.alreadyDibs = !this.alreadyDibs;
    },
  },
  data() {
    return {
      dialog : false,
      alreadyDibs : false,
      level : "",
    };
  },
  props: {
    recruit: { type: Object }, //프로젝트 메인 이미지
    userdata: { type: Array }, // 프로젝트 이름
    recruit_id: { type: String }, //프로젝트 간단 설명
  },

};
</script>

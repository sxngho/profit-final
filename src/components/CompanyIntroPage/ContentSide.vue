<template>
  <v-layout column>
    <v-layout row>
      <v-flex style="background:white;" class="companyName">
        <v-card-text>
          <span>회사정보</span>
          <v-flex>
            <!--회사 이미지-->
          </v-flex>
          <v-spacer></v-spacer>
          {{company.name}}
          <v-btn text small href="http://www.multicampus.com/">바로가기</v-btn>
        </v-card-text>
        <v-card-text>
          <span>사원수</span>
          {{company.employee}}
          <span>명</span>
        </v-card-text>

        <v-card-text>
          <span>매출</span>
          {{company.sales}}
        </v-card-text>

        <v-card-text>
          <span>복지</span>
          <v-flex>
            <v-btn v-for="item in company.welfare" text outlined>{{item.title}}</v-btn>
          </v-flex>
        </v-card-text>

        <v-flex>
          <span>위치</span>
          <KakaoMap />
          <span>{{company.map}}</span>
        </v-flex>
        <!-- <v-card-text>
          <v-flex>
            <v-btn block v-for="job in jobs" text outlined>{{ job.title }}</v-btn>
          </v-flex>
        </v-card-text>-->
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import KakaoMap from "../API/KakaoMap";
export default {
  name: "ContentSide",
  components: {
    KakaoMap
  },
  data() {
    return {
      company: {
        name: "멀티캠퍼스",
        employee: 500,
        sales: "5000억",
        map: "서울특별시 강남구 언주로 508 서울상록빌딩",
        welfare: [
          { title: "간식 제공" },
          { title: "장기근속 휴가" },
          { title: "재택근무" }
        ]
      }
    };
  }
};
</script>

<style>
</style>
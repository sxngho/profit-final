<template>
  <v-layout column>
    <v-layout row xs12>
      <v-layout style="background:white;">
        <v-card-text>
          <p class="text-md-center">기술스택</p>
          <v-flex>
            <v-btn v-for="skill in skills" flat small round outline>{{ skill.name }}</v-btn>
          </v-flex>
        </v-card-text>
      </v-layout>
    </v-layout>

    <v-layout style="background:white;">
      <v-card-text>
        <p class="text-md-center">회사소개</p>
        <span>{{company.content}}</span>
      </v-card-text>
    </v-layout>

    <v-layout style="background:white;">
      <v-card-text>
        <p class="text-md-center">채용중인 포지션</p>
      </v-card-text>
    </v-layout>
    <v-layout style="background:white;">
      <v-card-text>
        <v-flex>
          <v-btn block v-for="job in jobs" flat outline>{{ job.title }}</v-btn>
        </v-flex>
      </v-card-text>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { name: "react" },
        { name: "vue" },
        { name: "블록체인" },
        { name: "spring" },
        { name: "javaScript" },
        { name: "AWS" },
        { name: "django" },
        { name: "JAVA" }
      ],
      company: {
        content:
          "우리는 세계 최고의 소프트웨어 교육 업체 입니다. 우리는 세계 최고의 소프트웨어 교육 업체 입니다. 우리는 세계 최고의 소프트웨어 교육 업체 입니다. 우리는 세계 최고의 소프트웨어 교육 업체 입니다.우리는 세계 최고의 소프트웨어 교육 업체 입니다.우리는 세계 최고의 소프트웨어 교육 업체 입니다."
      },
      jobs: [
        { title: "fonte-end 주니어 개발자 (신입~3년)" },
        { title: "back-end 시니어 개발자(5년~8년)" },
        { title: "UI/UX 디자이너 (신입)" },
        { title: "UI/UX 디자이너 (신입)" },
        { title: "UI/UX 디자이너 (신입)" },
        { title: "UI/UX 디자이너 (신입)" },
        { title: "UI/UX 디자이너 (신입)" }
      ]
    };
  }
};
</script>

<style>
</style>
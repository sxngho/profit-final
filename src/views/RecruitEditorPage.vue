<template>
  <div class="recruit__container">
    <RecruitBanner />
    <RecruitEditor />
  </div>
</template>

<script>
import RecruitBanner from "../components/Recruit/InputForm/RecruitBanner";
import RecruitEditor from "../components/Recruit/InputForm/RecruitEditor";
export default {
  components: {
    RecruitBanner,
    RecruitEditor
  }
};
</script>

<style>
</style>

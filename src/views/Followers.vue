<template>
  <div class="followers__container">
    <TopBar />
    <UserInfo />
    <FollowerList />
  </div>
</template>

<script>
import TopBar from "../components/Followers/TopBar";
import FollowerList from "../components/Followers/FollowerList";
import UserInfo from "../components/Followers/UserInfo";
export default {
  components: {
    TopBar,
    FollowerList,
    UserInfo
  }
};
</script>

<style>
.followers__container {
  margin-top: 49px;
}
</style>

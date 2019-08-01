<template>
  <v-app>
    <v-content style="margin-top:60px">
      <v-layout xs12 rows wrap>
        <v-flex>
          읽지 않은 알람 : {{unread_alertlist.length}} 개<br><br>
          <div>
            <!-- {{alertlist}} -->
            <v-list>
              <v-list-item v-for="(alert, index) in alertlist.slice().reverse()">
                <v-list-item-content>
                  index : {{index}}, 확인여부 : {{alert.check}}
                  <v-btn>
                    <v-list-item-title :style="{color:colorcheck(alert.check)}" v-html="alert.message" @click="move(alert.check, alert.url, index)"></v-list-item-title>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Alert",
  data: () => ({
    user : '',
    userdata:'',
    alertlist : [],
    unread_alertlist : []
  }),
  mounted() {
    this.user = this.$session.get("session_id");
    this.get_userdata(this.$session.get("session_id"))
  },
  methods : {
    async get_userdata(id) {
      var userdata = await FirebaseService.SELECT_Userdata(id)
      this.userdata = userdata[0]
      var alerts = userdata[0].alertlist
      this.alertlist = alerts
      this.unread_alertlist = []
      for (var i in alerts) {
        if (alerts[i].check === false) {
        this.unread_alertlist.push(alerts[i])
        }
      }
      var unread_alert = document.querySelector("#unread_alret")
      unread_alert.innerText = this.unread_alertlist.length
      // console.log(unread_alert)
    },
    async move(check, url, alertindex) {
      window.open(document.location.origin + url)
      var result = await FirebaseService.alertcheck(this.alertlist, alertindex, this.$session.get("session_id"))
      if (!check) {
        this.get_userdata(this.$session.get("session_id"))
      }
    },
    colorcheck(check) {
      if (check) {
        return
      } else {
        return 'red'
      }
    }
  }
};
</script>

<style scoped>
</style>

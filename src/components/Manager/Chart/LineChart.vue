<script>
  import FirebaseService from "@/services/FirebaseService";
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        thisistest:"thisisttest",
        loglist:[],
        datacollection: {
          labels: [1,2,3,4],
          datasets: [
            {
              label: '시간별 방문자 추이',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: [1,4,2,3]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      // this.datafetch();
      console.log("data collection! ",this.datacollection);
      // this.renderChart(this.datacollection, this.options);
    },
    methods:{
      // async datafetch(){
      //   this.loglist = await FirebaseService.SELECT_ALLWebLog();
      //   var today = new Date();
      //   var standardHour = today.getHours();
      //   //initial
      //   this.datacollection.datasets[0].data = [];
      //   this.datacollection.labels = [];
      //   for(var i=0; i<=25; i++){
      //     this.datacollection.datasets[0].data.push(0);
      //     this.datacollection.labels.push((standardHour+i)%25);
      //   }
      //
      //   // 일단은 오늘을 기준으로만 하자
      //   this.datacollection.datasets[0].label = "시간별 방문자 추이";
      //   for(var i=0; i<this.loglist.length; i++){
      //     var item = this.loglist[i];
      //     if(item.date){
      //       var dd = new Date(item.date.seconds*1000);
      //       var gap = today.getTime() - dd.getTime();
      //       var hourGap = gap /1000 /60 /60; // 본 값이 0~25 사이일때 == 하루 내의 차이
      //       hourGap = parseInt(hourGap);
      //       if(hourGap <= 25 ){
      //         this.datacollection.datasets[0].data[25-hourGap] = this.datacollection.datasets[0].data[25-hourGap]+1;
      //       }
      //     }
      //   }
      //   this.renderChart(this.datacollection, this.options);
      // }
  }
}
</script>

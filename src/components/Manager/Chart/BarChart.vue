<script>
  import FirebaseService from "@/services/FirebaseService";
  import { Bar } from 'vue-chartjs'
  export default {
    extends: Bar,
    data () {
      return {
        sitemap : [
          'main',
          'story',
          'companyIntro',
          'git',
          'followers',
          'project',
          'manager',
          'chat',
        ],
        datacollection: {
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: []
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
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
    },
    methods:{
      // async datafetch(){
      //   this.loglist = await FirebaseService.SELECT_ALLWebLog();
      //   var today = new Date();
      //   var standardDate = today.getDate();
      //   //initial
      //   this.datacollection.datasets[0].data = [];
      //   this.datacollection.labels = [];
      //   for(var i =0; i<this.sitemap.length; i++){
      //     this.datacollection.datasets[0].data.push(0);
      //     this.datacollection.labels.push(this.sitemap[i]);
      //   }
      //
      //   // 일주일 기준으로 하자....
      //   this.datacollection.datasets[0].label = "게시판별 누적 방문자수";
      //   for(var i=0; i<this.loglist.length; i++){
      //     var item = this.loglist[i];
      //     if(item.date){ //이 값을 못받아올때
      //       var dd = new Date(item.date.seconds*1000);
      //       var gap = today.getTime() - dd.getTime();
      //       var dateGap = gap /1000 /60 /60 /24; // 본 값이 0~7 사이일때 == 일주일 차이
      //       dateGap = parseInt(dateGap);
      //       if(dateGap <= 7 ){
      //         console.log("hu", item.url);
      //         var find=false;
      //         for(var j=0; j<this.sitemap.length; j++){
      //           if(item.url.toUpperCase().includes(this.sitemap[j].toUpperCase())){
      //             this.datacollection.datasets[0].data[j] = this.datacollection.datasets[0].data[j]+1;
      //             find = true;
      //             break;
      //           }
      //         }
      //         if(!find){
      //           this.datacollection.datasets[0].data[0] = this.datacollection.datasets[0].data[0]+1;
      //         }
      //         //this.datacollection.datasets[0].data[this.sitemap.length-dateGap] = this.datacollection.datasets[0].data[7-dateGap]+1;
      //       }
      //     }
      //   }
      //   this.renderChart(this.datacollection, this.options);
      // }
  }
  }
</script>

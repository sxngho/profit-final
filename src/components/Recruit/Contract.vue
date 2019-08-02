<template>
  <v-container>
    <v-layout wrap row data-html2canvas-ignore="true">
      <v-flex xs12>
        <v-layout row wrap>
          <v-spacer/>
          <div>
    	      <v-btn @click="makePDF()" outlined color="indigo">Download</v-btn>
    		    <!-- <div>출력하지 않고 싶은 영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.</div> -->
      	 </div>
       </v-layout>
     </v-flex>
     <v-flex>
       <div style="margin:10px"/>
       <v-divider/>
     </v-flex>
    </v-layout>

    <v-layout wrap row style="margin:20px">
      <v-flex row wrap justify-center>
        <v-card outlined width="80%" style="padding:1px 0 40px 0;">

          <v-card-title>
            <p class="text-center"style="width:100%;padding:18px 0;">
              <span class="font-weight-bold display-1">기간제 근로 계약서</span> <br/>
              {{recruit.projectTitle}}
            </p>
          </v-card-title>

          <v-layout row style="padding:0 10%;">
            <p>
              회사 {{recruit.companyId}} (이하 "갑") 은 {{recruit.projectTitle}} (이하 "프로젝트")에 대한 작업을 {{recruit.userId}} (이하 "을")에게 전담한다.<br/>
            </p>
          </v-layout>

          <v-layout row wrap style="padding:0 10%;">
            <h3>협의내용</h3>
          </v-layout>

          <v-layout row wrap justify-center>
            <v-simple-table dense style="width:80%">
              <tbody>
                <tr>
                  <th class="text-center" rowspan="7">프로젝트</th>
                </tr>
                <tr>
                  <th class="text-center">제목</th>
                  <td class="text-center">{{recruit.projectTitle}}</td>
                </tr>
                <tr>
                  <th class="text-center">기간</th>
                  <td class="text-center">{{recruit.projectTerm}}</td>
                </tr>
                <tr>
                  <th class="text-center">급여</th>
                  <td class="text-center">{{recruit.pay}}</td>
                </tr>
                <tr>
                  <th class="text-center">계약금</th>
                  <td class="text-center">{{recruit.downPayment}}</td>
                </tr>
                <tr>
                  <th class="text-center">잔금</th>
                  <td class="text-center">{{recruit.balance}} </td>
                </tr>
                <tr>
                  <th class="text-center">위약금</th>
                  <td class="text-center">{{recruit.penalty}}</td>
                </tr>
                <tr>
                  <th class="text-center">계약일</th>
                  <td class="text-center" colspan="2">{{recruit.contractDate}}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-layout>

          <v-layout row style="margin:20px"/>

          <v-layout row style="padding:0 10%;">
            <h4>기밀유지</h4>
            <p>
              1)“갑”과 “을”은 본 계약과 관련하여 취득한 정보 및 기밀사항을 상대방의 승인 없이 제 3자에게 공표하거나 누설하여서는 안 된다.
            </p>
            <br/>

            <h4>저작권 및 소유권</h4>
            <p>
            1)	별도의 약정이 없는 경우 본 계약에 의하여 제작된 모든 디자인 관력 저작권 및 소유권은 “갑”이 보유한다.
            <br/>
            2)	“갑” 또는 “을”은 서로 상대방의 동의가 있는 경우를 제외하고는 어떠한 이유로도 이 계약상의 자신의 권리나 의무를 다른 데 3자에게 이전, 양도하거나 처분할 수 없다.
            </p>
            <br/>

            <h4>협의 및 면책사항</h4>
            <p>
            1)	본 계약에 명시되지 아니한 사항은 상호 호혜의 원칙에 입각하여 해결하고 필요한 때에는 협의서를 작성하며 이는 본 계약서와 동일한 효력을 지닌다.
            <br/>
            2)	본 계약에 의한 불행이나 이행지체가 천재지변, 폭동, 소요사태, 정부(지방자치단체 포함)의 구제 등 불가항력적인 사유로 발생한 경우에는 양 당사자 모두 그에 대해 책임을 지지 아니한다.
            </p>
            <br/>

            <h5>본 계약의 분쟁이 발생할 경우는 “갑”의 주소지 법원을 관할 법원으로 한다.</h5>
          </v-layout>

          <v-layout row style="margin:20px"/>

          <v-layout row wrap justify-center>
            <v-simple-table dense style="width:70%">
              <tbody>
                <tr>
                    <th class="text-center" rowspan="4">갑</th>
                    <tr>
                      <th class="text-center">회사이름</th>
                      <td class="text-center">{{recruit.companyId}}</td>
                    </tr>
                    <tr>
                      <th class="text-center">책임자</th>
                      <td class="text-center">{{recruit.company}}</td>
                    </tr>
                    <tr>
                      <th class="text-center">주소</th>
                      <td class="text-center">{{recruit.companyAddr}}</td>
                    </tr>
                </tr>
                <tr>
                  <th class="text-center" rowspan="4">을</th>
                  <tr>
                    <th class="text-center">이름</th>
                    <td class="text-center">{{recruit.userId}}</td>
                  </tr>
                  <tr>
                    <th class="text-center">주민번호</th>
                    <td class="text-center">{{recruit.rrn}}</td>
                  </tr>
                  <tr>
                    <th class="text-center">주소</th>
                    <td class="text-center">{{recruit.addr}}</td>
                  </tr>
                </tr>
              </tbody>
            </v-simple-table>
            <div style="width:10%; padding-left:50px;">
              <br/><br/>(인)<br/><br/><br/>(인)
            </div>
          </v-layout>


        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default {
  name: "Constract",
  data() {
    return {
      propTitle: 'mypdf',
      recruit : '',
    };
  },
  components: {
  },
  methods: {
    fetchData() {
      firebase.database().ref('/chat/'+this.$route.params.ccode).once('value').then( snapshot => {
        this.recruit = snapshot.val();
        console.log(this.recruit);
        this.propTitle = this.recruit.projectTitle;
      });
    },
    makePDF (selector = 'body') {
      window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
      let that = this
      let pdf = new jsPDF('p', 'mm', 'a4')
      let canvas = pdf.canvas
      const pageWidth = 210 //캔버스 너비 mm
      const pageHeight = 295 //캔버스 높이 mm
      canvas.width = pageWidth
      let ele = document.querySelector(selector)
      let width = ele.offsetWidth // 셀렉트한 요소의 px 너비
      let height = ele.offsetHeight // 셀렉트한 요소의 px 높이
      let imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환
      if(!ele){
        console.warn(selector + ' is not exist.')
        return false
      }
      html2canvas(ele, {
        onrendered: function(canvas) {
          let position = 0
          const imgData = canvas.toDataURL('image/png')
          pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')
          //Paging 처리
          let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
          heightLeft -= pageHeight
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage();
            pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
            heightLeft -= pageHeight
          }
          pdf.save(that.propTitle.toLowerCase() +'.pdf')
        },
      });
    },
  },
  created() {
    this.$store.state.no_header = true;
  },
  mounted() {
    this.fetchData();
  },
};

</script>

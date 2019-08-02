<template>
  <v-container>
    <v-layout wrap row>
      <div>
  		    <v-btn @click="makePDF()">PDF</v-btn>
  		    <div data-html2canvas-ignore="true">출력하지 않고 싶은 영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.</div>
  	 </div>
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
  components: {
  },
  methods: {
    fetchData() {
      firebase.database().ref('/chat/'+this.$route.params.ccode).once('value').then( snapshot => {
        this.recruit = snapshot.val();
        console.log(recruit);
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
  data() {
    return {
      propTitle: 'mypdf',
      recruit : "",
    };
  },
  created() {
    this.$store.state.no_header = true;
  },
  mounted() {
    this.fetchData();
  },
};

</script>

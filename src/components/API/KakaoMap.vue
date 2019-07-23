<template>
  <div id="dmap">
    <div id="map" style="width:100%; height:300px;"></div>
  </div>
</template>

<script>
export default {
  ame: "dmap",
  data() {
    return {};
  },
  mounted() {
    let container = document.getElementById("map");
    let mapOptions = {
      center: new daum.maps.LatLng(37.501481, 127.039595),
      level: 4 //지도의 레벨(확대, 축소 정도)
    };
    let map = new daum.maps.Map(container, mapOptions);
    //마커 생성 시작
    let markerPosition = new kakao.maps.LatLng(37.501481, 127.039595);
    let marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
    //마커 생성 종료

    //컨트롤 생성
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    //컨트롤 생성 종료
  }
};
</script>

<style>
</style>

<template>
  <!-- css vue에 넣기위해 -->
</template>

<!-- css -->
<style>
  *{
    font-family: 'binggrae';
    /* font-family: 'Jua'!important;
    font-family: 'Poor Story'!important;
    font-family: 'Nanum Myeongjo'!important;
    font-family: 'Sunflower'!important;
    font-family: 'Do Hyeon'!important;
    font-family: 'Black Han Sans'!important;
    font-family: 'Yeon Sung'!important; */
  }
  .inputmodal{
    background:white;
    border-top:8px solid #3498DB;
    border-bottom:8px solid #3498DB;
  }
  .signmodal{
    background:white;
    border-top:8px solid #2980B9 ;
    border-bottom:8px solid #2980B9 ;
  }
  .v-text-field__slot{
    font-family: sans!important;
  }

  .bannerBtn{
    width: 200px;
    height: 200px;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-decoration:none;
    color:white!important;
  }

  .bannerBtnBlack{
    width: 200px;
    height: 200px;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-decoration:none;
    color:black!important;
  }

  .headerBtn{
    text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
    font-weight: bold!important;
  }

  #vue2Editor .ql-editor {
    min-height:400px
  }

  .txtline{
    width:100%;
    padding:0 5px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .txtBox{
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top:1px;
    max-height:80px;
    overflow:hidden;
    vertical-align:top;
    text-overflow: ellipsis;
    word-break:break-all;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
  }

  .txtBox2{
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top:1px;
    max-height:80px;
    overflow:hidden;
    vertical-align:top;
    text-overflow: ellipsis;
    word-break:break-all;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:4;
  }

  .txtBox3{
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top:1px;
    max-height:130px;
    overflow:hidden;
    vertical-align:top;
    text-overflow: ellipsis;
    word-break:break-all;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:8;
  }

fieldset  .v-slide-group__content{
  justify-content: center;
}

</style>

<!-- Custom Font -->
<style>
  @font-face{
    font-family: 'binggrae';
    src:url('../../assets/font/Binggrae/binggrae-webfont.woff')  format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face{
    font-family: 'hanna';
    src:url('../../assets/font/bmhanna_11yrs.woff')  format('woff');
    src:url('../../assets/font/bmhanna_11yrs.ttf' ) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face{
    font-family: 'hannaair';
    src:url('../../assets/font/bmhannaair.woff')  format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face{
    font-family: 'jua';
    src:url('../../assets/font/bmjua.woff')  format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face{
    font-family: 'yanolja';
    src:url('../../assets/font/yanolja.woff')  format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face{
    font-family: 'bmyeonsung';
    src:url('../../assets/font/bmyeonsung.woff')  format('woff');
    font-weight: normal;
    font-style: normal;
  }
</style>

<style>
/* CustomFont */
.fontHanna{
  font-family: 'hanna'!important;
}
.fontHannaAir{
  font-family: 'hannaair'!important;
}
.fontjua{
  font-family: 'jua'!important;
}
.fontYanolja{
  font-family: 'yanolja'!important;
}
.fontBmYeonsung{
  font-family: 'bmyeonsung'!important;
}

/* GoogleFont */
.fontJua{
  font-family: 'Jua'!important;
}
.fontPS{
  font-family: 'Poor Story'!important;
}
.fontNanum{
  font-family: 'Nanum Myeongjo'!important;
}
.fontSunflower{
  font-family: 'Sunflower'!important;
}
.fontDoHyeon{
  font-family: 'Do Hyeon'!important;
}
.fontBlackHanSans{
  font-family: 'Black Han Sans'!important;
}
.fontYeonSung{
  font-family: 'Yeon Sung'!important;
}
</style>

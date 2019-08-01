<template>
  <div>
    <!-- 회사배너 -->
    <v-layout wrap id="companyBanner">
      <v-flex xs12 sm10 offset-sm1>
        <v-layout style="margin:5vw 0px;">
          <div>
            <v-avatar size=128>
              <v-img :src="company.company_logo"/>
            </v-avatar>
          </div>
          <div style="margin-left:2vw;">
            <v-layout align-end fill-height class="white--text">
              <div style="background-color:rgba(0, 0, 0, 0.5);">
                <h2>{{company.company_name}}</h2>
                <h3>{{company.industry}}</h3>
              </div>
            </v-layout>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-container>
      <!-- 회사 정보 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>기업정보</v-card-title>
            <v-card-text id="company_detail">
              <v-simple-table>
                <tbody class="text-center">
                  <tr>
                    <th>산업</th>
                    <td>{{company.industry}}</td>
                  </tr>
                  <tr>
                    <th>사원수</th>
                    <td>{{company.mount}}</td>
                  </tr>
                  <tr>
                    <th>기업구분</th>
                    <td>{{company.comsize}}</td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td>{{company.homepage}}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>{{company.address}}</td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td>{{company.establishedDate}}</td>
                  </tr>
                  <tr>
                    <th>대표자</th>
                    <td>{{company.represent}}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <td></td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px"/>

      <!-- 회사소개 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>회사소개</v-card-title>
            <v-card-text>
              {{company.descript}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px"/>

      <!-- 회사공고 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>
              공고
              <v-btn text outlined small rounded  color="success" style="margin-left:1em;">
                <i class="fa fa-pencil"/>공고 추가
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-expansion-panels>
                  <v-expansion-panel
                  v-for="recruit in recruitlist">
                    <v-expansion-panel-header>
                      {{recruit.projectTitle}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container>
                        <v-layout row wrap>
                          <!-- 공고 상세 내용 -->
                          <v-flex xs12 sm7 style="padding:1em; border-right:1px solid black;">
                            <!-- 제목과 기술스택 -->
                            <v-layout row wrap>
                              <div>
                                <v-chip label outlined color="deep-purple">{{recruit.category}}</v-chip>
                              </div>
                              <v-spacer/>
                              <div>
                                <v-chip v-for="skill in recruit.requiredSkills" small color="#7c5eb2c7">
                                  {{skill}}
                                </v-chip>
                              </div>
                            </v-layout>

                            <!-- 요약 -->
                            <p style="margin:20px 0px; border-bottom:1px solid black">{{recruit.projectSummary}}</p>

                            <!-- 나머지 디테일 -->
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <th>제목</th>
                                  <td>{{recruit.projectTitle}}</td>
                                </tr>
                                <tr>
                                  <th>예산</th>
                                  <td>{{recruit.budget}}</td>
                                </tr>
                                <tr>
                                  <th>업로드일</th>
                                  <td>{{recruit.createDay}}</td>
                                </tr>
                                <tr>
                                  <th>모집종료</th>
                                  <td>{{recruit.closingDate}}</td>
                                </tr>
                                <tr>
                                  <th>프로젝트 마감일</th>
                                  <td>{{recruit.endDay}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-flex>

                          <!-- 채팅방 목록들 ==> 즉, 찜한 유저 리스트-->
                          <!-- 아직 계약이 되지 않았을때 -->
                          <v-flex xs12 sm5 v-if="recruit.activeuser_testdata == ''">
                            <h3>찜한 유저들</h3>
                            <v-layout row wrap>
                              <v-flex xs11 offset-xs1 v-for="user in recruit.jjim_testdata">
                                <v-btn text outlined>
                                  {{user}}
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <!-- 계약이 된 상태라면 -->
                          <v-flex xs12 sm5 v-else>
                            <h3>작업중인 유저</h3>
                            <v-layout row wrap>
                              <v-flex xs11 offset-xs1>
                                {{recruit.activeuser_testdata}}
                              </v-flex>
                            </v-layout>
                          </v-flex>

                        </v-layout>
                        <v-layout justify-center>
                          <div  v-if="recruit.activeuser_testdata == ''">
                            <v-btn flex outlined color="red">삭제</v-btn>
                          </div>
                          <div v-else>
                            <v-btn flex outlined color="blue">완료</v-btn>
                            <v-btn flex outlined color="orange">계약서</v-btn>
                            <v-btn flex outlined color="red">프로젝트 종료(실패)</v-btn>
                          </div>
                        </v-layout>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>


    </v-container>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import Main from "../components/Manager/Main";

export default {
  name: "Company",
  components: {
  },
  methods: {

  },
  data() {
    return {
      company :{
        company_name :"회사이름",
        company_logo : "https://i.imgur.com/AY1nwiA.png",
        industry :"회사의 산업 분류",
        mount:"100명",
        comsize:"대기업",
        establishedDate:"2019-07-31",
        represent:"홍길동",
        homepage:"www.naver.com",
        address:"어디시 어디구 어디동 123-456",

        descript:"어쩌고저쩌고 회사설명 긴글이필요하다법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령은 법률안의 일부에 대하여 또는 법률안을 수정하여 재의를 요구할 수 없다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 대한민국의 영토는 한반도와 그 부속도서로 한다.대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다",
      },
      recruitlist:[
        {
        companyId:"공고를올린회사이름",
        requiredSkills:['C','Java','C++'],
        projectTitle:"기업공고제목",
        budget:"10000000000000",
        category:"웹모바일",
        closingDate:"50일후",
        createDay:"2019-07-30",
        endDay:"2019-09-26",
        projectContent:"<h1>사람구합니다!!!</h1>살려주세요!!!!",
        projectSummary:"포트폴리오 웹 사이트 제작 6개월 프로젝트",
        jjim_testdata:['찜한유저1','찜유저2','핖피'],
        activeuser_testdata:"",
        },
        {
        companyId:"공고를올린회사이름",
        requiredSkills:['C','Java','C++'],
        projectTitle:"기업공고제목",
        budget:"10000000000000",
        category:"웹모바일",
        closingDate:"50일후",
        createDay:"2019-07-30",
        endDay:"2019-09-26",
        projectContent:"<h1>사람구합니다!!!</h1>살려주세요!!!!",
        projectSummary:"포트폴리오 웹 사이트 제작 6개월 프로젝트",
        jjim_testdata:['유저1','유저2','유저3'],
        activeuser_testdata:"핖피",
        },
        {
        companyId:"공고를올린회사이름",
        requiredSkills:['C','Java','C++'],
        projectTitle:"기업공고제목",
        budget:"10000000000000",
        category:"웹모바일",
        closingDate:"50일후",
        createDay:"2019-07-30",
        endDay:"2019-09-26",
        projectContent:"<h1>사람구합니다!!!</h1>살려주세요!!!!",
        projectSummary:"포트폴리오 웹 사이트 제작 6개월 프로젝트",
        jjim_testdata:['유저1','유저2','유저3'],
        activeuser_testdata:"",
        },
      ],
    };
  },
};

</script>

<style>
#companyBanner {
  background-image:  url( "../assets/coding.jpg" );
  background-size: 100%;
}
#company_detail{
  padding: 1em;
 -moz-column-count: 2;
 -moz-column-gap: 1em;
 -webkit-column-count: 2;
 -webkit-column-gap: 1em;
 column-count: 2;
 column-gap: 1em;
}
</style>

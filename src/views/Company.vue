<template>
  <div>
      <div v-if="loading">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    <!-- 회사배너 -->
    <v-layout wrap id="companyBanner" v-bind:style="{ 'backgroundImage': 'url(' + company.company_banner + ')' }" @mouseover="showUpImgBanner=true" @mouseleave="showUpImgBanner=false">

    <!-- <div v-show="showUpImgBanner && this.$route.params.id==this.$store.getters.getSession && !showUpImgBtn" style="z-index:3; right:0; position: absolute;">
    123123123123
    </div> -->

    <div v-show="showUpImgBanner && this.$route.params.id==this.$store.getters.getSession && !showUpImgBtn"
      style="position: absolute; margin:0; z-index:2;"
      @click="setBanner()">
      <p style="background: #ffffff91;border-radius:0 20px 20px 0; cursor:pointer; margin:0px; padding: 5px 45px 5px 20px;">
        배경화면 수정하기
      </p>
      <input type="file" id="Banner" style="width:100%; display:none" @change="onFileChangeBanner" />
    </div>


    <div @click="removeImageBanner()" v-show="showUpImgBanner && this.$route.params.id==this.$store.getters.getSession && !showUpImgBtn && company.company_banner" style="z-index:2; right:0; position: absolute;" >
      <p style="background: #ff000039; cursor:pointer; margin:0px; padding: 5px 20px 5px 45px; border-radius: 20px 0 0 20px;">배경화면 삭제</p>
    </div>


      <v-flex xs12 sm10 offset-sm1>
        <v-layout style="margin:5vw 0px;">
          <div>
            <!-- <v-avatar size="128">
              <v-img :src="company.company_logo" />
            </v-avatar>-->
            <div
              v-if="!company.company_logo || (company.company_logo=='https://i.imgur.com/WmUIKlP.png')"
              class="text-center"
              justify-center
              style="position:relative"
              @mouseover="showUpImgBtn=true"
              @mouseleave="showUpImgBtn=false"
            >
              <div
                @click="setFile()"
                v-show="showUpImgBtn"
                style="position: absolute; top: 54px; z-index: 2"
              >
                <p
                  class="text-center"
                  style="background: #ffffff91;padding: 10px 5px; cursor:pointer;"
                >사진을 등록하세요!</p>
              </div>
              <v-avatar
                size="150"
                class="grey lighten-2"
                @click="setFile()"
                style="cursor:pointer;"
              >
                <img src="https://i.imgur.com/WmUIKlP.png" />
              </v-avatar>
              <input
                type="file"
                name="file"
                id="file"
                style="width:100%; display:none"
                @change="onFileChange"
              />
            </div>

            <div
              v-else
              style="position:relative;"
              @mouseover="showRmImgBtn=true"
              @mouseleave="showRmImgBtn=false"
            >
              <div
                @click="removeImage()"
                v-show="showRmImgBtn"
                style="z-index:2; right:0; position: absolute;"
              >
              <img
                src="../assets/icon_set/delete.png"
                alt="delimg"
                style="cursor:pointer;width:25px;height:25px;"
              />
                <!-- <button alt="delimg" style="cursor:pointer;width:25px;height:25px; color:white">
                  <i class="far fa-trash-alt"></i>
                </button> -->
              </div>
              <v-avatar size="150" class="grey lighten-2">
                <img :src="company.company_logo" />
              </v-avatar>
            </div>
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
            <v-card-title>기업정보 <v-spacer/>
              <div v-if="this.$route.params.id==this.$store.getters.getSession">
              <v-btn v-if="!updatestate" @click="change_updatestate()">수정하기</v-btn>
              <v-btn v-if="updatestate" @click="submit(
                company.industry, company.mount, company.comsize, company.homepage
                , company.address, company.establishedDate,  company.represent, company.annualsales
                )">저장</v-btn>
              <v-btn v-if="updatestate" @click="cancel_updatestate()">취소</v-btn>
              </div>
            </v-card-title>
            <v-card-text id="company_detail">
              <v-simple-table>
                <tbody class="text-center">
                  <tr>
                    <th>산업</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.industry}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.industry}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.industry"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>사원수 ( 명 )</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.mount}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.mount}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.mount"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>기업구분</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.comsize}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.comsize}}</td>
                    <td v-if="updatestate && this.$route.params.id==this.$store.getters.getSession">
                      <form>
                        <select v-model="company.comsize" style="border:1px solid; border-radius: 30px; width:185.2px; text-align-last:center; outline:none;">
                          <option v-for="com in select_comsize" v-bind:value="com">
                            <span>{{com}}</span>
                          </option>
                        </select>
                      </form>

                    </td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.homepage}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.homepage}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.homepage"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.address}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.address}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.address"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.establishedDate}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.establishedDate}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.establishedDate"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>대표자</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.represent}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.represent}}</td>
                    <td>
                      <input
                        type="text"
                        v-model="company.represent"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                      <!-- <v-btn v-if="toggleRepresent && this.$route.params.id==this.$store.getters.getSession" style>취소</v-btn> -->
                    </td>
                  </tr>
                  <!-- <tr>
                    <th></th>
                    <td></td>
                  </tr> -->
                  <tr>
                    <th>연매출 ( 단위 : 만원 )</th>
                    <td v-if="this.$route.params.id!==this.$store.getters.getSession">{{company.annualsales}}</td>
                    <td v-if="!updatestate && this.$route.params.id==this.$store.getters.getSession">{{company.annualsales}}</td>
                    <td>

                      <input
                        type="text"
                        v-model="company.annualsales"
                        v-if="updatestate && this.$route.params.id==this.$store.getters.getSession"
                        style="text-align:center; border:1px solid; border-radius: 30px; outline:none;"
                      />
                    </td>
                  </tr>
                  <!-- <tr>
                    <th></th>
                    <td></td>
                  </tr> -->

                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px" />

      <!-- 회사소개 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>회사소개 <v-spacer/>

              <div v-if="this.$route.params.id==this.$store.getters.getSession">
              <v-btn v-if="!updatestate2" @click="change_updatestate2()">수정하기</v-btn>
              <v-btn v-if="updatestate2" @click="submit2()">저장</v-btn>
              <v-btn v-if="updatestate2" @click="cancel_updatestate2()">취소</v-btn>
              </div>
            </v-card-title>

            <v-card-text v-if="!company.descript" style="margin-left:12px;">
              <br>현재 등록된 회사소개가 없습니다.
            </v-card-text>

            <div v-if="this.$route.params.id==this.$store.getters.getSession" style="margin-left:12px;">
            <v-card-text v-if="this.$route.params.id!==this.$store.getters.getSession"><p v-html="company.descript"></p></v-card-text>
            <v-card-text v-if="!updatestate2 && this.$route.params.id==this.$store.getters.getSession"><p v-html="company.descript"></p></v-card-text>
            <v-card-text v-if="updatestate2 && this.$route.params.id==this.$store.getters.getSession">
              <textarea
                id="company_descript"
                v-html="company.descript"
                style="width:100%; height:150px"
              />
            </v-card-text>
            </div>

          </v-card>
        </v-flex>
      </v-layout>
      <!-- 간격 -->
      <div style="margin:20px" />

      <!-- 회사공고 -->
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
          <v-card style="width:100%" outlined>
            <v-card-title>
              공고
              <router-link
                v-if="this.$route.params.id==this.$store.getters.getSession"
                to="/recruiteditorpage"
                style="text-decoration:none"
              >
                <v-btn text outlined small rounded color="success" style="margin-left:1em;">
                  <i class="fa fa-pencil" />공고 추가
                </v-btn>
              </router-link>
            </v-card-title>
            <v-card-text>
              <v-container>
                <div v-if="!recruitsbyCompany.length">
                  현재 등록된 공고가 없습니다.
                </div>
                <!-- {{recruitsbyCompany}} -->

                <v-expansion-panels>
                  <v-expansion-panel v-for="(item, index) in MyRecruits">
                    <v-expansion-panel-header style="display:flex">
                      <div>
                        <v-chip color="#4a77de" text-color="white" v-if="item.recruit.data.contract && item.recruit.data.UserComplete == 2 && item.recruit.data.CompanyComplete == 2">완료</v-chip>
                        <v-chip color="#692721" text-color="white" v-if="item.recruit.data.contract && (item.recruit.data.CompanyComplete ==1 || item.recruit.data.UserComplete ==1)" >파기</v-chip>
                        <v-chip color="#0e568a" text-color="white" v-if="item.recruit.data.contract && item.recruit.data.UserComplete !== 1 && item.recruit.data.CompanyComplete !== 1 && (item.recruit.data.UserComplete !== 2 || item.recruit.data.CompanyComplete !== 2)">진행</v-chip>
                        <v-chip color="rgb(118, 199, 122)" text-color="white" v-if="!item.recruit.data.contract">모집중</v-chip>
                        &nbsp;&nbsp;
                        <span>{{item.recruit.data.projectTitle}}</span>
                        <v-badge color="red" v-if="item.length !== 0">
                          <template slot="badge" style="margin-bottom:1px "> N </template>
                        </v-badge>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container>
                        <v-layout row wrap>
                          <!-- 1. 로그인한 사람이 회사가 아닐 때 : 공고 상세 내용 -->
                          <v-flex v-if="$route.params.id!==$store.getters.getSession" xs12 style="padding:1em;">
                            <!-- 제목과 기술스택 -->
                            <v-layout row wrap>
                              <div>
                                <v-chip label outlined color="deep-purple">{{item.recruit.data.category}}</v-chip>
                              </div>
                              <v-spacer />
                              <div>
                                <v-chip v-for="skill in item.recruit.data.requiredSkills" smallcolor="#7c5eb2c7">{{skill}}</v-chip>
                              </div>
                            </v-layout>

                            <!-- 요약 -->
                            <p style="margin:20px 0px; border-bottom:1px solid black">{{item.recruit.data.projectSummary}}</p>

                            <!-- 나머지 디테일 -->
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <th>제목</th>
                                  <td>{{item.recruit.data.projectTitle}}</td>
                                </tr>
                                <tr>
                                  <th>예산</th>
                                  <td>{{item.recruit.data.budget}}</td>
                                </tr>
                                <tr>
                                  <th>위약금</th>
                                  <td>{{item.recruit.data.penalty}}</td>
                                </tr>
                                <tr>
                                  <th>업로드일</th>
                                  <td>{{item.recruit.data.createDay}}</td>
                                </tr>
                                <tr>
                                  <th>프로젝트 마감일</th>
                                  <td>{{item.recruit.data.endDay}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-flex>



                          <!-- 2. 로그인한 사람이 해당 회사일 때 : 공고 상세 내용 -->
                          <v-flex v-if="$route.params.id==$store.getters.getSession && item.recruit.data.UserComplete !== 1 && item.recruit.data.CompanyComplete !== 1" xs12 sm7 style="padding:1em; ">
                            <!-- 제목과 기술스택 -->
                            <v-layout row wrap>
                              <div>
                                <v-chip label outlined color="deep-purple">{{item.recruit.data.category}}</v-chip>
                              </div>
                              <v-spacer />
                              <div>
                                <v-chip
                                  v-for="skill in item.recruit.data.requiredSkills"
                                  small
                                  color="#7c5eb2c7"
                                >{{skill}}</v-chip>
                              </div>
                            </v-layout>

                            <!-- 요약 -->
                            <p
                              style="margin:20px 0px; border-bottom:1px solid black"
                            >{{item.recruit.data.projectSummary}}</p>

                            <!-- 나머지 디테일 -->
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <th>제목</th>
                                  <td>{{item.recruit.data.projectTitle}}</td>
                                </tr>
                                <tr>
                                  <th>예산</th>
                                  <td>{{item.recruit.data.budget}}</td>
                                </tr>
                                <tr>
                                  <th>위약금</th>
                                  <td>{{item.recruit.data.penalty}}</td>
                                </tr>
                                <tr>
                                  <th>업로드일</th>
                                  <td>{{item.recruit.data.createDay}}</td>
                                </tr>
                                <tr>
                                  <th>프로젝트 마감일</th>
                                  <td>{{item.recruit.data.endDay}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-flex>

                          <!-- 2. 로그인한 사람이 해당 회사일 때 : 파기상태일때 .. right side가 없음 sm7 옵션 제거 -->
                          <v-flex v-if="$route.params.id==$store.getters.getSession && (item.recruit.data.CompanyComplete ==1 || item.recruit.data.UserComplete ==1)" xs12 style="padding:1em;">
                            <!-- 제목과 기술스택 -->
                            <v-layout row wrap>
                              <div>
                                <v-chip label outlined color="deep-purple">{{item.recruit.data.category}}</v-chip>
                              </div>
                              <v-spacer />
                              <div>
                                <v-chip
                                  v-for="skill in item.recruit.data.requiredSkills"
                                  small
                                  color="#7c5eb2c7"
                                >{{skill}}</v-chip>
                              </div>
                            </v-layout>

                            <!-- 요약 -->
                            <p
                              style="margin:20px 0px; border-bottom:1px solid black"
                            >{{item.recruit.data.projectSummary}}</p>

                            <!-- 나머지 디테일 -->
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <th>제목</th>
                                  <td>{{item.recruit.data.projectTitle}}</td>
                                </tr>
                                <tr>
                                  <th>예산</th>
                                  <td>{{item.recruit.data.budget}}</td>
                                </tr>
                                <tr>
                                  <th>위약금</th>
                                  <td>{{item.recruit.data.penalty}}</td>
                                </tr>
                                <tr>
                                  <th>업로드일</th>
                                  <td>{{item.recruit.data.createDay}}</td>
                                </tr>
                                <tr>
                                  <th>프로젝트 마감일</th>
                                  <td>{{item.recruit.data.endDay}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-flex>



                          <!-- 채팅방 목록들 ==> 즉, 찜한 유저 리스트-->
                          <!-- 아직 계약이 되지 않았을때 -->
                          <v-flex xs12 sm5 v-if="$route.params.id==$store.getters.getSession && !item.recruit.data.contract">
                            <h2>지원한 유저 리스트</h2>
                            <v-layout row wrap>
                              <v-simple-table>
                                <tbody>
                                  <v-flex xs12 v-for="user in dibsUsers" v-if="user.recruit==item.recruit.id" style="overflow:hidden !important">
                                <!-- 여기서 user는 chatting 입니다 혼동하기 쉬울거같아서 남겨놓습니다.-->
                                  <tr>
                                    <v-layout row wrap>
                                    <v-flex xs4>
                                    <th style="text-align:center">
                                        <v-avatar size="80">
                                          <img :src="user.userData.data.userImage" />
                                        </v-avatar>
                                        {{ user.userData.id }}
                                    </th>
                                    </v-flex>
                                    <v-flex xs8 style="margin:auto">
                                    <td style="margin:auto padding:0px 0px !important; ">
                                      <router-link :to="{ name: 'story', params: { id: user.userData.id }}" style="text-decoration:none" >
                                        <v-btn text outlined style="text-decoration:none"> 스토리 </v-btn>
                                      </router-link>
                                      <v-badge color="red" overlap v-if="user.length !== 0" >
                                        <template slot="badge"> {{user.length}} </template>
                                        <v-btn text outlined @click="openChat(user.chat)">채팅방</v-btn>
                                      </v-badge>
                                      <v-btn text outlined @click="openChat(user.chat)" v-if="user.length == 0" style="margin-left:1px">채팅방</v-btn>
                                    </td>
                                    </v-flex>
                                    </v-layout>
                                    </tr>
                                  </v-flex>
                                  </tbody>
                                </v-simple-table>
                            </v-layout>
                          </v-flex>

                          <!-- 계약이 된 상태라면 -->
                          <v-flex xs12 sm5 v-if="$route.params.id==$store.getters.getSession && item.recruit.data.contract && (item.recruit.data.UserComplete == 0 || item.recruit.data.CompanyComplete == 0)">
                            <h3 style="text-align:center;"> 프로젝트 담당 유저</h3>
                            <br/>
                            <v-layout row wrap>
                                <v-flex xs12 v-for="user in userData" v-if="user.id==item.recruit.data.responsibility" style="overflow:hidden !important">
                                <!-- 여기서 user는 chatting 입니다 혼동하기 쉬울거같아서 남겨놓습니다.-->
                                    <v-layout row wrap>
                                    <v-flex xs10 offset-xs1 style="text-align:center">
                                        <v-avatar size="200">
                                          <img :src="user.data.userImage" />
                                        </v-avatar>
                                        </br>
                                        <h2 style="margin-top:5px">{{ user.id }}</h2>
                                    </v-flex>
                                    <v-spacer/>
                                    <br/><br/>
                                    <v-flex xs10 offset-xs1 style="margin:auto; text-align:center; margin-top:15px">
                                      <router-link :to="{ name: 'story', params: { id: user.id }}" style="text-decoration:none" >
                                        <v-btn text outlined style="margin-right:2px;"> 스토리 </v-btn>
                                      </router-link>
                                      <v-badge color="red" overlap v-if="item.length !== 0">
                                        <template slot="badge"> {{item.length}} </template>
                                        <v-btn text outlined @click="openWorkChat(item.recruit.data.responsibility,item.recruit.id)">채팅방</v-btn>
                                      </v-badge>
                                      <v-btn text outlined  v-if="item.length == 0" @click="openWorkChat(item.recruit.data.responsibility,item.recruit.id)">채팅방</v-btn>
                                    </v-flex>
                                    </v-layout>
                                  </v-flex>
                            </v-layout>
                          </v-flex>

                          <!-- 작업 완료 -->
                          <v-flex xs12 sm5 v-if="$route.params.id==$store.getters.getSession && item.recruit.data.contract && item.recruit.data.UserComplete == 2 && item.recruit.data.CompanyComplete == 2">
                            <h3> 성공적으로 계약을 마쳤습니다. 짝짞짞</h3>
                            <!-- <v-layout row wrap>
                              <v-flex xs11 offset-xs1>

                              </v-flex>
                            </v-layout> -->
                          </v-flex>


                        </v-layout>
                        <v-layout justify-center v-if="$route.params.id==$store.getters.getSession">
                          <div v-if="!item.recruit.data.contract">
                            <v-btn flex outlined color="red" @click="deleteRecruit(item.recruit.id,index)">삭제</v-btn>
                          </div>
                          <div v-else>
                            <div v-if="item.recruit.data.UserComplete == 0 && item.recruit.data.CompanyComplete == 0">
                              <v-btn flex outlined color="blue" @click="complete(item.recruit.id,item.recruit.data)">계약완료</v-btn>
                              <v-btn flex outlined color="orange" @click="openContract(item.recruit.id,item.recruit.data.responsibility)">계약서</v-btn>
                              <v-btn flex outlined color="red" @click="cancel(item.recruit.id,item.recruit.data)">계약파기</v-btn>
                            </div>
                            <div v-if="item.recruit.data.UserComplete == 0 && item.recruit.data.CompanyComplete == 2">
                              <p> 완료 처리됨 // 상대방의 처리를 기다리는중</p>
                              <v-btn flex outlined color="orange" @click="openContract(recruit.id,recruit.data.responsibility)">계약서</v-btn>
                            </div>
                            <div v-if="item.recruit.data.UserComplete == 2 && item.recruit.data.CompanyComplete == 0">
                              <p> 상대방이 완료를 누른 상태입니다. 계약이 정상적으로 종료되었다면 완료를 눌러주세요.</p>
                              <v-btn flex outlined color="blue" @click="complete(item.recruit.id,item.recruit.data)">계약완료</v-btn>
                              <v-btn flex outlined color="orange" @click="openContract(item.recruit.id,item.recruit.data.responsibility)">계약서</v-btn>
                              <v-btn flex outlined color="red" @click="cancel(item.recruit.id,item.recruit.data)">계약파기</v-btn>
                            </div>
                            <div v-if="item.recruit.data.UserComplete == 1">
                              <p> 유저 측의 사유로 파기된 계약입니다. </p>
                            </div>
                            <div v-if="item.recruit.data.CompanyComplete == 1">
                              <p> 기업 측의 사유로 파기된 계약입니다. </p>
                            </div>
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



<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script>
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
import Main from "../components/Manager/Main";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

export default {
  name: "Company",
  components: {
  },
  created() {

  },
  mounted() {
    this.loading = true;
    this.fetchData();
    this.nowLevel = this.$session.get("level");
    this.user = this.$session.get("session_id")
    this.$store.commit('setSession', this.user)
    this.loading = false;
  },
  methods: {
    complete(recruitId,recruitData) {
      this.$swal({
         title: '정말 계약을 완료하시겠습니까?',
         text: "한번 완료한 계약은 수정이 불가능합니다.",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '완료',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('프로젝트 완료!','성공적인 프로젝트이셨나요?','success')
           FirebaseService.UPDATE_RecruitCompleteByCompany(recruitId,"success")
           var dataRef = firebase.database().ref('/chat/'+recruitId+''+recruitData.responsibility);
           dataRef.update({
             CompanyComplete : 2,
           });
         }
       })
    },
    cancel(recruitId,recruitData) {
      this.$swal({
         title: '정말 계약을 파기하시겠습니까?',
         text: "한번 파기한 계약은 수정이 불가능합니다.",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '파기',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('프로젝트 실패','프로젝트 계약이 파기되었습니다.','error')
           FirebaseService.UPDATE_RecruitCompleteByCompany(recruitId,"fail")
           var dataRef = firebase.database().ref('/chat/'+recruitId+''+recruitData.responsibility);
           dataRef.update({
             CompanyComplete : 1,
           });
         }
       })
    },
    async fetchData() {
      this.$loading(true);
      this.dibsUsers = [];
      this.userData = await FirebaseService.SELECT_UserIdData();
      var recruitsbyCompany = await FirebaseService.SELECT_RecruitInfoById(this.$route.params.id);
      this.recruitsbyCompany = recruitsbyCompany;
      var chatRooms = "";
      var ChatRef = firebase.database().ref("/chat/");
      ChatRef.once("value",snapshot => {
        this.AllChat = snapshot.val();
        chatRooms = snapshot.val();
        for (var ii in recruitsbyCompany) {
          var flag = 0;
          for (var i in chatRooms) {
            if (chatRooms[i].recruitPK == recruitsbyCompany[ii].id && recruitsbyCompany[ii].data.contract && recruitsbyCompany[ii].data.responsibility == chatRooms[i].userId) {
              console.log("이미 계약된 공고는 단하나!",recruitsbyCompany[ii])
              var unreadChat = chatRooms[i].chatting;
              var unreadLength = 0;
              for(var j=unreadChat.length-1; j>=0; j--) {
                if(unreadChat[j].isReadCompany) {
                  break;
                } else {
                  unreadLength++;
                }
              }
              this.MyRecruits.push({ recruit : recruitsbyCompany[ii], length : unreadLength})
              flag = 1;
              break;
            }
          }
          var tmpLength = 0;
          for (var i in chatRooms) {
            if (!recruitsbyCompany[ii].data.contract && chatRooms[i].recruitPK == recruitsbyCompany[ii].id ) {
              var user = "";
              for( var u in this.userData) {
                if ( this.userData[u].id == chatRooms[i].userId ) {
                  user = this.userData[u]
                }
              }
              var unreadChat = chatRooms[i].chatting;
              var unreadLength = 0;
              for(var j=unreadChat.length-1; j>=0; j--) {
                if(unreadChat[j].isReadCompany) {
                  break;
                } else {
                  unreadLength++;
                  tmpLength++;
                }
              }
              this.dibsUsers.push({
                userData : user,
                recruit: recruitsbyCompany[ii].id,
                chat: chatRooms[i],
                length : unreadLength,
              });
            }
            if( flag !== 1 ) {
              flag = 2;
            }
          }
          if ( flag == 2 ) {
            this.MyRecruits.push({ recruit : recruitsbyCompany[ii], length : tmpLength })
          } else if ( flag == 0 ) {
            this.MyRecruits.push({ recruit : recruitsbyCompany[ii], length : 0 })
          }
        }

        },
        function(error) {
          // console.error(error, "유저리스트 불러오기 에러");
        }
      );

      const comInfo = await FirebaseService.SELECT_CompanyInfo(this.$route.params.id);
      this.comInfo = comInfo[0]
      this.company.id = comInfo[0].id;
      this.company.level = comInfo[0].level;
      this.company.company_banner = comInfo[0].company_banner;
      this.company.company_logo = comInfo[0].company_logo;
      this.company.company_name = comInfo[0].company_name;
      this.company.industry = comInfo[0].industry;
      this.company.mount = comInfo[0].mount;
      this.company.comsize = comInfo[0].comsize;
      this.company.establishedDate = comInfo[0].establishedDate;
      this.company.represent = comInfo[0].represent;
      this.company.homepage = comInfo[0].homepage;
      this.company.address = comInfo[0].address;
      this.company.annualsales = comInfo[0].annualsales;
      this.company.descript = comInfo[0].descript;

      this.$loading(false);
    },
    showNotification(group, type, title, text) {
      this.$notify({
        group,
        title,
        text,
        type
      });
    },
    openChat(user) {
      window.open(
        "../" + user.link,
        user.link,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    openWorkChat(user, id) {
      // user -> 이 프로젝트를 하기로한 유저아이디
      for (var i in this.AllChat) {
        if (this.AllChat[i].userId == user && this.AllChat[i].recruitPK == id) {
          this.workingUser = this.AllChat[i];
          break;
        }
      }
      var link = this.workingUser.link;
      window.open(
        "../" + link,
        link,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    openContract(id, responsibility) {
      window.open(
        "../contract/" + id + responsibility,
        id + '' +responsibility,
        "titlebar=no,status=no,toolbar=no,resizable=yes,top=20,left=500,width=1000,height=600"
      );
    },
    async submit(industry, mount, comsize, homepage, address, establishedDate, represent, annualsales) {

      var check_mount = await isNaN(mount)
      var check_annualsales = await isNaN(annualsales)

      if (!(check_mount || check_annualsales)) {
        // 둘 다 숫자로 잘 한 경우
        this.$swal({
           title: '정말 수정하시겠습니까?',
           text: "수정된 기업정보는 복구가 불가능합니다.",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: '수정',
           cancelButtonText: '취소',
          }).then((result) => {
           if (result.value) {
             this.$swal('Updated!','기업정보가 수정되었습니다.','success')
             this.updatestate = !this.updatestate
             const companyInfo = this.company;
             FirebaseService.UPDATE_Companys(companyInfo, companyInfo.company_name);
           }
         })
      } else {
        // 둘 중 하나는 숫자로 안한 경우
        if (!check_mount) {
          this.$swal.fire({
              type: 'error',
              title: 'Oops...',
              text: '연매출액은 숫자로 표기해주세요.'
            })
        } else {
          this.$swal.fire({
              type: 'error',
              title: 'Oops...',
              text: '사원수는 숫자로 표기해주세요.'
            })
        }
      }

    },
    async submit2() {
      this.updatestate2 = !this.updatestate2
      var str = document.querySelector('#company_descript').value;
      str = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      this.company.descript = str
      const companyInfo = this.company;
      FirebaseService.UPDATE_Companys(companyInfo, companyInfo.company_name)
    },
    setFile() {
      var file = document.querySelector("#file");
      file.click();
    },
    setBanner() {
      var Banner = document.querySelector("#Banner");
      Banner.click();
    },
    onFileChange(e) {
      // file 세팅
      if (e.target.files[0].type.substr(0, 5) == "image") {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        const apiUrl = "https://api.imgur.com/3/image";
        let data = new FormData();
        let content = {
          method: "POST",
          headers: {
            Authorization: "Client-ID f96b8964f338658",
            Accept: "application/json"
          },
          body: data,
          mimeType: "multipart/form-data"
        };
        data.append("image", files[0]);
        fetch(apiUrl, content)
          .then(response => response.json())
          .then(success => {
            FirebaseService.UPDATE_companyImage(success.data.link, this.$route.params.id)
            this.company.company_logo = success.data.link;
          })
          .catch();
        } else {
          this.$swal("이미지 오류!", "이미지 파일만 올려주세요.", "error");
        }
    },
    onFileChangeBanner(e) {
      // file 세팅
      if (e.target.files[0].type.substr(0, 5) == "image") {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        const apiUrl = "https://api.imgur.com/3/image";
        let data = new FormData();
        let content = {
          method: "POST",
          headers: {
            Authorization: "Client-ID f96b8964f338658",
            Accept: "application/json"
          },
          body: data,
          mimeType: "multipart/form-data"
        };
        data.append("image", files[0]);
        fetch(apiUrl, content)
          .then(response => response.json())
          .then(success => {
            FirebaseService.UPDATE_companyImageBanner(success.data.link, this.$route.params.id)
            this.company.company_banner = success.data.link;
          })
          .catch();
      } else {
        this.$swal("이미지 오류!", "이미지 파일만 올려주세요.", "error");
      }
    },
    removeImage() {
      this.$swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제한 이미지는 되돌릴 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소"
      }).then(result => {
        if (result.value) {
          this.$swal(
            "Deleted!",
            "프로필 이미지 삭제가 완료되었습니다.",
            "success"
          );
          FirebaseService.UPDATE_companyImage("https://i.imgur.com/WmUIKlP.png", this.$route.params.id);
          this.company.company_logo = "https://i.imgur.com/WmUIKlP.png";
        }
      });
    },
    removeImageBanner() {
      this.$swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제한 이미지는 되돌릴 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소"
      }).then(result => {
        if (result.value) {
          this.$swal(
            "Deleted!",
            "배경 이미지 삭제가 완료되었습니다.",
            "success"
          );
          FirebaseService.UPDATE_companyImageBanner("", this.$route.params.id);
          this.company.company_banner = "";
        }
      });
    },
    deleteRecruit(recruitId,index) {
      this.$swal({
         title: '정말 삭제하시겠습니까?',
         text: "삭제된 공고는 복구가 불가능합니다.",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '삭제',
         cancelButtonText: '취소',
        }).then((result) => {
         if (result.value) {
           this.$swal('Deleted!','공고가 삭제되었습니다.','success')
           FirebaseService.DELETE_RecruitById(recruitId);
           this.MyRecruits.splice(index,1);
         }
       })
    },
    change_updatestate() {
      this.updatestate = !this.updatestate
    },
    change_updatestate2() {
      this.updatestate2 = !this.updatestate2
      var str = this.company.descript
      str = str.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
      this.company.descript = str
    },
    cancel_updatestate() {

      this.updatestate = !this.updatestate

      this.company.industry = this.comInfo.industry
      this.company.address = this.comInfo.address
      this.company.mount = this.comInfo.mount
      this.company.establishedDate = this.comInfo.establishedDate
      this.company.comsize = this.comInfo.comsize
      this.company.represent = this.comInfo.represent
      this.company.homepage = this.comInfo.homepage
      this.company.annualsales = this.comInfo.annualsales
    },
    cancel_updatestate2() {
      this.updatestate2 = !this.updatestate2
      var str = document.querySelector('#company_descript').value;
      str = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      this.company.descript = str
    },
  },
  data() {
    return {
      company: {
        id: "",
        interests: "",
        followerlist: "",
        followinglist: "",
        level: "",
        company_banner:"",
        company_name: "",
        company_logo: "",
        industry: "",
        mount: "",
        comsize: "",
        establishedDate: "",
        represent: "",
        homepage: "",
        address : "",
        annualsales: "",
        descript : "",
      },
      AllChat : [],
      comInfo : {},
      loading : false,
      recruitlist: [],
      MyRecruits: [],
      workingUser: "",
      dibsUsers: "",
      nowLevel: "",
      updatestate:false,
      updatestate2:false,
      showUpImgBanner:false,
      showUpImgBtn: false,
      showRmImgBtn: false,
      user: "",
      select_comsize:['대기업','중견기업','강소기업','외국계기업','벤처기업','공공기관/공기업','비영리단체/협회재단','외국기관/단체'],
      tmp_descript:"",
      userData : [],
      joinUserData : [],
      recruitsbyCompany:"",
    };
  }
};
</script>

<style>
#companyBanner {
  background-size: 100%;
}
#company_detail {
  padding: 1em;
  -moz-column-count: 2;
  -moz-column-gap: 1em;
  -webkit-column-count: 2;
  -webkit-column-gap: 1em;
  column-count: 2;
  column-gap: 1em;
}
</style>

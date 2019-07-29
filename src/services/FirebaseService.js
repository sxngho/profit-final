import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// INIT FIREBASE SERVICE -------------------------------------------------------

const firebase_config = {
  apiKey: "AIzaSyDu-5lDS7UuTjeSz2lcYLrJmst_amq3AA8",
  authDomain: "vue-reboot.firebaseapp.com",
  databaseURL: "https://vue-reboot.firebaseio.com",
  projectId: "vue-reboot",
  storageBucket: "",
  messagingSenderId: "395343379837",
  appId: "1:395343379837:web:62eb22d57ca1520e"
};

firebase.initializeApp(firebase_config);

const firestore = firebase.firestore();
const auth = firebase.auth;
var provider = new auth.FacebookAuthProvider();
var login_user; // 로그인 하면 email, 아니면 ''  처리
var url = document.location.href;

auth().onAuthStateChanged(function(user) {
  if (user) {
    login_user = user.email;
    // console.log(login_user)
  } else {
    login_user = "익명";
  }

  // firestore.collection('weblog').add({
  //   login_user,
  //   url,
  //   date: firebase.firestore.FieldValue.serverTimestamp()
  // })
});
// --------------------------------------------------------INIT FIREBASE SERVICE

export default {

  // ---------------------------------------------------------------------------------------------------------------------------------
  // PROJECT--------------------------------------------------------------------

    // Function :: 모든 프로젝트를 가져옵니다.
    async SELECT_ALLProjects() {
      return firestore.collection("projects").get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return { project_id: doc.id, data: data, projecttech: data.projecttech };
        });
      });
    },


    // Function :: 특정 프로젝트를 찾는 것입니다.
    async SELECT_Project(id) {
      return firestore.collection("projects").doc(id).get().then(docSnapshots => {
        return docSnapshots.data();
      });
    },

    // Function :: 개인 프로젝트를 가져옵니다.
    async SELECT_Projects(id) {
      return firestore.collection("projects")
      .where("session_id", "==", id).get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { project_id: doc.id, data: doc.data() };
        });
      });
    },

    // Function :: 프로젝트 디테일을 project_id로 가져옵니다
    async SELECT_ProjectsByPcode(pcode) {
      return firestore.collection("projects").doc(pcode).get().then(docSnapshots => {
        return docSnapshots.data();
      });
    },

    // Function :: 프로젝트를 작성합니다.
    INSERT_Projects(projecttitle, projectdescription, projectterm, projectcontent,
      projecttech, projectimage, projectrank, session_id)
    {
      firestore.collection("projects").add({
        projecttitle, projectdescription, projectterm, projectcontent,
        projecttech, projectimage, projectrank, session_id,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        comments: [], likeit: []
      });
    },

    UPDATE_Project(data, old, project_id) {
      old.projecttitle = data.projecttitle; old.projectdescription = data.projectdescription; old.projectterm = data.projectterm;
      old.projectcontent = data.projectcontent; old.projecttech = data.projecttech; old.projectimage = data.projectimage; old.projectrank = data.projectrank;
      alert("수정이 완료되었습니다.");
      return firestore.collection("projects").doc(project_id).update({
        projecttitle: old.projecttitle, projectdescription: old.projectdescription, projectterm: old.projectterm,
        projectcontent: old.projectcontent, projecttech: old.projecttech, projectimage: old.projectimage, projectrank: old.projectrank
      });
    },

    DELETE_project(project_id) {
      firestore.collection("projects").doc(project_id).delete();
    },

    async amount_Projects(user) {
      return firestore.collection('projects').where('session_id','==',user).get().then(docSnapshots => {
        return docSnapshots.size
      })
    },
    // --------------------------------------------------------------------PROJECT
    // ---------------------------------------------------------------------------------------------------------------------------------




    // ---------------------------------------------------------------------------------------------------------------------------------
    // USER-----------------------------------------------------------------------

    UPDATE_userImage(image, userId) {
      return firestore.collection("users").doc(userId).update({
        userImage: image
      });
    },

    // Function :: 유저의 자기소개 정보를 업데이트합니다.
    UPDATE_userIntro(intro, userId) {
      return firestore.collection("users").doc(userId).update({
        userIntro: intro
      });
    },

    // Function :: 유저의 기술 정보를 업데이트합니다.
    UPDATE_userSkill(skill, userId) {
      return firestore.collection("users").doc(userId).update({
        showSkillList: skill
      });
    },


    // Function :: 유저의 경력정보 업데이트합니다.
    UPDATE_userCar(car, old, userId) {
      old.push(car);
      return firestore.collection("users").doc(userId).update({
        userCareers: old
      });
    },

    DELETE_userCareer(userCareers, career, userId, reload) {
      var index = -1;
      for (var i in userCareers) {
        if ( userCareers[i].Company == career.Company && userCareers[i].Position == career.Position && userCareers[i].Description == career.Description &&
            userCareers[i].Startday == career.Startday && userCareers[i].Endday == career.Endday) {
            index = i; }
        }
      if (index != -1) {
        userCareers.splice(index, 1);
        return firestore.collection("users").doc(userId).update({
          userCareers: userCareers
        }).then(docSnapshots => {
          if (userCareers == 0) {
            return !reload;
          } else {
            return reload;
          }
        });
      }
    },


    // Function :: 유저의 교육정보를 업데이트합니다.
    UPDATE_userEdu(edu, old, userId) {
      old.push(edu);
      return firestore.collection("users").doc(userId).update({
        userEducations: old
      });
    },

    UPDATE_userDibs(dibs, userId) {
      return firestore.collection("users").doc(userId).update({
        dibs : dibs
      });
    },

    DELETE_userEducations(userEducations, edu, userId, reload) {
      var index = -1;
      for (var i in userEducations) {
        if (userEducations[i].Agency == edu.Agency && userEducations[i].Degree == edu.Degree &&
          userEducations[i].Startday == edu.Startday && userEducations[i].Endday == edu.Endday) {
          index = i;
        }
      }
      if (index != -1) {
        userEducations.splice(index, 1);
        return firestore.collection("users").doc(userId).update({
          userEducations: userEducations
        }).then(docSnapshots => {
          if (userEducations == 0) {
            return !reload;
          } else {
            return reload;
          }
        });
      }
    },


    UPDATE_userAddon(userId, toggleView) {
      firestore.collection("user_addon").doc(userId).update({
        toggleView: toggleView
      });
    },

    DELETE_userImage(userId) {
      firestore.collection("users").doc(userId).update({
        userImage: ""
      });
    },

    async SELECT_userAddon(userId) {
      return firestore.collection("user_addon").doc(userId).get().then(docSnapshots => {
        return docSnapshots.data().toggleView;
      });
    },

    // Function :: 유저의 정보를 가져옵니다.
    async SELECT_Userdata(id) {
      return firestore.collection("users").where("nickname", "==", id).get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
    },

    // Function :: 특정 문자를 포함하는 유저들을 리스트로 묶어서 보냅니다.(seulgi)
    async SELECT_Usersdata(nickname) {
      return firestore.collection("users").where("nickname", "==", nickname).get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          // console.log(doc.data())
          return doc.data();
        });
    });

  },

    // Function :: 유저의 정보를 가져옵니다.
    async SELECT_AllUserdata() {
      return firestore.collection("users").get().then(docSnapshots => {
          return docSnapshots.docs.map(doc => {
            let data = doc.data();
            return { level : data.level , name : data.email };
          });
        });
    },

    // Function :: 유저 정보를 가져옵니다
    async SELECT_ALLUser(){
      return firestore.collection("users").get().then(docSnapshots => {
          return docSnapshots.docs.map(doc => {
            let data = doc.data();
            return data;
          });
        });
    },

      async SELECT_UserdataEmail(id) {
        return firestore.collection("users").where("email", "==", id).get().then(docSnapshots => {
          return docSnapshots.docs.map(doc => {
            return doc.data();
          });
        });
      },

    // -----------------------------------------------------------------------USER
    // ---------------------------------------------------------------------------------------------------------------------------------





    // ---------------------------------------------------------------------------------------------------------------------------------
    // COMPANY--------------------------------------------------------------------

    async SELECT_Companydata(id) {
      return firestore.collection("companys").where("id", "==", id).get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
    },

    // Function :: 기업의 정보를 가져옵니다.
    async SELECT_AllCompanydata() {
      return firestore.collection("companys").get().then(docSnapshots => {
          return docSnapshots.docs.map(doc => {
            let data = doc.data();
            return { level : data.level , name : data.id };
          });
        });
    },

    async SELECT_AllCompany() {
      return firestore.collection("companys").get().then(docSnapshots => {
          return docSnapshots.docs.map(doc => {
            let data = doc.data();
            return data;
          });
        });
    },

    // --------------------------------------------------------------------COMPANY
    // ---------------------------------------------------------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------------------------------------------------------
    // COMMNET--------------------------------------------------------------------


    // Function :: 특정 프로젝트의 댓글들을 찾는 것입니다. ( seulgi )
    async SELECT_Comments(id) {
      return firestore.collection("projects").doc(id).get().then(docSnapshots => {
        return docSnapshots.data().comments;
      });
    },

    // Function :: 댓글을 프로젝트 안의 댓글들 이라는 요소에 추가합니다.
    // toyou 라는 것은 댓글이 어떤 상대방을 태그할때(#) 상대방의 alertlist에 관련 내용들을 집어넣습니다.
    // 추후에 이를 통해 알림을 제공할 예정입니다.(seulgi)
    INSERT_Comment(toyou, comment, old, project_id) {
      var toyou_length = toyou.length
      // console.log(comment.Comment.substr(toyou_length+1))
      if (toyou) {
        firestore.collection('users').doc(toyou).get().then((docSnapshot) => {
          var old_alertlist = docSnapshot.data().alertlist
          old_alertlist.push({type:1, project_id:project_id, check:false, comment:comment.Comment.substr(toyou_length+1)})
          firestore.collection('users').doc(toyou).update({
            alertlist:old_alertlist
          })
        })
      }

      old.comments.push(comment);
      return firestore.collection("projects").doc(project_id).update({
        comments: old.comments
      });
    },

    DELETE_comment(project_id, comments, comment_index) {



      var old = comments;
      old.splice(comment_index, 1);
      return firestore.collection("projects").doc(project_id).update({
        comments: old
      });
    },

    UPDATE_comment(pcode, comments, index, update_commenttext) {
      comments[index].Comment = update_commenttext
      var newcomments = comments
      return firestore.collection('projects').doc(pcode).update({
        comments : newcomments
      });
    },
    // --------------------------------------------------------------------COMMENT
    // ---------------------------------------------------------------------------------------------------------------------------------

    // --------------------------------------------------------------------COMMENT
    // ---------------------------------------------------------------------------------------------------------------------------------




    // ---------------------------------------------------------------------------------------------------------------------------------
    // CHAT--------------------------------------------------------------------

    async SELECT_Recruit() {
      return firestore.collection("recruit").get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data : doc.data(), id : doc.id };
        });
      });
    },
    async SELECT_RecruitById(id) {
      return firestore.collection("recruit").doc(id).get().then(docSnapshots => {
        return docSnapshots.data();
      });
    },

    async SELECT_AllRecruits() {
      return firestore.collection("recruit").get().then(docSnapshot => {
        return docSnapshot.docs.map(doc => {
            return doc.data();
        });
      });
    },

    async SELECT_RecruitByCompany(id) {
      return firestore.collection("recruit").where("companyId","==",id).get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data : doc.data(), id : doc.id };
        });
      });
    },

    SELECT_AllCharRoom() {
      return firestore.collection("chat").get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
    },

    SELECT_AllChatRoom() {
      return firestore.collection("chat").get().then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data : doc.data() , id : doc.id };
        });
      });
    },

    INSERT_ChatRoom(recruit,userId) {
      firestore.collection("chat").add({
        recruitPK : recruit,
        userId,
        messages : "",
      });
    },


    // --------------------------------------------------------------------CHAT
    // ---------------------------------------------------------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------------------------------------------------------
    // SIGN--------------------------------------------------------------------

    async Signin(id, password) {
      return firebase.auth().signInWithEmailAndPassword(id, password).then(function() {
        return true;
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`${errorCode}\n${errorMessage}`);
      });
      return false;
    },

    async SigninFacebook() {
      return firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user.email;
        var time = String(Date.now()) // nickname을 임시로 넣기 위한 숫자변수 역할
        var answer = { user: user, result: true };
        return answer;
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        alert(`${errorCode}\n${errorMessage}\n${email}\n${credential}`);
        return false;
      });
    },

    async Logout() {
      return firebase.auth().signOut().then(function() {
        return false;
      })
      .catch(function(error) {
        alert(error);
        return true;
      });
    },

    async SignupUser(id, password, first_name, last_name, phonenumber, userSkills, userImage, userName, userIntro, userCareers, userEducations, nickname) {
      return firestore.collection('users').doc(nickname).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          alert(`${nickname}이 이미 존재합니다. 수정해주세요`)
          return false;
        } else {
          var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; //특수문자 체크
          if ( pattern_spc.test(nickname) ) {
            alert('nickname에 특수문자는 제외해주세요. ex : ~!@#$%^&*()_+|<>?:{}')
            return false;
        } else {
          return firebase.auth().createUserWithEmailAndPassword(id, password).then(function() {
              firestore.collection("users").doc(nickname).set({
                email: id, first_name: first_name, last_name: last_name, phonenumber: phonenumber, userSkills: userSkills,
                userImage: userImage, userName: first_name + last_name, userIntro: userIntro, userCareers: userCareers,
                userEducations: userEducations, followerlist: [], followinglist: [], likeitProject: [], nickname : nickname, level : 0, showSkillList : [],
                dibs : [], alertlist:[],
              });
              firestore.collection("user_addon").doc(nickname).set({
                toggleView: false
              });
              return true;
            })
            .catch(function(error) {
              alert(error);
              return false;
            });
          }
        }
      })
    },

    async SignupCompany(company_name, id, password, interests) {
      return firestore.collection('companys').doc(company_name).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          alert(`${company_name}은 이미 존재합니다.`)
          return false;
        } else {
          return firebase.auth().createUserWithEmailAndPassword(id, password).then(function() {
            firestore.collection("companys").doc(company_name).set({
              company_name: company_name, id: id, interests: interests,
              followerlist: [], followinglist: [], level : "3",
            });
            // alert(`${id}님, 회원가입이 완료되었습니다.`);
            return true;
          })
          .catch(function(error) {
            alert(error);
            return false;
          });
        }
      })
    },

    // --------------------------------------------------------------------SIGN
    // ---------------------------------------------------------------------------------------------------------------------------------



    // ---------------------------------------------------------------------------------------------------------------------------------
    // FOLLOW--------------------------------------------------------------------

    // Function :: 팔로우를 추가합니다.
    async follow(follow, user, followerlist, followinglist) {
      followerlist.push(user);
      followinglist.push(follow);
      firestore.collection("users").doc(follow).update({
        followerlist: followerlist
      });
      firestore.collection("users").doc(user).update({
        followinglist: followinglist
      });
    },

    // Function :: 언팔로우합니다.
    async unfollow(follow, user, followerlist, followinglist) {
      followerlist.splice(followerlist.indexOf(user), 1);
      followinglist.splice(followinglist.indexOf(follow), 1);
      firestore.collection("users").doc(follow).update({
        followerlist: followerlist
      });
      firestore.collection("users").doc(user).update({
        followinglist: followinglist
      });
    },

    // --------------------------------------------------------------------FOLLOW
    // ---------------------------------------------------------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------------------------------------------------------
    // LIKE--------------------------------------------------------------------


    // Function :: 프로젝트를 좋아요 는 else문 취소는 if문 , like_users : 프로젝트를 좋아하는 사람들
    async like_project(user, project_id, like_users) {
      // 각 상황별로.
      // 1. 프로젝트의 좋아요 들 안에 user를 넣는다.
      // 2. user의 likeitProject에 project_id를 넣는다.
      if (like_users.includes(user)) { // 이미 좋아요를 눌렀다면.
        var index = like_users.indexOf(user)
        like_users.splice(index, 1)
        firestore.collection('users').doc(user).get()
        .then((docSnapshot) => { // 그 사람이 좋아하는 프로젝트 리스트를 가져온 다음
          var users_likeprojects = docSnapshot.data().likeitProject
          var index2 = users_likeprojects.indexOf(project_id)
          users_likeprojects.splice(index2, 1)
          firestore.collection('users').doc(user).update({
            likeitProject : users_likeprojects
          })
          firestore.collection('projects').doc(project_id).update({
            likeit : like_users
          })
        })
      } else {
        like_users.push(user)
        firestore.collection('users').doc(user).get()
        .then((docSnapshot) => {
          var users_likeprojects = docSnapshot.data().likeitProject
          users_likeprojects.push(project_id)
          firestore.collection('users').doc(user).update({
            likeitProject : users_likeprojects
          })
          firestore.collection('projects').doc(project_id).update({
            likeit : like_users
          })
        })
      }
    },

    // Function :: 프로젝트 안에 있는 댓글 좋아요 기능.
    // user : 현재 로그인한 유저, pcode : 프로젝트 id, comments : 프로젝트에 있는 댓글들, com_like : 해당 댓글을 좋아요 누른 사람들(배열), index : 특정 댓글이 프로젝트의 댓글들 안에 몇번째 인덱스인지
    async like_comment(user, pcode, comments, com_like, index) {
      var users_likecomment = comments[index].like
      if (users_likecomment.includes(user)) {
        var index3 = users_likecomment.indexOf(user)
        users_likecomment.splice(index3, 1)
        comments[index].like = users_likecomment
        comments[index].likecount -= 1
        firestore.collection('projects').doc(pcode).update({
          comments : comments
        })
        return comments
      } else {
        users_likecomment.push(user)
        comments[index].like = users_likecomment
        comments[index].likecount += 1
        firestore.collection('projects').doc(pcode).update({
          comments : comments
        })
        return comments
      }

    },
    async unlike_comment(user, pcode, comments, com_like, index) {
      var users_unlikecomment = comments[index].unlike
      if (users_unlikecomment.includes(user)) {
        var index3 = users_unlikecomment.indexOf(user)
        users_unlikecomment.splice(index3, 1)
        comments[index].unlike = users_unlikecomment
        comments[index].unlikecount -= 1
        firestore.collection('projects').doc(pcode).update({
          comments : comments
        })
        return comments
      } else {
        users_unlikecomment.push(user)
        comments[index].unlike = users_unlikecomment
        comments[index].unlikecount += 1
        firestore.collection('projects').doc(pcode).update({
          comments : comments
        })
        return comments
      }

    },
    // --------------------------------------------------------------------LIKE
    // ---------------------------------------------------------------------------------------------------------------------------------




    // ---------------------------------------------------------------------------------------------------------------------------------
    // ETC --------------------------------------------------------------------


    async reload_userskill(userId,projects) {
      let a = new Set([]);
      for(let i=0; i<projects.length; i++) {
        let b = new Set(projects[i].data.projecttech);
        a = new Set([...a, ...b]);
      }
      var arr = Array.from(a);
      firestore.collection("users").doc(userId).update({
        userSkills : arr
      });
    },


    // --------------------------------------------------------------------ETC
    // ---------------------------------------------------------------------------------------------------------------------------------



    // ---------------------------------------------------------------------------------------------------------------------------------
    // REPORT--------------------------------------------------------------------

    async SELECT_AllReport() {
      return firestore.collection("report").get().then(docSnapshots => {
          return docSnapshots.docs.map(doc => {
            let data = doc.data();
            return data;
          });
        });
    },

    // --------------------------------------------------------------------REPORT
    // ---------------------------------------------------------------------------------------------------------------------------------



    // ---------------------------------------------------------------------------------------------------------------------------------
    // Weblog--------------------------------------------------------------------
      // Function :: 모든 웹로그를 가져옵니다.
      async SELECT_ALLWebLog() {
        return firestore
          .collection("weblog")
          .get()
          .then(docSnapshots => {
            return docSnapshots.docs.map(doc => {
              let data = doc.data();
              return data;
            });
          });
      },


    // --------------------------------------------------------------------Weblog
    // ---------------------------------------------------------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------------------------------------------------------
    // recruit--------------------------------------------------------------------
      // Function :: 모든 웹로그를 가져옵니다.
      async INSERT_recruitInfo(recruitInfo) {
        return firestore
          .collection("recruitInfo")
          .add({
            category: recruitInfo.category,
            projectTitle: recruitInfo.projectTitle,
            startDay: recruitInfo.startDay,
            endDay: recruitInfo.endDay,
            budget: recruitInfo.budget,
            projectSummary: recruitInfo.projectSummary,
            projectContent: recruitInfo.projectContent,
            selectTechList: recruitInfo.selectTechList,
            closingDate: recruitInfo.closingDate
          });
      },

      //
      // firestore.collection("projects").add({
      //   projecttitle, projectdescription, projectterm, projectcontent,
      //   projecttech, projectimage, projectrank, session_id,
      //   date: firebase.firestore.FieldValue.serverTimestamp(),
      //   comments: [], likeit: []
      // });
    // --------------------------------------------------------------------recruit
    // ---------------------------------------------------------------------------------------------------------------------------------
  };

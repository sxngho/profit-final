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
    return firestore
      .collection("projects")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return {
            project_id: doc.id,
            data: data,
            projecttech: data.projecttech
          };
        });
      });
  },

  // Function :: 특정 프로젝트를 찾는 것입니다.
  async SELECT_Project(id) {
    return firestore
      .collection("projects")
      .doc(id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.data();
      });
  },

  // Function :: 개인 프로젝트를 가져옵니다.
  async SELECT_Projects(id) {
    return firestore
      .collection("projects")
      .where("session_id", "==", id)
      .orderBy('date', 'desc')
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { project_id: doc.id, data: doc.data() };
        });
      });
  },

  // Function :: 프로젝트 디테일을 project_id로 가져옵니다
  async SELECT_ProjectsByPcode(pcode) {
    return firestore
      .collection("projects")
      .doc(pcode)
      .get()
      .then(docSnapshots => {
        // console.log(docSnapshots.data())
        return docSnapshots.data();
      });
  },

  // Function :: 프로젝트를 작성합니다.
  async INSERT_Projects(
    projecttitle,
    projectdescription,
    projectterm,
    projectcontent,
    projecttech,
    projectimage,
    projectrank,
    session_id
  ) {
    var projectdata = firestore.collection("projects").add({
      projecttitle,
      projectdescription,
      projectterm,
      projectcontent,
      projecttech,
      projectimage,
      projectrank,
      session_id,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      comments: [],
      likeit: [],
      likeitcount: 0,
      state: 0,
      reportUserList: []
    });
    // return 생성 이유 : 프로젝트 만든 순간 follow한테 alert 보내려고 데이터 필요하기 때문.seulgil
    return projectdata;
  },

  INSERT_alert_Project(alert_person, project, old) {
    // console.log(project)
    firestore
      .collection("users")
      .doc(alert_person)
      .get()
      .then(docSnapshot => {
        var old_alertlist = docSnapshot.data().alertlist;
        old_alertlist.push({
          check: false,
          url: "/project/" + project.project_id,
          message: `${project.session_id}님이 새 프로젝트를 생성하였습니다`,
          user: project.session_id
        });
        firestore
          .collection("users")
          .doc(alert_person)
          .update({
            alertlist: old_alertlist
          });
      });
  },

  UPDATE_Project(data, old, project_id) {
    old.projecttitle = data.projecttitle;
    old.projectdescription = data.projectdescription;
    old.projectterm = data.projectterm;
    old.projectcontent = data.projectcontent;
    old.projecttech = data.projecttech;
    old.projectimage = data.projectimage;
    old.projectrank = data.projectrank;
    return firestore
      .collection("projects")
      .doc(project_id)
      .update({
        projecttitle: old.projecttitle,
        projectdescription: old.projectdescription,
        projectterm: old.projectterm,
        projectcontent: old.projectcontent,
        projecttech: old.projecttech,
        projectimage: old.projectimage,
        projectrank: old.projectrank
      });
  },

  UPDATE_projectReportUserList(projectId, reportUserList) {
    firestore
      .collection("projects")
      .doc(projectId)
      .update({
        reportUserList: reportUserList
      });
  },

  UPDATE_commentReportUserList(projectId, comments) {
    firestore
      .collection("projects")
      .doc(projectId)
      .update({
        comments: comments
      });
  },

  UPDATE_projectState(projectId, projectStack) {
    firestore
      .collection("projects")
      .doc(projectId)
      .update({
        state: projectStack
      });
  },

  UPDATE_commentState(projectId, comments) {
    firestore
      .collection("projects")
      .doc(projectId)
      .update({
        comments: comments
      });
  },

  DELETE_project(project_id) {
    firestore
      .collection("projects")
      .doc(project_id)
      .delete();
  },

  async amount_Projects(user) {
    return firestore
      .collection("projects")
      .where("session_id", "==", user)
      .get()
      .then(docSnapshots => {
        return docSnapshots.size;
      });
  },
  // --------------------------------------------------------------------PROJECT
  // ---------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------
  // USER-----------------------------------------------------------------------

  UPDATE_userImage(image, userId) {
    return firestore
      .collection("users")
      .doc(userId)
      .update({
        userImage: image
      });
  },

  // Function :: 유저의 자기소개 정보를 업데이트합니다.
  UPDATE_userIntro(intro, userId) {
    return firestore
      .collection("users")
      .doc(userId)
      .update({
        userIntro: intro
      });
  },

  // Function :: 유저의 기술 정보를 업데이트합니다.
  UPDATE_userSkill(skill, userId) {
    return firestore
      .collection("users")
      .doc(userId)
      .update({
        showSkillList: skill
      });
  },

  // Function :: 유저의 경력정보 업데이트합니다.
  UPDATE_userCar(car, old, userId) {
    old.push(car);
    return firestore
      .collection("users")
      .doc(userId)
      .update({
        userCareers: old
      });
  },

  DELETE_userCareer(userCareers, career, userId, reload) {
    var index = -1;
    for (var i in userCareers) {
      if (
        userCareers[i].Company == career.Company &&
        userCareers[i].Position == career.Position &&
        userCareers[i].Description == career.Description &&
        userCareers[i].Startday == career.Startday &&
        userCareers[i].Endday == career.Endday
      ) {
        index = i;
      }
    }
    if (index != -1) {
      userCareers.splice(index, 1);
      return firestore
        .collection("users")
        .doc(userId)
        .update({
          userCareers: userCareers
        })
        .then(docSnapshots => {
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
    return firestore
      .collection("users")
      .doc(userId)
      .update({
        userEducations: old
      });
  },

  UPDATE_userDibs(dibs, userId) {
    console.log("user Dibs update!");
    return firestore
      .collection("users")
      .doc(userId)
      .update({
        dibs: dibs
      });
  },

  DELETE_userEducations(userEducations, edu, userId, reload) {
    var index = -1;
    for (var i in userEducations) {
      if (
        userEducations[i].Agency == edu.Agency &&
        userEducations[i].Degree == edu.Degree &&
        userEducations[i].Startday == edu.Startday &&
        userEducations[i].Endday == edu.Endday
      ) {
        index = i;
      }
    }
    if (index != -1) {
      userEducations.splice(index, 1);
      return firestore
        .collection("users")
        .doc(userId)
        .update({
          userEducations: userEducations
        })
        .then(docSnapshots => {
          if (userEducations == 0) {
            return !reload;
          } else {
            return reload;
          }
        });
    }
  },

  UPDATE_userAddon(userId, toggleView) {
    firestore
      .collection("user_addon")
      .doc(userId)
      .update({
        toggleView: toggleView
      });
  },

  DELETE_userImage(userId) {
    firestore
      .collection("users")
      .doc(userId)
      .update({
        userImage: ""
      });
  },

  async SELECT_userAddon(userId) {
    return firestore
      .collection("user_addon")
      .doc(userId)
      .get()
      .then(docSnapshots => {
        return docSnapshots.data().toggleView;
      });
  },

  // Function :: 유저의 정보를 가져옵니다.
  async SELECT_Userdata(id) {
    return firestore
      .collection("users")
      .where("nickname", "==", id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
  },

  async SELECT_UserIdData() {
    return firestore
      .collection("users")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return {data : doc.data(), id :doc.id};
        });
      });
  },

  async SELECT_UserdataEmail(id) {
    return firestore
      .collection("users")
      .where("email", "==", id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
  },
  // Function :: 특정 문자를 포함하는 유저들을 리스트로 묶어서 보냅니다.(seulgi)
  async SELECT_Usersdata(nickname) {
    return firestore
      .collection("users")
      .where("nickname", ">=", nickname)
      .limit(4)
      .get()
      .then(docSnapshots => {
        return docSnapshots;
      });
  },

  // Function :: 특정 문자를 포함하는 유저들을 리스트로 묶어서 보냅니다.(seulgi)
  async SELECT_UserSkillByNickname(nickname) {
    return firestore
      .collection("users")
      .where("nickname", "==", nickname)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          // console.log(doc.data())
          return { us: doc.data().userSkills, ss: doc.data().showSkillList };
        });
      });
  },
  // Function :: 유저의 정보를 가져옵니다.
  async SELECT_AllUserdata() {
    return firestore
      .collection("users")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return { level: data.level, name: data.email };
        });
      });
  },

  // Function :: 유저 정보를 가져옵니다
  async SELECT_ALLUser() {
    return firestore
      .collection("users")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return data;
        });
      });
  },

  UPDATE_UsersDibsToDel(user, newdibs) {
    return firestore
      .collection("users")
      .doc(user)
      .update({
        dibs: newdibs
      });
  },

  async SELECT_UserDibs(nickname) {
    return firestore
      .collection("users")
      .doc(nickname)
      .get()
      .then(docSnapshots => {
        return docSnapshots.data().dibs;
      });
  },

  UPDATE_UserProceedList(user, newlist) {
    return firestore
      .collection("users")
      .doc(user)
      .update({
        proceedList: newlist
      });
  },

  async SELECT_UserProceedList(nickname) {
    return firestore
      .collection("users")
      .doc(nickname)
      .get()
      .then(docSnapshots => {
        return docSnapshots.data().proceedList;
      });
  },

  async SELECT_UserImage(nickname){
    return firestore
      .collection("users")
      .doc(nickname)
      .get()
      .then(docSnapshots => {
        return { profileImg : docSnapshots.data().userImage,
                    banner:docSnapshots.data().storyBanner};
      });
  },

  DELETE_user(id) {
    firestore
      .collection("users")
      .doc(id)
      .delete();
  },

  UPDATE_Userlevel(nickname, newlevel) {
    return firestore
      .collection("users")
      .doc(nickname)
      .update({
        level: newlevel
      });
  },

  // -----------------------------------------------------------------------USER
  // ---------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------
  // COMPANY--------------------------------------------------------------------

  async SELECT_Companydata(id) {
    return firestore
      .collection("companys")
      .where("id", "==", id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
  },

  async SELECT_Companynickname(company_name) {
    return firestore
      .collection("companys")
      .doc(company_name)
      .get()
      .then(docSnapshot => {
        return docSnapshot.data();
      });
  },

  // Function :: 기업의 정보를 가져옵니다.
  async SELECT_AllCompanydata() {
    return firestore
      .collection("companys")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return { level: data.level, name: data.id };
        });
      });
  },

  async SELECT_AllCompany() {
    return firestore
      .collection("companys")
      .get()
      .then(docSnapshots => {
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
    return firestore
      .collection("projects")
      .doc(id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.data().comments;
      });
  },

  // Function :: 댓글을 프로젝트 안의 댓글들 이라는 요소에 추가합니다.
  // INSERT_alert_Comment, INSERT_Comment 안에 들어가는 요소들이 모두 필요하지는 않지만,
  // 어떻게 수정될 지 모르는 상황이므로 일단 추가적으로 줄이지는 않겠습니다.
  INSERT_alert_Comment(alert_person, comment, old) {
    // console.log(old, '떳냐')
    firestore
      .collection("users")
      .doc(alert_person)
      .get()
      .then(docSnapshot => {
        var old_alertlist = docSnapshot.data().alertlist;
        old_alertlist.push({
          check: false,
          url: comment.url,
          user: comment.session_id,
          message: `${comment.session_id}님이 댓글에서 회원님을 언급했습니다`
        });
        firestore
          .collection("users")
          .doc(alert_person)
          .update({
            alertlist: old_alertlist
          });
      });
  },

  INSERT_Comment(comment, old, project_id) {
    old.comments.push(comment);
    return firestore
      .collection("projects")
      .doc(project_id)
      .update({
        comments: old.comments
      });
  },

  DELETE_comment(project_id, comments, comment_index) {
    var old = comments;
    old.splice(comment_index, 1);
    return firestore
      .collection("projects")
      .doc(project_id)
      .update({
        comments: old
      });
  },

  UPDATE_comment(pcode, comments, index, update_commenttext) {
    comments[index].Comment = update_commenttext;
    var newcomments = comments;
    return firestore
      .collection("projects")
      .doc(pcode)
      .update({
        comments: newcomments
      });
  },
  // --------------------------------------------------------------------COMMENT
  // ---------------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------COMMENT
  // ---------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------
  // CHAT--------------------------------------------------------------------

  async SELECT_Recruit() {
    return firestore
      .collection("recruit")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },
  async SELECT_RecruitInfo() {
    return firestore
      .collection("recruitInfo")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },
  async SELECT_RecruitById(id) {
    return firestore
      .collection("recruit")
      .doc(id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.data();
      });
  },


  async SELECT_RecruitInfoByRecruitId(id) {
    return firestore
      .collection("recruitInfo")
      .doc(id)
      .get()
      .then(docSnapshots => {
        return { data: docSnapshots.data(), id: docSnapshots.id };
      });
  },

  async SELECT_AllRecruits() {
    return firestore
      .collection("recruit")
      .get()
      .then(docSnapshot => {
        return docSnapshot.docs.map(doc => {
          return doc.data();
        });
      });
  },
  async SELECT_RecruitInfoById(id) {
    return firestore
      .collection("recruitInfo")
      .where("companyId", "==", id)
      .orderBy("contract")
      .orderBy("createDay", 'desc')
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },
  async SELECT_RecruitByCompany(id) {
    return firestore
      .collection("recruit")
      .where("companyId", "==", id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },

  async SELECT_RecruitInfoByCompany(id) {
    return firestore
      .collection("recruitInfo")
      .where("companyId", "==", id)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },

  DELETE_RecruitById(id) {
    firestore.collection("recruitInfo").doc(id).delete();
  },
  SELECT_AllCharRoom() {
    return firestore
      .collection("chat")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.data();
        });
      });
  },

  SELECT_AllChatRoom() {
    return firestore
      .collection("chat")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },

  INSERT_ChatRoom(recruit, userId) {
    firestore.collection("chat").add({
      recruitPK: recruit,
      userId,
      messages: ""
    });
  },

  UPDATE_RecruitContract(rcode, user) {
    firestore
      .collection("recruitInfo")
      .doc(rcode)
      .update({
        contract: true,
        responsibility: user
      });
  },

  // --------------------------------------------------------------------CHAT
  // ---------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------
  // SIGN--------------------------------------------------------------------

  async Signin(id, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(id, password)
      .then(function() {
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
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user.email;
        var time = String(Date.now()); // nickname을 임시로 넣기 위한 숫자변수 역할
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
    return firebase
      .auth()
      .signOut()
      .then(function() {
        return false;
      })
      .catch(function(error) {
        alert(error);
        return true;
      });
  },

  async SignupUser(id,password,phonenumber,userSkills,userImage,userName,
    userIntro,userCareers,userEducations,nickname) {
      return firebase
      .auth()
      .createUserWithEmailAndPassword(id, password)
      .then(function() {
        firestore
        .collection("users")
        .doc(nickname)
        .set({
          email: id,
          phonenumber: phonenumber,
          userSkills: userSkills,
          userImage: userImage,
          userName: userName,
          userIntro: userIntro,
          userCareers: userCareers,
          userEducations: userEducations,
          followerlist: [],
          followinglist: [],
          likeitProject: [],
          nickname: nickname,
          level: 2,
          showSkillList: [],
          dibs: [],
          alertlist: [],
          proceedList: [],
          storyBanner:"",
        });
        firestore
        .collection("user_addon")
        .doc(nickname)
        .set({
          toggleView: false
        });
        return true;
      })
      .catch(function(error) {
        // alert(error);
        return false;
      })
  },

  async SignupCompany(company_name, id, password, interests) {
    return firestore
      .collection("companys")
      .doc(company_name)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          alert(`${company_name}은 이미 존재합니다.`);
          return false;
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(id, password)
            .then(function() {
              firestore
                .collection("companys")
                .doc(company_name)
                .set({
                  company_name: company_name,
                  id: id,
                  interests: interests,
                  followerlist: [],
                  followinglist: [],
                  level: 3,
                  company_logo: "",
                  industry: "",
                  mount: "",
                  comsize: "",
                  establishedDate: "",
                  represent: "",
                  homepage: "",
                  address: "",
                  descript: ""
                });
              // alert(`${id}님, 회원가입이 완료되었습니다.`);
              return true;
            })
            .catch(function(error) {
              alert(error);
              return false;
            });
        }
      });
  },

  // --------------------------------------------------------------------SIGN
  // ---------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------
  // FOLLOW--------------------------------------------------------------------

  // Function :: 팔로우를 추가합니다.
  async follow(follow, user, followerlist, followinglist) {
    followerlist.push(user);
    followinglist.push(follow);
    firestore
      .collection("users")
      .doc(follow)
      .update({
        followerlist: followerlist
      });
    firestore
      .collection("users")
      .doc(user)
      .update({
        followinglist: followinglist
      });
  },

  // Function :: 언팔로우합니다.
  async unfollow(follow, user, followerlist, followinglist) {
    followerlist.splice(followerlist.indexOf(user), 1);
    followinglist.splice(followinglist.indexOf(follow), 1);
    firestore
      .collection("users")
      .doc(follow)
      .update({
        followerlist: followerlist
      });
    firestore
      .collection("users")
      .doc(user)
      .update({
        followinglist: followinglist
      });
  },

  // Function : follow 활동을 하면 alertlist에 추가한다
  // follower 가 follow 당한 사람의 데이터. follow 는 Json 형태
  INSERT_alert_Follow(alert_person, follow, follower) {
    firestore
      .collection("users")
      .doc(alert_person)
      .get()
      .then(docSnapshot => {
        var old_alertlist = docSnapshot.data().alertlist;
        // console.log(old_alertlist, '떳냐')
        old_alertlist.push({
          check: false,
          url: follow.url,
          user: follow.user,
          message: `${follow.session_id}님이 팔로우했습니다`
        });
        // console.log(old_alertlist, '바꼇냐')
        firestore
          .collection("users")
          .doc(alert_person)
          .update({
            alertlist: old_alertlist
          });
      });
  },
  INSERT_alert_Chat(alert,userId) {
    firestore.collection("users").doc(userId).update({
        alertlist: alert
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
    if (like_users.includes(user)) {
      // 이미 좋아요를 눌렀다면.
      var index = like_users.indexOf(user);
      like_users.splice(index, 1);
      firestore
        .collection("users")
        .doc(user)
        .get()
        .then(docSnapshot => {
          // 그 사람이 좋아하는 프로젝트 리스트를 가져온 다음
          var users_likeprojects = docSnapshot.data().likeitProject;
          var index2 = users_likeprojects.indexOf(project_id);
          users_likeprojects.splice(index2, 1);
          firestore
            .collection("users")
            .doc(user)
            .update({
              likeitProject: users_likeprojects
            });
          firestore
            .collection("projects")
            .doc(project_id)
            .update({
              likeit: like_users
            });
        });
    } else {
      like_users.push(user);
      firestore
        .collection("users")
        .doc(user)
        .get()
        .then(docSnapshot => {
          var users_likeprojects = docSnapshot.data().likeitProject;
          users_likeprojects.push(project_id);
          firestore
            .collection("users")
            .doc(user)
            .update({
              likeitProject: users_likeprojects
            });
          firestore
            .collection("projects")
            .doc(project_id)
            .update({
              likeit: like_users
            });
        });
    }
  },

  // Function :: 프로젝트 안에 있는 댓글 좋아요 기능.
  // user : 현재 로그인한 유저, pcode : 프로젝트 id, comments : 프로젝트에 있는 댓글들, com_like : 해당 댓글을 좋아요 누른 사람들(배열), index : 특정 댓글이 프로젝트의 댓글들 안에 몇번째 인덱스인지
  async like_comment(user, pcode, comments, com_like, index) {
    var users_likecomment = comments[index].like;
    if (users_likecomment.includes(user)) {
      var index3 = users_likecomment.indexOf(user);
      users_likecomment.splice(index3, 1);
      comments[index].like = users_likecomment;
      firestore
        .collection("projects")
        .doc(pcode)
        .update({
          comments: comments
        });
      return comments;
    } else {
      users_likecomment.push(user);
      comments[index].like = users_likecomment;
      firestore
        .collection("projects")
        .doc(pcode)
        .update({
          comments: comments
        });
      return comments;
    }
  },
  async unlike_comment(user, pcode, comments, com_like, index) {
    var users_unlikecomment = comments[index].unlike;
    if (users_unlikecomment.includes(user)) {
      var index3 = users_unlikecomment.indexOf(user);
      users_unlikecomment.splice(index3, 1);
      comments[index].unlike = users_unlikecomment;
      firestore
        .collection("projects")
        .doc(pcode)
        .update({
          comments: comments
        });
      return comments;
    } else {
      users_unlikecomment.push(user);
      comments[index].unlike = users_unlikecomment;
      firestore
        .collection("projects")
        .doc(pcode)
        .update({
          comments: comments
        });
      return comments;
    }
  },
  // --------------------------------------------------------------------LIKE
  // ---------------------------------------------------------------------------------------------------------------------------------

  async reload_userskill(userId, projects, showlist) {
    let a = new Set([]);
    for (let i = 0; i < projects.length; i++) {
      let b = new Set(projects[i].data.projecttech);
      a = new Set([...a, ...b]);
    }
    var arr = Array.from(a);
    for (var i in arr) {
      arr[i] = arr[i].toUpperCase();
    }

    var showarr = new Array();
    for (var i in showlist) {
      if (arr.includes(showlist[i])) {
        showarr.push(showlist[i]);
      }
    }

    firestore
      .collection("users")
      .doc(userId)
      .update({
        userSkills: arr,
        showSkillList: showarr
      });
  },

  // --------------------------------------------------------------------ETC
  // ---------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------
  // REPORT--------------------------------------------------------------------

  async SELECT_AllReport() {
    return firestore
      .collection("reports")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return { data: data, id: doc.id };
        });
      });
  },

  INSERT_projectReport(
    reportTitle,
    reportContent,
    projectId,
    reportUser,
    reportedUser,
    projecttitle,
    reportStack,
    tag
  ) {
    firestore.collection("reports").add({
      reportTitle: reportTitle,
      reportContent: reportContent,
      projectId: projectId,
      reportUser: reportUser, // 신고자
      reportedUser: reportedUser, // 신고당한 유저
      projecttitle: projecttitle,
      state: false,
      reportStack: reportStack,
      tag: tag,
      date: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  INSERT_commentReport(
    reportTitle,
    reportContent,
    projectId,
    reportUser,
    reportedUser,
    projecttitle,
    reportStack,
    index,
    tag
  ) {
    firestore.collection("reports").add({
      reportTitle: reportTitle,
      reportContent: reportContent,
      projectId: projectId,
      reportUser: reportUser, // 신고자
      reportedUser: reportedUser, // 신고당한 유저
      projecttitle: projecttitle,
      state: false,
      reportStack: reportStack,
      index: index,
      tag: tag,
      date: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  DELETE_report(id) {
    firestore
      .collection("reports")
      .doc(id)
      .delete();
  },

  async SELECT_Objections(projectId) {
    return firestore
      .collection("reports")
      .where("projectId", "==", projectId)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return { data: doc.data(), id: doc.id };
        });
      });
  },
  INSERT_Objection(projectId, projectTitle, projectState, tag) {
    firestore.collection("reports").add({
      projectTitle: projectTitle,
      state: projectState,
      tag: tag,
      projectId: projectId
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
    return firestore.collection("recruitInfo").add({
      category: recruitInfo.category,
      projectTitle: recruitInfo.projectTitle,
      createDay: recruitInfo.createDay,
      endDay: recruitInfo.endDay,
      budget: recruitInfo.budget,
      projectSummary: recruitInfo.projectSummary,
      projectContent: recruitInfo.projectContent,
      requiredSkills: recruitInfo.requiredSkills,
      closingDate: recruitInfo.closingDate,
      companyId: recruitInfo.session_id,
      contract : false,
      UserComplete : false,
      CompanyComplete : false,
      responsibility : "",

    });
  },

  UPDATE_RecruitCompleteByUser(recruitPK,state) {
    if ( state === "success") {
      firestore.collection("recruitInfo").doc(recruitPK).update({
          UserComplete : 2,
      })
    } else {
      firestore.collection("recruitInfo").doc(recruitPK).update({
          UserComplete : 1,
      })
    }
  },
  UPDATE_RecruitCompleteByCompany(recruitPK,state) {
    if ( state === "success") {
      firestore.collection("recruitInfo").doc(recruitPK).update({
          CompanyComplete : 2,
      })
    } else {
      firestore.collection("recruitInfo").doc(recruitPK).update({
          CompanyComplete : 1,
      })
    }
  },
  // --------------------------------------------------------------------recruit
  // ---------------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------alert
  // -------------------------------------------------------------------------------------

  async alertcheck(alertlist, alertindex, user_id) {
    // console.log(alertindex)
    return firestore
      .collection("users")
      .doc(user_id)
      .get()
      .then(docSnapshot => {
        var old_alertlist = docSnapshot.data().alertlist;
        old_alertlist[alertindex].check = true;
        firestore
          .collection("users")
          .doc(user_id)
          .update({
            alertlist: old_alertlist
          });
        return true;
      });
  },

  // INSERT_alert_siren_project(alert_person, project, old) {
  //   // alert_person 에는 신고받은 사람 이다 . 신고한 사람의 데이터는 노 필요
  //   // project 어떤 프로젝트인지 알아야 이동할 수 있다.
  //   // old 에는 그 사람의 데이터가 들어가야한다. 그래야 alertlist 에 쌓을수있다.
  //
  //   firestore.collection('users').doc(alert_person).get().then((docSnapshot) => {
  //     var old_alertlist = docSnapshot.data().alertlist
  //     old_alertlist.push({check:false, url:'/project/' + project.project_id, message:`프로젝트가 신고내역에 접수되었습니다.`, user:project.session_id})
  //     firestore.collection('users').doc(alert_person).update({
  //       alertlist:old_alertlist
  //     })
  //   })
  // },

  INSERT_alert_manager(
    alert_person,
    project_id,
    old,
    degree,
    reportStack,
    tag
  ) {
    firestore
      .collection("users")
      .doc(alert_person)
      .get()
      .then(docSnapshot => {
        var old_alertlist = docSnapshot.data().alertlist;
        // console.log(old_alertlist);
        old_alertlist.push({
          check: false,
          url: "/project/" + project_id,
          message: `${tag} 처리 : ${degree}, 스택 : ${reportStack}`,
          user: old.nickname
        });
        firestore
          .collection("users")
          .doc(alert_person)
          .update({
            alertlist: old_alertlist
          });
      });
  },

  //-------------------------------------companyInfo--------------------------------------------//
  //--------------------------------------------------------------------------------------------//
  async UPDATE_Companys(comapnyInfo, company_name) {
    return firestore
      .collection("companys")
      .doc(company_name)
      .update({
        company_name: comapnyInfo.company_name,
        id: comapnyInfo.id,
        interests: comapnyInfo.interests,
        followerlist: comapnyInfo.followerlist,
        followinglist: comapnyInfo.followinglist,
        level: comapnyInfo.level,
        address: comapnyInfo.address,
        company_logo: comapnyInfo.company_logo,
        comsize: comapnyInfo.comsize,
        descript: comapnyInfo.descript,
        establishedDate: comapnyInfo.establishedDate,
        homepage: comapnyInfo.homepage,
        industry: comapnyInfo.industry,
        mount: comapnyInfo.mount,
        represent: comapnyInfo.represent
      });
  },

  async SELECT_CompanyInfo(company_name) {
    return firestore
      .collection("companys")
      .where("company_name", "==", company_name)
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return data;
        });
      });
  }
};

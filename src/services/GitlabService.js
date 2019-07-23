import Api from '@/services/Api'

const BASE_URL = 'https://lab.ssafy.com/api/v4'
const token = 's6ScG7ScJAx7_hDNeJQ1'

export default {
   getRepos(userName) {
      return Api(BASE_URL).get(`/users/${userName}/projects?private_token=${token}`)
   },
   async getCommits() {
      let date = new Date()
      date.setMonth(date.getMonth() - 1)
      return Api(BASE_URL).get(`/projects/6072/repository/commits?private_token=${token}&all=true&per_page=1000`)
   }

   // getCommits(fullName) {
   //    let date = new Date()
   //    date.setMonth(date.getMonth() - 1)
   //    return Api(BASE_URL).get(`/projects/${fullName}/repository/commits?private_token=${token}&all=true&per_page=1000`)
   // }
}

<template>
  <v-layout column px-4>
    <v-flex v-for="i in repositories.length">
      <v-divider v-if="i === 1"></v-divider>
        <GitRepository :repos="repositories[i - 1]"></GitRepository>
      <v-divider></v-divider>
    </v-flex>
      <GitRepGraph/>
  </v-layout>
</template>

<script>
import GitRepGraph from './GitRepGraph'
import GitRepository from './GitRepository'
import GitlabService from '@/services/GitlabService'

export default {
   name: 'GitRepList',
   props: {
   },
   data() {
      return {
         repositories: []
    }
   },
   components: {
      GitRepGraph,
      GitRepository
   },
   mounted() {
      this.getGitlabRepos('Kim-Seul-Gi')
   },
   methods: {
      async getGitlabRepos(userName) {
         const response = await GitlabService.getRepos(userName)
         if(response.status !== 200) {
            return
         }
         this.repositories = response.data
      }
   }
}
</script>

<template>
  <div>
    <v-flex hidden-xs-only>
      <div id="graph-container"></div>
    </v-flex>
    <!-- <div class="py-3">
      <p v-for="commit in commits.data">{{commit.message}}, {{commit.author_email}}</p>
    </div> -->
  </div>
</template>

<script>
import GitlabService from '@/services/GitlabService'

export default {
  name: 'GitRepGraph',
  data() {
    return {
      commits: '',
      branch: [],
    }
  },
  created() {
    this.CommitGraph()
  },
  methods: {
    async CommitGraph() {
      this.commits = await GitlabService.getCommits()
      const graphContainer = document.getElementById("graph-container");
      const gitgraph = GitgraphJS.createGitgraph(graphContainer);
      const master = gitgraph.branch("master");
      gitgraph._graph.template.commit.message.displayAuthor = false
      gitgraph._graph.template.commit.message.displayHash = false
      console.log(gitgraph)
      master.commit("INIT COMMIT")

      this.commits.data.forEach(commit => {
        if (!(this.branch.includes(commit.author_email))) {
          this.branch.push(commit.author_email)
        }
        gitgraph._graph.author = `${commit.author_name} <${commit.author_email}>`
        const branch = gitgraph.branch(commit.author_email)
        branch.commit(commit.title)
          this.branch.forEach(br => {
            master.merge(br)
          })
      })
    },
  }
}
</script>

<style>
@media only screen and (max-width: 426px) {
  #graph-container {
    display: none;
  }
}
</style>

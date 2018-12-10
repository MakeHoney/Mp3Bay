<template>
    <div class="player">
        <template v-if="playList.length">
            <h1 id="page-title">Play List</h1>
            <hr id="page-border">
            <aplayer autoplay
                     :music="playList[0]"
                     :list="playList"
                     theme="red"
            />
        </template>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Aplayer from 'vue-aplayer'
  Aplayer.disableVersionBadge = true

  export default {
    name: 'player',
    computed: {
      ...mapState({
        web3: state => state.blockSync.web3,
        playList: state => state.playList,
        user: state => state.user
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    },
    components: {
      Aplayer
    }
  }
</script>

<style scoped>
    #page-title {
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    #page-border {
        border-color: red;
    }
</style>

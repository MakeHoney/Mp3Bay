<template>
    <div class="player">
        <hr id="page-border">
        <template v-if="playList.length">
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
    #page-border {
        border-color: red;
    }
</style>

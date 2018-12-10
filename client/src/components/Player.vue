<template>
    <div class="player">
        <h1 id="page-title">Play List</h1>
        <hr id="page-border">
        <template v-if="list.length">
            <aplayer autoplay
                     :music="list[0]"
                     :list="list"
                     theme="red"
            />
        </template>
        <template v-else>
            <h1>구매한 음악이 없습니다!</h1>
        </template>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Aplayer from 'vue-aplayer'
  import config from '../config'
  Aplayer.disableVersionBadge = true

  export default {
    name: 'player',
    data() {
      return {
        list: []
      }
    },
    methods: {
      async initPlayList (songIDList) {
        songIDList.forEach(async songID => {
          const song = await this.contractMethods
            .getSongBySongID(songID).call()
          this.list.push({
            title: song.title,
            artist: song.artistName,
            src: `${config.API_HOST}/music/load?id=${songID}`,
            pic: `${config.API_HOST}/artist/load-picture?id=${song.artistID}`
          })
        })
      }
    },
    computed: {
      ...mapState('blockSync', [
        'web3'
      ]),
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    },
    components: {
      Aplayer
    },
    async mounted () {
      const songIDList = await this.contractMethods.getSongIDsByListenerAcc().call({
        from: this.web3.coinbase
      })
      await this.initPlayList(songIDList)
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

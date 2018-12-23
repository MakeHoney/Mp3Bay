<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="Artist Detail" id="modal">
            <div class="d-block text-left">
                <p id="artist-pic-p"><img :src="pictureHost" id="artist-pic" alt="artist picture"/></p>
                <h1>{{ name }}</h1>
                <hr>
                <h5 id="dsecription">{{ description }}</h5>
                <hr>
                <h3>Tracks</h3>
                <div role="tablist">
                    <div v-for="song in songList">
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-btn block href="#" v-b-toggle="song.songID" variant="danger">{{song.title}}</b-btn>
                            </b-card-header>
                            <b-collapse :id="song.songID" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div id="song-desc">
                                        <p>Description</p>
                                        <p>{{ song.description }}</p>
                                        <hr>
                                        <p></p>
                                        <p>Music Video</p>
                                        <p class="card-text">
                                            <youtube :video-id="song.youtubeKey"/>
                                        </p>
                                    </div>
                                    <b-button v-if="!mySongIDList.includes(song.songID)"
                                              variant="danger"
                                              size="sm"
                                              @click="buySong(song.songID)">Buy
                                    </b-button>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import config from '../../config'
  export default {
    data () {
      return {
        name: '',
        description: '',
        pictureHost: '',
        artistID: '',
        songList: [],
        mySongIDList: []
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
    methods: {
      async buySong (songID) {
        if (this.web3.batBalance >= 100) {
          await this.contractMethods.buySong(songID).send({
            from: this.web3.coinbase,
            gas: 200000
          })
          this.mySongIDList = await this.contractMethods
            .getSongIDsByListenerAcc(this.web3.coinbase, 'owned').call()

          await this.$store.dispatch('initPlayList')

          alert('Complete payment')
        } else {
          alert ('Not Enough BAT')
        }
        this.$refs.createForm.hide()
      },
      async triggerDetailModal ({ name, description, pictureHost, artistID }) {
        this.songList.length = 0

        this.name = name
        this.description = description
        this.pictureHost = pictureHost
        this.artistID = artistID
        const songIDList = await this.contractMethods.getSongIDsByArtistID(artistID).call()
        songIDList.forEach(async songID => {
          const url = `${config.API_HOST}/music/load-song-meta?id=${songID}`
          const song = await this.contractMethods
            .getSongBySongID(songID).call()
          const { data } = await this.$axios.get(url)
          this.songList.push({
            songID,
            title: song.title,
            description: data.description,
            youtubeKey: data.youtubeKey
          })
        })
        this.songList.reverse()
        this.$refs.createForm.show()
      }
    },
    async mounted () {
      this.$EventBus.$on('detailButtonClicked', this.triggerDetailModal)
      const ownedSong = await this.contractMethods
        .getSongIDsByListenerAcc(this.web3.coinbase, 'owned').call()
      const postedSong = await this.contractMethods
        .getSongIDsByListenerAcc(this.web3.coinbase, 'posted').call()
      this.mySongIDList = ownedSong.concat(postedSong)
    }
  }
</script>
<style scope>
    @import url("http://fonts.googleapis.com/css?family=Oleo+Script");
    @import url("http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css");
    #modal{
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
    }
    #dsecription, #song-desc {
        font-family: 'Nanum Myeongjo';
        font-size: 18px;
        font-weight: bold;
    }
    #song-desc hr {
        border-color: red;
    }
    #artist-pic {
        max-width: 30rem;
    }
    #artist-pic-p {
        text-align: center;
    }
</style>

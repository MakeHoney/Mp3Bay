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
                <div v-for="song in songList">
                    <p>
                        <a href="#" id="song-title">{{ song.title }}</a>
                        <b-button v-if="!mySongIDList.includes(song.songID)"
                                  variant="danger"
                                  size="sm"
                                  @click="buySong(song.songID)">Buy
                        </b-button>
                    </p>
                </div>
                <div role="tablist">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-btn block href="#" v-b-toggle.accordion1 variant="info">Accordion 1</b-btn>
                        </b-card-header>
                        <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <p class="card-text">
                                    I start opened because <code>visible</code> is <code>true</code>
                                </p>
                                <p class="card-text">
                                    text
                                </p>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-btn block href="#" v-b-toggle.accordion2 variant="info">Accordion 2</b-btn>
                        </b-card-header>
                        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <p class="card-text">
                                    text
                                </p>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-btn block href="#" v-b-toggle.accordion3 variant="info">Accordion 3</b-btn>
                        </b-card-header>
                        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <p class="card-text">
                                    text
                                </p>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
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
        await this.contractMethods.buySong(songID).send({
          from: this.web3.coinbase,
          gas: 200000
        })
        this.mySongIDList = await this.contractMethods.getSongIDsByListenerAcc().call({
          from: this.web3.coinbase
        })
        alert('Complete payment')
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
          const song = await this.contractMethods
            .getSongBySongID(songID).call()
          this.songList.push({ songID, title: song.title })
        })
        this.$refs.createForm.show()
      }
    },
    async mounted () {
      this.$EventBus.$on('detailButtonClicked', this.triggerDetailModal)
      this.mySongIDList = await this.contractMethods.getSongIDsByListenerAcc().call({
        from: this.web3.coinbase
      })
    }
  }
</script>
<style scope>
    @import url("http://fonts.googleapis.com/css?family=Oleo+Script");
    @import url("http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css");
    #modal{
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
    }
    #dsecription, #song-title {
        font-family: 'Nanum Myeongjo';
        font-size: 18px;
        font-weight: bold;
    }
    #artist-pic {
        max-width: 30rem;
    }
    #artist-pic-p {
        text-align: center;
    }
</style>

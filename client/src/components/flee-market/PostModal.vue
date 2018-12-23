<template>
    <div>
        <div>
            <b-button @click="showPostForm"
                      variant="danger"
                      style="margin: 10px">
                Post My Song
            </b-button>
        </div>

        <b-modal ref="postForm" hide-footer title="Post Song">
            <div class="d-block text-center">
                <b-row class="my-1">
                    <b-col sm="2">Song</b-col>
                    <b-col sm="9">
                        <b-form-select v-model="songID" :options="options" class="mb-3" />
                    </b-col>
                    {{ options }}
                    {{ songID }}
                </b-row>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="post">Post it!</b-btn>
        </b-modal>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        songID: null,
        options: []
      }
    },
    computed: {
      ...mapState({
        playList: state => state.playList,
        web3: state => state.blockSync.web3
      }),
      ...mapGetters('blockSync', [ 'contractMethods' ])
    },
    methods: {
      async showPostForm () {
        this.songID = null
        this.options.length = 0
        // posting 이후 selection 초기화 안되는 버그 발생
        this.playList.forEach(song => {
          this.options.push({
            value: song.songID,
            text: `${song.artist} - ${song.title}`
          })
        })
        this.$refs.postForm.show()
      },
      async post () {
        if (this.songID) {
          await this.contractMethods.postingSongOnFM(this.songID).send({
            from: this.web3.coinbase,
            gas: 200000
          })
          this.$refs.postForm.hide()
          await this.$store.dispatch('initPlayList')
          await this.$store.dispatch('getPosts')
        } else {
          alert('Select a song to post!')
        }
      }
    }
  }
</script>

<template>
    <div>
        <div>
            <b-button @click="showRegisterForm"
                      variant="danger"
                      style="margin: 10px">
                Register Song
            </b-button>
            <b-button @click="showSongList"
                      variant="danger"
                      style="margin: 10px">
                My Song
            </b-button>
        </div>

        <b-modal ref="registerForm" hide-footer title="Register Song">
            <div class="d-block text-center">
                <b-row class="my-1">
                    <b-col sm="2">Title</b-col>
                    <b-col sm="9">
                        <b-form-input id="input-songTitle"
                                      type="text"
                                      placeholder="Song title"
                                      v-model="title">
                        </b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">Desc</b-col>
                    <b-col sm="9">
                        <b-form-textarea id="input-songDesc"
                                         :rows="5"
                                         :max-rows="20"
                                         placeholder="Song description"
                                         v-model="description">
                        </b-form-textarea>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">MV Youtube Key</b-col>
                    <b-col sm="9">
                        <b-form-input id="input-youtubeKey"
                                      type="text"
                                      placeholder="Youtube key"
                                      v-model="youtubeKey">
                        </b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">File</b-col>
                    <b-col sm="9">
                        <b-form-file v-model="selectedFile"
                                     :state="Boolean(selectedFile)"
                                     placeholder="Choose a file..."
                                     @change="onFileSelected">
                        </b-form-file>

                        <!--<input type="file" @change="onFileSelected">-->
                    </b-col>
                </b-row>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="submitUploadForm">Register</b-btn>
        </b-modal>

        <b-modal ref="songList" hide-footer title="My Song">
            <div class="d-block text-center">
                <h3>{{user.name}}'s Song List</h3>
                <div v-for="songTitle in songTitleList">
                    <p>{{ songTitle }}</p>
                </div>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideSongList">Close</b-btn>
        </b-modal>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import config from '../../config'
  export default {
    data() {
      return {
        title: '',
        description: '',
        youtubeKey: '',
        songTitleList: [],
        selectedFile: null
      }
    },
    methods: {
      showRegisterForm () {
        this.clearForm()
        this.$refs.registerForm.show()
      },
      async submitUploadForm () {
        if (!this.title) {
          alert('Type the title')
        } else if (!this.selectedFile) {
          alert('Select the audio file')
        } else if (!this.description) {
          alert('Give some description on the song')
        } else {
          await this.uploadSong()
          // TODO: progressbar 넣기
          alert('Complete upload')
          this.$refs.registerForm.hide()
        }
      },
      async showSongList () {
        this.songTitleList.length = 0

        const songIDList = await this.loadSongIDList()
        songIDList.forEach(async songID => {
          const song = await this.contractMethods
            .getSongBySongID(songID).call()
          this.songTitleList.push(song.title)
        })
        this.$refs.songList.show()
      },
      hideSongList () {
        this.$refs.songList.hide()
      },
      async uploadSong () {
        let formData = new FormData()
        const url = `${config.API_HOST}/music/save`
        formData.append('userAccount', this.web3.coinbase)
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('youtubeKey', this.youtubeKey)
        formData.append('audioFile', this.selectedFile)
        const { data } = await this.$axios.post(url, formData)
        return data.ipfsHash
      },
      async loadSongIDList() {
        return await this.contractMethods
          .getSongIDsByArtistID(this.user.artistID).call()
      },
      onFileSelected (event) {
        this.selectedFile = event.target.files[0]
      },
      clearForm () {
        this.title = ''
        this.selectedFile = null
        this.description = ''
        this.youtubeKey = ''
      }
    },
    computed: {
      ...mapState({
        web3: state => state.blockSync.web3,
        user: state => state.user
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    }
  }
</script>

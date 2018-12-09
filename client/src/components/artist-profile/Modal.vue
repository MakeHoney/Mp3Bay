<template>
    <div>
        <div>
            <b-button @click="showRegisterForm">
                곡 등록
            </b-button>
            <b-button @click="showSongList">
                등록한 음악
            </b-button>
        </div>

        <b-modal ref="registerForm" hide-footer title="곡 등록">
            <div class="d-block text-center">
                <b-row class="my-1">
                    <b-col sm="2"><label>Title:</label></b-col>
                    <b-col sm="9">
                        <b-form-input id="input-songTitle"
                                      type="text"
                                      v-model="title">
                        </b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2"><label>File:</label></b-col>
                    <b-col sm="9">
                        <input type="file" @change="onFileSelected">
                    </b-col>
                </b-row>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="submitUploadForm">등록</b-btn>
        </b-modal>

        <b-modal ref="songList" hide-footer title="나의 음악">
            <div class="d-block text-center">
                <h3>{{user.name}}님이 등록한 음악</h3>
                <div v-for="songTitle in songTitleList">
                    <p>{{ songTitle }}</p>
                </div>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideSongList">닫기</b-btn>
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
          alert('제목을 입력해주세요.')
        } else if (!this.selectedFile) {
          alert('음원파일을 선택해주세요.')
        } else {
          await this.uploadSong()
          // TODO: progressbar 넣기
          alert('업로드가 완료되었습니다.')
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

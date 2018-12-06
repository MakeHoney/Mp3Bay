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
                <h3>곡 정보</h3>
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
                <h3>~님이 등록한 음악</h3>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideSongList">닫기</b-btn>
        </b-modal>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        title: '',
        selectedFile: null
      }
    },
    methods: {
      showRegisterForm () {
        this.$refs.registerForm.show()
      },
      async submitUploadForm () {
        // form이 비어있는 경우 예외처리 필요
        const result = await this.uploadSong()
        console.log(result)
        // progressbar 넣기
        alert('업로드가 완료되었습니다.')
        this.$refs.registerForm.hide()
        this.clearForm()
      },
      showSongList () {
        this.$refs.songList.show()
      },
      hideSongList () {
        this.$refs.songList.hide()
      },
      async uploadSong () {
        let formData = new FormData()
        const url = 'http://localhost:8888/music/save'
        formData.append('userAccount', this.web3.coinbase)
        formData.append('title', this.title)
        formData.append('audioFile', this.selectedFile)
        const { data } = await this.$axios.post(url, formData)
        return data.ipfsHash
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
      ...mapState('blockSync', [
        'web3'
      ])
    }
  }
</script>

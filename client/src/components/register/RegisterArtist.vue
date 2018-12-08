<template>
    <form @submit.prevent="submitForm(formData)">
        <b-container fluid>

            <b-row class="my-1">
                <b-col sm="2"><label for="input-none">Wallet Account:</label></b-col>
                <b-col sm="9">
                    <p>{{ web3.coinbase }}</p>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="2"><label for="input-artistName">Artist Name:</label></b-col>
                <b-col sm="9">
                    <b-form-input id="input-artistName"
                                  type="text"
                                  v-model="formData.artistName">
                    </b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="2"><label for="input-desc">Artist Description:</label></b-col>
                <b-col sm="9">
                    <b-form-textarea id="input-desc"
                                     placeholder="자신을 자유롭게 어필하세요!"
                                     :rows="10"
                                     :max-rows="100"
                                     v-model="formData.artistDescription">
                    </b-form-textarea>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col sm="2"><label for="input-artistPic">Artist Picture:</label></b-col>
                <b-col sm="9">
                    <input type="file" @change="onFileSelected">
                </b-col>
            </b-row>

            <input type="submit" id="submit" value="Register">
        </b-container>
    </form>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import config from '../../config'
  export default {
    name: 'register-artist',
    data () {
      return {
        formData: {
          artistName: '',
          artistDescription: ''
        },
        selectedFile: null
      }
    },
    methods: {
      async submitForm (formData) {
        try {
          const ipfsHash = await this.saveUserInfoIntoIPFS()
          const result = await this.contractMethods.registerArtist(formData.artistName, ipfsHash).send({
            from: this.web3.coinbase,
            gas: 1000000
          })
          const { name, artistAddr } = result.events.ArtistCreated.returnValues
          this.user.type = 'Artist'
          this.user.name = name
          this.user.address = artistAddr
        } catch(err) {
          console.error('Error occurred at RegisterArtist.vue', err)
        }
      },
      onFileSelected (event) {
        this.selectedFile = event.target.files[0]
      },
      async saveUserInfoIntoIPFS () {
        const url = `${config.API_HOST}/artist/upload-user-info`
        let formData = new FormData()
        formData.append('picture', this.selectedFile)
        formData.append('description', this.formData.artistDescription)
        let { data } = await this.$axios.post(url, formData)
        return data.ipfsHash
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

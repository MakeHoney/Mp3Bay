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
  export default {
    name: 'register-artist',
    data () {
      return {
        formData: {
          artistName: ''
        },
        selectedFile: null
      }
    },
    methods: {
      async submitForm (formData) {
        try {
          const ipfsHash = await this.savePictureIntoIPFS()
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
      async savePictureIntoIPFS () {
        const url = 'http://localhost:8888/artist/upload-picture'
        let formData = new FormData()
        formData.append('picture', this.selectedFile)

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

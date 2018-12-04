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
        }
      }
    },
    methods: {
      async submitForm (formData) {
        try {
          const result = await this.contractMethods.registerArtist(formData.artistName).send({
            gas: 1000000,
            value: 0,
            from: this.web3.coinbase
          })

          const { name, artistAddr } = result.events.ArtistCreated.returnValues
          this.user.type = 'Artist'
          this.user.name = name
          this.user.address = artistAddr

        } catch(err) {
          console.error('Error occurred at RegisterArtist.vue', err)
        }
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

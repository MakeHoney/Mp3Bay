<template>
    <b-card border-variant="danger"
            :header="`${postInfo.artistName} - ${postInfo.songTitle}`"
            header-border-variant="danger"
            header-text-variant="danger"
            class="mb-3"
            align="center">
        <p class="card-text">{{ `Seller: ${postInfo.sellerName}` }}</p>
        <p class="card-text">{{ `Seller's Wallet: ${postInfo.sellerAcc}` }}</p>
        <b-button variant="danger" @click="triggerPayment">Buy</b-button>
    </b-card>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    props: {
      postInfo: {
        type: Object
      }
    },
    computed: {
      ...mapState('blockSync', [ 'web3' ]),
      ...mapGetters('blockSync', [ 'contractMethods' ]),
      description () {
        return `Seller: ${this.postInfo.sellerName}\nSeller's Wallet: ${this.postInfo.sellerAcc}`
      }
    },
    methods: {
      async triggerPayment () {
        if(confirm('Are you sure to buy this song? (50BAT)')) {
          try {
            if (this.web3.batBalance >= 50) {
              await this.contractMethods.buySongFromFM(this.postInfo.sellerAcc, this.postInfo.songID).send({
                from: this.web3.coinbase,
                gas: 300000
              })
              await this.$store.dispatch('initPlayList')
              await this.$store.dispatch('getPosts')
            } else {
              alert ('Not Enough BAT')
            }
          } catch (err) {
            alert('Cannot buy the same song that you already posted')
          }
        }
      }
    }
  }
</script>

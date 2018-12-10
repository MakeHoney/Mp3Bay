<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="Get BAT" id="modala">
            <div class="d-block text-center">
                <b-row class="my-1">
                    <b-col sm="2"><label>BAT</label></b-col>
                    <b-col sm="9">
                        <b-form-input id="input-bat"
                                      type="number"
                                      v-model="bat">
                        </b-form-input>
                    </b-col>
                </b-row>
            </div>
            <b-btn v-if="bat >= 1"
                   class="mt-3"
                   variant="outline-danger"
                   block
                   @click="pay">
                Pay
                <span class="money" v-if="showEther === parseInt(showEther, 10)">{{ showEther}} ETH</span>
                <span class="money" v-else>{{ showEther.toFixed(4) }} ETH</span>
                for
                <span class="money">{{ bat }} BAT</span>
            </b-btn>
            <div v-else class="d-block text-center">
                <b-row class="my-1">
                    <b-col sm="2"></b-col>
                    <b-col sm="8">
                        <br/>
                        <h5 id="warning">Cannot buy under 1 BAT</h5>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        bat: null
      }
    },
    methods: {
      async pay () {
        if (this.value > this.web3.balance) {
          alert('Not enough ETH!')
        } else {
          await this.contractMethods.buyToken().send({
            value: this.value,
            from: this.web3.coinbase,
            gas: 3000000
          })
          alert('Complete payment')
        }
        this.$refs.createForm.hide()
      },
      showModal () {
        this.bat = null
        this.$refs.createForm.show()
      }
    },
    computed: {
      showEther () {
        let ether = this.bat
        for (let i = 0; i < 4; i++)
          ether = ether / 10
        return ether
      },
      value () {
        let wei = this.bat
        for(let i = 0; i < 14; i++)
          wei = wei * 10
        return wei
      },
      ...mapState('blockSync', [
        'web3'
      ]),
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    },
    mounted () {
      this.$EventBus.$on('getBATButtonClicked', this.showModal)
    }
  }
</script>

<style scoped>
  .money {
      font-weight: bold;
  }
  #warning {
      font: 30px/1.2 'Oleo Script', Helvetica, sans-serif;
      text-align: center;
      margin-top: 20px;
  }
</style>

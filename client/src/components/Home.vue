<template>
    <div class="home">
        <div v-if="!web3.web3Instance">
            <h1 class="page-title2">Sync with metamask . . .</h1>
            <pacman-loader color="red" class="loader"/>
        </div>
        <div v-else-if="!user.type">
            <!-- spinning -->
            <h1 class="page-title2">Loading user info from your account . . .</h1>
            <pacman-loader color="red" class="loader"/>
        </div>
        <div v-else-if="user.type === 'Artist'">
            <h1 class="page-title">Welcome To MP3Bay</h1>
            <hr class="page-border">

            <!--<img v-if="user.artistID"-->
                 <!--:src="artistPicURL" alt="">-->
            <b-card :title="user.name"
                    :img-src="user.pictureHost"
                    img-alt="Image"
                    img-top
                    tag="article"
                    class="mb-2"
                    id="card-section">
                <p id="card-text">
                    <!-- TODO: 길어지면 ... 표시 -->
                    {{ user.description }}
                </p>
            </b-card>
        </div>
        <div v-else>
            <h1 class="page-title">Welcome To MP3Bay</h1>
                <hr class="page-border">
                <li class="page-title3">Name: {{ user.name }}</li>
                <li class="page-title3">Wallet: {{ web3.coinbase }}</li>
                <li class="page-title3">ETH Balance: {{ this.computeEther.toFixed(3) }} ETH</li>
                <li class="page-title3">BAT Balance: {{ web3.batBalance }} BAT</li>
        </div>
        <!--<button @click="foo">here</button>-->
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import PulseLoader from 'vue-spinner/src/PulseLoader'
  import PacmanLoader from 'vue-spinner/src/PacmanLoader'
  import { blockEvent } from '../utils'
  import config from '../config'
  export default {
    name: 'home',
    data () {
      return {
        pictureHost: '',
        description: ''
      }
    },
    components: {
      PacmanLoader,
      PulseLoader
    },
    // methods: {
    //   async foo () {
    //     const filter = {
    //       songID: [],
    //       artistAcc: this.web3.coinbase
    //     }
    //     const result = await blockEvent.getEventsFromBlock('SongSelling', filter)
    //     console.log(result)
    //   }
    // },
    computed: {
      ...mapState({
        web3: state => state.blockSync.web3,
        user: state => state.user,
        apiHost: state => state.apiHost
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
      ]),
      computeEther () {
        let ether = this.web3.balance
        for (let i = 0; i < 18; i++)
          ether = ether / 10
        return ether
      },
      // data 속성에서 computed 속성으로 옮기니 해결됐음 이유 알아보기
      // err message: Property or method is not defined on the instance but referenced during render
      artistPicURL () {
        return `${config.API_HOST}/artist/load-picture?id=${this.user.artistID}`
      }
    },
    async mounted() {
      setTimeout(() => {
        if (!this.user.type && this.web3.web3Instance) {
          alert('Cannot Find You!\nYou Can Register now.')
        }
      }, 5000)
    }
  }
</script>

<style scoped>

    #card-section{
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
        width: 500px;
        /*position: absolute;*/
        top:0;
        bottom: 0;
        left: 0;
        right: 0;

        margin: auto auto auto auto;
    }
    #card-text {
        font-family: 'Nanum Myeongjo';
        font-size: 18px;
        font-weight: bold;
    }
    /* TODO: class명 바꾸기 */
    .page-title {
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    .page-title2 {
        font: 25px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    .page-title3 {
        font: 25px/1.2 'Slabo 27px', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
    }
    .page-border {
        border-color: red;
    }
    .loader {
        width: 100px;
        height: 100px;

        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;

        margin: 250px auto auto auto;
    }
</style>

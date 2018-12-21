<template>
    <!-- toggleable이 있어야 dropdown이 정상적으로 동작 -->
    <!-- size 조절 시 b-collapse 사라지는 문제 -->
    <div>
        <b-navbar toggleable="md" variant="danger" type="light">
            <b-navbar-brand class="home-link-button" :to="{ name: 'home' }">MP3Bay</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <div v-if="web3.web3Instance">
                    <b-navbar-nav v-if="!user.type">
                        <b-nav-item :to="{ name: 'register-artist' }">Register Artist</b-nav-item>
                        <b-nav-item :to="{ name: 'register-listener' }">Register Listener</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav v-else-if="user.type === 'Listener'">
                        <b-nav-item :to="{ name: 'artists' }">Artists</b-nav-item>
                        <b-nav-item :to="{ name: 'artists' }">Flee Market</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav v-else>
                        <b-nav-item :to=" { name: 'register-song' } ">Register Song</b-nav-item>
                        <b-nav-item :to=" { name: 'register-song' } ">Revenue</b-nav-item>
                    </b-navbar-nav>
                </div>

                <b-navbar-nav v-if="web3.web3Instance" class="ml-auto">
                    <b-nav-form>
                        <b-button size="sm"
                                  variant="outline-dark"
                                  class="nav-button"
                                  @click="triggerGetBAT">
                            Get BAT
                        </b-button>
                    </b-nav-form>

                    <b-nav-form>
                        <b-button size="sm"
                                  variant="outline-dark"
                                  class="nav-button"
                                  @click="triggerWithdraw">
                            Withdraw
                        </b-button>
                    </b-nav-form>
                    <b-nav-item-dropdown text="User Info" right>
                        <b-dropdown-item>Network: {{ web3.networkID }}</b-dropdown-item>
                        <b-dropdown-item>Account: {{ web3.coinbase }}</b-dropdown-item>
                        <b-dropdown-item>Balance: {{ computeEther.toFixed(3) }} ETH</b-dropdown-item>
                        <b-dropdown-item>BAT Balance: {{ web3.batBalance }} BAT</b-dropdown-item>
                        <b-dropdown-item>type: {{ user.type }}</b-dropdown-item>
                        <b-dropdown-item>name: {{ user.name }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
            <get-bat/>
        </b-navbar>
        <div>
            <div class="container" v-if="user.type === 'Listener'">
                <h1 id="page-title" v-b-toggle.collapse1>Play List</h1>
                <b-collapse id="collapse1" class="mt-2">
                        <player/>
                </b-collapse>
            </div>
        </div>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import GetBat from './GetBat'
  import Player from './Player'
  export default {
    name: 'nav-bar',
    computed: {
      ...mapState({
        web3: state => state.blockSync.web3,
        user: state => state.user
      }),
      computeEther () {
        let ether = this.web3.balance
        for (let i = 0; i < 18; i++)
          ether = ether / 10
        return ether
      },
    },
    methods: {
      triggerGetBAT () {
        this.$EventBus.$emit('getBATButtonClicked')
      },
      triggerWithdraw () {
        this.$EventBus.$emit('withdrawButtonClicked')
      }
    },
    components: {
      GetBat,
      Player
    }
  }
</script>

<style>
    .home-link-button {
        font-weight: bold;
    }
    #page-title {
        font: 18px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: right;
        margin-top: 20px;
    }
    .nav-button {
        margin: 3px;
    }
</style>

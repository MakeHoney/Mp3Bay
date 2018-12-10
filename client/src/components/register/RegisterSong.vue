<template>
    <div class="artist-profile">
        <h1 id="page-title">Register Song</h1>
        <hr id="page-border">
        <li id="artist-name">Artist Name: {{ name }}</li>
        <li id="artist-wallet">Wallet: {{ account }}</li>
        <modal id="register-button"/>
    </div>
</template>

<script>
import Modal from './Modal.vue'
import { mapState } from 'vuex'
import { RouteHelper } from '../../router/helpers'
export default {
    data() {
        return {
            name: '',
            account: ''
        }
    },
    computed: {
        ...mapState('blockSync', [
            'web3'
        ])
    },
    components: {
        Modal
    },
    async mounted() {
        let { name } = await RouteHelper.getArtistInfoByArtistAcc(this.web3.coinbase)

        this.account = this.web3.coinbase
        this.name = name
    }
}
</script>

<style scoped>
    #page-title {
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    #page-border {
        border-color: red;
    }
    #artist-name, #artist-wallet {
        font: 20px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    #register-button {
        text-align: center;
        margin: 30px;
    }
</style>

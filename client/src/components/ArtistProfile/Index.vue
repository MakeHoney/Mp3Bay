<template>
    <div class="artist-profile">
        <h1>This is Profile Page for artist.</h1>
        <artist-info :name="name" :account="account"/>
        <modal/>
    </div>
</template>

<script>
import ArtistInfo from './ArtistInfo.vue'
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
        ArtistInfo,
        Modal
    },
    async mounted() {
        let { name } = await RouteHelper.getArtistInfoByArtistAcc(this.web3.coinbase)

        this.account = this.web3.coinbase
        this.name = name
    }
}
</script>

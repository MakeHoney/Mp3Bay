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
import { RouteHelper } from '../../router/helpers'
export default {
    data() {
        return {
            name: '',
            account: ''
        }
    },
    components: {
        ArtistInfo,
        Modal
    },
    async mounted() {
        let { name } = await RouteHelper.getArtistInfoByArtistAcc(this.$store.state.web3.coinbase)

        this.account = this.$store.state.web3.coinbase
        this.name = name
    }
}
</script>

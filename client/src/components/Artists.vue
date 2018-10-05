<template>
    <div class="artists">
        <h1>This page will show the list of registerd artists</h1>
        <div v-for="(name, index) in namesOfArtists" :key="name.id">
            <router-link :to="{name: 'artist', params: {id: index}}">{{ name }}</router-link>
        </div>
    </div>
</template>

<script>
import store from '../store'

export default {
    name: 'artists',
    data() {
        return {
            allArtistsAddr: [],
            namesOfArtists: []
        }
    },
    computed: {
        contractMethods() {
            return this.$store.state.contractInstance().methods
        }
    },
    methods: {
        async setArtistData() {
            this.allArtistsAddr = await this.contractMethods.getAllArtistAddrs().call()
            for(let i = 0; i < this.allArtistsAddr.length; i++) {
                this.namesOfArtists.push(await this.contractMethods.getArtistNameByIndex(i).call())
            }
        }
    },
    async beforeRouteEnter(to, from, next) {
        if(store.state.artists.addresses === null) {
            await store.dispatch('getContractInstance')
            await store.dispatch('getArtistAddresses')
            await store.dispatch('getArtistNames')
        }
        next(vm => {
            vm.allArtistsAddr = store.state.artists.addresses
            vm.namesOfArtists = store.state.artists.names
        })
    }
}
</script>

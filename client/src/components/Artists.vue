<template>
    <div class="artists">
        <h1>This page will show the list of registerd artists</h1>
        <button @click="getArtist">check</button>
        <div v-if="allArtistsAddr.length === namesOfArtists.length">
            <li v-for="name in namesOfArtists" :key="name.id">{{ name }}</li>
        </div>
        <div v-else>
            <li>loading...</li>
        </div>
    </div>
</template>

<script>
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
        async getArtist() {
            this.allArtistsAddr = await this.contractMethods.getAllArtistAddrs().call()
            for(let i = 0; i < this.allArtistsAddr.length; i++) {
                this.namesOfArtists.push(await this.contractMethods.getArtistNameByIndex(i).call())
            }

            console.log(this.namesOfArtists)
        }
    },
    mounted() {
        console.log('dispatching getContractInstance')
        this.$store.dispatch('getContractInstance')
    }
}
</script>

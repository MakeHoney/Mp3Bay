<template>
    <div class="artists">
        <h1>This page will show the list of registerd artists</h1>
        <!-- <button @click="setArtistData">check</button> -->
        <div v-if="allArtistsAddr.length === namesOfArtists.length">
            <div v-for="(name, index) in namesOfArtists" :key="name.id">
                <router-link :to="{name: 'artist', params: {id: index}}">{{ name }}</router-link>
            </div>
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
        async setArtistData() {
            this.allArtistsAddr = await this.contractMethods.getAllArtistAddrs().call()
            for(let i = 0; i < this.allArtistsAddr.length; i++) {
                this.namesOfArtists.push(await this.contractMethods.getArtistNameByIndex(i).call())
            }
        }
    },
    // watch 속성 사용하여 가수 등록시 자동 refresh?
    mounted() {
        console.log('dispatching getContractInstance')
        this.$store.dispatch('getContractInstance')
        this.setArtistData()
    }
}
</script>

<template>
    <div class="artists">
        <h1>This page will show the list of registerd artists</h1>
        <div v-for="(name, index) in namesOfArtists" :key="name.id">
            <router-link :to="{name: 'artist', params: { id: index, name: name }}">{{ name }}</router-link>
        </div>
    </div>
</template>

<script>
import store from '../store/index'
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

    },
    mounted() {
        this.allArtistsAddr = this.$store.state.artists.addresses
        this.namesOfArtists = this.$store.state.artists.names
    }
}
</script>

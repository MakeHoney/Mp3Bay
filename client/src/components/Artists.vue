<template>
    <div class="artists">
        <h1>This page will show the list of registerd artists</h1>
        <div v-for="(name, index) in namesOfArtists" :key="name.id">
            <router-link :to="{name: 'artist', params: { id: index, name: name }}">{{ name }}</router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'artists',
        data() {
            return {
                allArtistsAddr: [],
                namesOfArtists: []
            }
        },
        computed: {
            ...mapState({
                contractInstance: state => state.blockSync.contractInstance,
                artists: state => state.artists
            }),
            contractMethods() {
                return this.contractInstance().methods
            }
        },
        methods: {

        },
        mounted() {
            this.allArtistsAddr = this.artists.addresses
            this.namesOfArtists = this.artists.names
        }
    }
</script>

<template>
    <div class="artists">
        <h1>This page will show the list of registered artists</h1>
        <!--<div v-for="(name, index) in namesOfArtists" :key="name.id">-->
            <!--<router-link :to="{name: 'artist', params: { id: index, name: name }}">{{ name }}</router-link>-->
        <!--</div>-->
        <div>
            <b-card-group deck class="mb-3">
                <b-card title="Zico"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        Zico는 래퍼이다.
                    </p>
                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
            </b-card-group>

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

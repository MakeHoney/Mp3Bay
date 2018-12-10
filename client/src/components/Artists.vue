<template>
    <div class="artists">
        <h1 id="page-title">Artists Registered</h1>
        <hr id="page-border">
        <div>
            <b-card-group columns>
                <template v-for="idx in artists.length">
                    <artist class="artist-elem"
                            :name="artists[idx - 1].name"
                            :artistID="artists[idx - 1].artistID"
                            :key="idx"/>
                </template>
            </b-card-group>
        </div>
        <artist-detail/>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import ArtistDetail from './ArtistDetail'
  import Artist from '@/components/Artist'
  export default {
    name: 'artists',
    computed: {
      ...mapState([
        'artists',
        'apiHost'
      ]),
    },
    methods: {

    },
    components: {
      Artist,
      ArtistDetail
    },
    async beforeCreate() {
      await this.$store.dispatch('getArtists')
    }
  }
</script>

<style scoped>
    .artist-elem {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transition: all 0.1s ease-in-out;
    }
    .artist-elem:hover {
        transform: scale(1.03);
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -ms-transform: scale(1.03);
        -o-transform: scale(1.03);
    }
    #page-title {
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    #page-border {
        border-color: red;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

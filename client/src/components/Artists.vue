<template>
    <div class="artists">
        <h1>This page will show the list of registered artists</h1>
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
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Artist from '@/components/Artist'
  export default {
    name: 'artists',
    data() {
      return {
      }
    },
    computed: {
      ...mapState([
        'artists',
        'apiHost'
      ]),
      iteration () {
        this.artists.length
      }
    },
    methods: {

    },
    components: {
      Artist
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
</style>

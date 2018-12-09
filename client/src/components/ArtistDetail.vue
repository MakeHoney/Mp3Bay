<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="Artist Detail">
            <div class="d-block text-left">
                <p><img :src="pictureHost" id="artist-pic" alt="artist picture"/></p>
                <h1>{{ name }}</h1>
                <hr>
                <h5>{{ description }}</h5>

                <!-- song list -->
                <!--{{ songList }}-->
                <hr>
                <h3>Track</h3>
                <div v-for="song in songList">
                    <p><a href="#">{{ song.title }}</a></p>
                </div>
            </div>
            <!--<b-btn class="mt-3" variant="outline-danger" block @click="submitUploadForm">등록</b-btn>-->
        </b-modal>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        name: '',
        description: '',
        pictureHost: '',
        artistID: '',
        songList: []
      }
    },
    computed: {
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    },
    methods: {
      async triggerDetailModal ({ name, description, pictureHost, artistID }) {
        this.songList.length = 0

        this.name = name
        this.description = description
        this.pictureHost = pictureHost
        this.artistID = artistID
        const songIDList = await this.contractMethods.getSongIDsByArtistID(artistID).call()
        songIDList.forEach(async songID => {
          const song = await this.contractMethods
            .getSongBySongID(songID).call()
          this.songList.push({ songID, title: song.title })
        })
        this.$refs.createForm.show()
      }
    },
    mounted () {
      this.$EventBus.$on('detailButtonClicked', this.triggerDetailModal)
    }
  }
</script>
<style scope>
    #artist-pic {
        max-width: 30rem;
    }
</style>

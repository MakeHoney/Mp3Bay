<template>
    <b-card :title="name"
            :img-src="pictureHost"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2">
        <p class="card-text">
            <!-- 길어지면 ... 표시 -->
            {{description}}
        </p>
        <b-button variant="danger" @click="triggerArtistDetail">Song List</b-button>
    </b-card>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        description: '',
        pictureHost: ''
      }
    },
    computed: {
      ...mapState([
        'artists',
        'apiHost'
      ])
      // pictureHost() {
      //   return `${this.apiHost}/artist/load-picture?id=${this.artistID}`
      // }
    },
    methods: {
      triggerArtistDetail () {
        this.$EventBus.$emit('detailButtonClicked', {
          name: this.name,
          description: this.description,
          pictureHost: this.pictureHost,
          artistID: this.artistID
        })
      }
    },
    props: {
      artistID: {
        type: String
      },
      name: {
        type: String
      }
    },
    async mounted () {
      const url = `${this.apiHost}/artist/load-user-description?id=${this.artistID}`
      const { data } = await this.$axios.get(url)
      this.pictureHost = `${this.apiHost}/artist/load-picture?id=${this.artistID}`
      this.description = data.description
    }
  }
</script>

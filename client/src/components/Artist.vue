<template>
    <transition name="router-anim" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
        <b-card :title="name"
                :img-src="pictureHost"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2"
                id="card-section">
            <p id="card-text">
                <!-- TODO: 길어지면 ... 표시 -->
                {{description}}
            </p>
            <b-button variant="danger" @click="triggerArtistDetail">Detail</b-button>
        </b-card>
    </transition>
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
<style scoped>
    @import url("http://fonts.googleapis.com/css?family=Oleo+Script");
    @import url("http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css");
    #card-section{
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
    }
    #card-text {
        font-family: 'Nanum Myeongjo';
        font-size: 18px;
        font-weight: bold;
    }
</style>

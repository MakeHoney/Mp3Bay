<template>
    <b-card :title="name"
            :img-src="pictureHost"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2">
        <p class="card-text">
            Zico는 래퍼이다.
        </p>
        <b-button href="#" variant="danger">Go somewhere</b-button>
    </b-card>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState([
        'artists',
        'apiHost'
      ]),
      pictureHost() {
        return `${this.apiHost}/artist/load-picture?id=${this.artistID}`
      }
    },
    props: {
      artistID: {
        type: String
      },
      name: {
        type: String
      }
    }
  }
</script>

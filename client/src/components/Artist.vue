<template>
    <b-card title="Zico"
            img-src="http://localhost:8888/music/load?id=0"
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
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        name: this.$route.params.name
      }
    },

  }
</script>


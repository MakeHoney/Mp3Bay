<template>
    <div>
        <h1 class="page-title">Flee Market</h1>
        <post-modal/>
        <hr class="page-border">

        <div>
            <template v-for="post in posts">
                <post :postInfo="post"></post>
            </template>
        </div>
    </div>
</template>

<script>
  import Post from './Post'
  import PostModal from './PostModal'
  import { mapState } from 'vuex'
  export default {
    name: 'flee-market',
    components: {
      Post,
      PostModal
    },
    computed: {
      ...mapState([
        'posts'
      ])
    },
    async created () {
      await this.$store.dispatch('getPosts')
    }
  }
</script>

<style scoped>
    .page-title {
        font: 50px/1.2 'Oleo Script', Helvetica, sans-serif;
        text-align: center;
        margin-top: 20px;
    }
    .page-border {
        border-color: red;
    }
</style>

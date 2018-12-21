<template>
    <div>
        <h1 class="page-title">Flee Market</h1>
        <hr class="page-border">
        <button @click="foo">Post</button>

        <div>
            <post></post>
            <post></post>
            <post></post>
        </div>
    </div>
</template>

<script>
  import Post from './Post'
  import { blockEvent } from '../../utils'
  export default {
    name: 'flee-market',
    components: {
      Post
    },
    methods: {
      async foo() {
        // const events = await blockEvent.getEventsFromBlock('ListenerCreated')
        // const result = await blockEvent.getDataFromEvents('ListenerCreated', events)
        // console.log(result)
        await this.$store.dispatch('getPosts')
      }
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

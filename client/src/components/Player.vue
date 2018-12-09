<template>
    <div class="player">
        <h1 id="page-title">My Play List</h1>
        <hr id="page-border">
        <aplayer autoplay
                 class="bar"
                 :music="list[0]"
                 :list="list"
                 theme="red"
        />
    </div>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  Aplayer.disableVersionBadge = true
  export default {
    name: 'player',
    data() {
      return {
        list: [
          {
            title: 'Artist',
            artist: 'Zico',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            pic: 'http://localhost:8888/artist/load-picture?id=3'
          },
          {
            title: 'Artist',
            artist: 'Zico',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            pic: 'http://localhost:8888/artist/load-picture?id=3'
          },
          {
            title: 'Artist',
            artist: 'Zico',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            pic: 'http://localhost:8888/artist/load-picture?id=3'
          },
        ]
      }
    },
    components: {
      Aplayer
    }
  }
</script>

<style scoped>
    #page-title {
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    #page-border {
        border-color: red;
    }
</style>

<template>
    <div class="home">
        <div v-if="!web3.web3Instance">
            <h1>메타마스크 로그인을 해주세요!</h1>
        </div>
        <div v-else-if="!user.type">
            <h1>등록을 해주세요!</h1>
        </div>
        <div v-else>
            <h1>환영합니다!</h1>
            <img src="http://localhost:8888/artist/load-picture?id=0" alt="">
            <button @click="foo">push</button>
        </div>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'home',
    data () {
      return {

      }
    },
    methods: {
      async foo () {
        const url = 'http://localhost:8888/artist/load-picture'
        const { id } = await this.contractMethods.getArtistByAcc(this.web3.coinbase).call()
        await this.$axios.get(`${url}?id=${id}`)
      }
    },
    computed: {
      ...mapState({
        web3: state => state.blockSync.web3,
        user: state => state.user
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    }
  }
</script>

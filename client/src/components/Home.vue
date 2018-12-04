<template>
    <div class="home">
        <div v-if="!web3.coinbase">
            <h1>메타마스크 로그인을 해주세요!</h1>
        </div>
        <div v-else-if="!user.type">
            <h1>등록을 해주세요!</h1>
        </div>
        <div v-else>
            <h1>환영합니다!</h1>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'home',
    data () {
      return {

      }
    },
    // 로그인만 안한경우
    // 메타마스크가 설치안된경우
    computed: {
      ...mapState({
        web3: state => state.blockSync.web,
        user: state => state.user
      })
    }
  }
</script>

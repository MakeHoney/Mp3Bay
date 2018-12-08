<template>
    <div class="home">
        <div v-if="!web3.web3Instance">
            <h1>메타마스크 로그인을 해주세요!</h1>
        </div>
        <div v-else-if="!user.type">
            <h1>등록을 해주세요!</h1>
        </div>
        <div v-else-if="user.type === 'Artist'">
            <h1>환영합니다!</h1>
            <img v-if="user.artistID"
                 :src="artistPicURL" alt="">
        </div>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import config from '../config'
  export default {
    name: 'home',
    data () {
      return {
        // artistPicURL: `http://localhost:8888/artist/load-picture?id=${this.user.artistID}`
      }
    },
    computed: {
      ...mapState({
        web3: state => state.blockSync.web3,
        user: state => state.user
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
      ]),
      // data 속성에서 computed 속성으로 옮기니 해결됐음 이유 알아보기
      // err message: Property or method is not defined on the instance but referenced during render
      artistPicURL () {
        return `${config.API_HOST}/artist/load-picture?id=${this.user.artistID}`
      }
    }
  }
</script>

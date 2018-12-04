<template>
    <div class="register-artist">
        <div>
            <h1>아티스트 등록</h1>
            <p>요금: 0.23 dollars</p>
            <span>
                <label for="artist-name">가수명 </label>
                <input v-model="artistName" type="text" id="artist-name">
            </span>
            <span>
                <button @click="registerArtist">등록</button>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'register-artist',
        data() {
            return {
                artistName: ''
            }
        },
        computed: {
            ...mapState('blockSync', [
                'contractInstance'
            ]),
            // computed 코드 중복도 낮추기 -> mixin or this.$root 사용하여
            contractMethods() {
                return this.contractInstance().methods
            }
        },
        methods: {
            doRegister(event) {
                this.isButtonClicked = true
            },


            registerArtist (event) {
                this.contractMethods.registerArtist(this.artistName).send({
                    gas: 1000000,
                    value: 0,
                    from: this.$store.state.web3.coinbase
                }, async (err, result) => {
                    if (err) {
                        console.log('error occurred', err)
                    } else {
                        await this.$store.dispatch('getArtistAddresses')
                        this.$store.state.artists.isThereNew = true
                    }
                })
            }


        },
        mounted() {
            // console.log('dispatching getContractInstance')
            // this.$store.dispatch('blockSync/getContractInstance')
        }
    }
</script>

<template>
    <div class="register-artist">
        <h1>This is page for registering artist</h1>
        <input v-model="artistName" type="text">
        <button @click="registerArtist">submit</button>
    </div>
</template>

<script>
export default {
    name: 'register-artist',
    data() {
        return {
            artistName: ''
        }
    },
    computed: {
        // computed 코드 중복도 낮추기 -> mixin or this.$root 사용하여
        contractMethods() {
            return this.$store.state.contractInstance().methods
        }
    },
    methods: {
        registerArtist (event) {
            this.contractMethods.registerArtist(this.artistName).send({
                gas: 1000000,
                value: 0,
                from: this.$store.state.web3.coinbase
            }, async (err, result) => {
                if (err) {
                    console.log('error occured', err)
                } else {
                    await this.$store.dispatch('getArtistAddresses')
                    this.$store.state.artists.isThereNew = true
                }
            })
        }
    },
    mounted() {
        console.log('dispatching getContractInstance')
        this.$store.dispatch('getContractInstance')
    }
}
</script>

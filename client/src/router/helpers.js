import store from '@/store'

export const RouteHelper = {
    async setBasicInform() {
        if(!store.state.contractInstance) await store.dispatch('getContractInstance')
        if(!store.state.web3.isInjected) {
            console.log(store.state.web3.isInjected)
            await store.dispatch('registerWeb3')
        }
    },
    async beforeArtists() {
        /**
         * TODO: contract listener 만들어서 동기화 문제 해결하기 (Origin Protocol 참고)
         **/
        await store.dispatch('getArtistAddresses')

        if(
            store.state.artists.isThereNew
        ) {
            await store.dispatch('getArtistNames')
            store.state.artists.isThereNew = false
        }
    }
}
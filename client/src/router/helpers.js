import store from '@/store'

/**
 * TODO: Class로 선언하기
 */

export const RouteHelper = {
    async setBasicInform() {
        if(!store.state.contractInstance) await store.dispatch('getContractInstance')
        // isInjected로 하면 계속 값이 undefined로 바뀜 listening이라 그런 것 같음.
        if(!store.state.web3.coinbase) {
            await store.dispatch('registerWeb3')
        }
    },
    async beforeArtists() {
        // store object(artists) init
        if(!store.state.artists.addresses) {
            await store.dispatch('getArtistAddresses')
            await store.dispatch('getArtistNames')
        }

        let artists = await store.state.contractInstance().methods.getAllArtistAddrs().call()
        let artistNumFromContract = artists.length
        let artistNumFromStore = store.state.artists.addresses.length

        if(artistNumFromContract !== artistNumFromStore) {
            await store.dispatch('getArtistAddresses')
            await store.dispatch('getArtistNames')
        }
    }
}
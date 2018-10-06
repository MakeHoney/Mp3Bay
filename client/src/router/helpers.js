import store from '@/store'

export const RouteHelper = {
    async beforeArtists() {
        if(store.state.artists.addresses === null) {
            await store.dispatch('getContractInstance')
            await store.dispatch('getArtistAddresses')
            await store.dispatch('getArtistNames')
        }
    }
}
import store from '@/store'

/**
 * TODO: define it as a class
 */

export const RouteHelper = {
    async setBasicInform() {
        // setting for contract and connection to user account
        if(!store.state.blockSync.contractInstance) await store.dispatch('blockSync/getContractInstance')
        if(!store.state.blockSync.web3.coinbase) {
            await store.dispatch('blockSync/checkWeb3')
        }
    },
    async beforeArtists() {
        // store object(artists) init
        if(!store.state.artists.addresses){
            await store.dispatch('getArtistAddresses')
        }

        if(!store.state.artists.names) {
            await store.dispatch('getArtistNames')
        }

        let artists = await store.state.blockSync.contractInstance().methods.getAllArtistsAddrs().call()

        /**
         * check the page whether it keeps up-to-date on the number of artists
         * by comparing the number of artists from contract with that of store
         */
        let artistNumFromContract = artists.length
        let artistNumFromStore = store.state.artists.addresses.length

        // if not, update it
        if(artistNumFromContract !== artistNumFromStore) {
            await store.dispatch('getArtistAddresses')
            await store.dispatch('getArtistNames')
        }
    },
    async getArtistInfoByArtistAcc(artistAccount) {
        return await store.state.blockSync.contractInstance().methods.getArtistByArtistAcc(artistAccount).call()
    }
}

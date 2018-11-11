import store from '@/store'

/**
 * TODO: Class로 재정의하기
 * const로 정의하면 안될듯?3
 */

export const CheckPerson = {
    async isArtist() {
        let flag
        let contractMethods = store.getters['blockSync/contractMethods']
        let userAccount = store.state.blockSync.web3.coinbase
        // let userAccount = localStorage.getItem('coinbase')
        try {
            let artistAddr = await contractMethods.accountToArtistAddr(userAccount).call()
            artistAddr === '0x0000000000000000000000000000000000000000'
                ? flag = false
                : flag = true
            return flag
        } catch (err) {
            console.error('error in checkPerson', err)
        }
    },
    async isListener() {
        let flag
        let contractMethods = store.getters['blockSync/contractMethods']
        let userAccount = store.state.blockSync.web3.coinbase
        // let userAccount = localStorage.getItem('coinbase')
        try {
            let listenerAddr = await contractMethods.accountToListenerAddr(userAccount).call()
            listenerAddr === '0x0000000000000000000000000000000000000000'
                ? flag = false
                : flag = true
            return flag
        } catch (err) {
            console.error('error in checkPerson', err)
        }
    },
    async userType () {
        if (!(await this.isArtist()) && !(await this.isListener())) return null
        else if (await this.isArtist()) return 'Artist'
        else return 'Listener'
    }
}

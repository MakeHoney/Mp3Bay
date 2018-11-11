import store from '@/store'

/**
 * TODO: Class로 재정의하기
 * const로 정의하면 안될듯?3
 */

export const CheckPerson = {
    async isArtist() {
        for(let i = 0; i < 100000000; i++) {}
        let contractMethods = store.getters['blockSync/contractMethods']
        let userAccount = store.state.blockSync.web3.coinbase
        try {
            await contractMethods.accountToArtistAddr(userAccount).call()
            return true
        } catch (err) {
            return false
        }
    },
    async isListener() {
        for(let i = 0; i < 100000000; i++) {}
        let flag
        let contractMethods = store.getters['blockSync/contractMethods']
        let userAccount = store.state.blockSync.web3.coinbase
        let listenerAddr = await contractMethods.accountToListenerAddr(userAccount).call()
        listenerAddr === '0x0000000000000000000000000000000000000000'
        ? flag = false
        : flag = true
        return flag
    },
    async userType () {
        console.log('hi')

        if (!(await this.isArtist()) && !(await this.isListener())) {
            console.log('here')
            return null
        }
        else if (await this.isArtist()) {
            console.log('here2')
            return 'artist'
        }
        else if (await this.isListener()) {
            console.log('here3')
            return 'listener'
        }
        else {
            console.log('here3')
            return 'ful'
        }
    }
}

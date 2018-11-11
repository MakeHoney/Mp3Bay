import store from '@/store'

/**
 * TODO: Class로 재정의하여 contractMethod, userAccount, flag 등 class 변수로 재사용하기
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
        if (!(await this.isArtist()) && !(await this.isListener())) {
            return null
        }
        // router helper와 같은 메소드를 사용함 --> 라이브러리 따로 만들어서 코드 재사용융 높이기
        else if (await this.isArtist()) {
            let contractMethods = store.getters['blockSync/contractMethods']
            let userAccount = store.state.blockSync.web3.coinbase
            // solidity에서 return value 2개 이상일시 destructuring assignment로 받는 것인지 확인하기
            let { name } = await contractMethods.getArtistByAcc(userAccount).call()
            // store.state.user.address는 어디서 초기화 할지 생각 // 해당 프로퍼티가 필요한지도 생각
            store.state.user.name = name
            return 'Artist'
        }
        else {
            let contractMethods = store.getters['blockSync/contractMethods']
            let userAccount = store.state.blockSync.web3.coinbase
            let name = await contractMethods.getListenerByAcc(userAccount).call()
            store.state.user.name = name
            return 'Listener'
        }
    }
}

import store from '@/store'

/**
 * TODO: Class로 재정의하기
 * const로 정의하면 안될듯?3
 */

export const CheckPerson = {
    async isArtist() {
        let flag
        let contractMethods = store.state.blockSync.contractInstance().methods
        let userAccount = store.state.blockSync.web3.coinbase
        let artistAddr = await contractMethods.accountToArtistAddr(userAccount).call()
        artistAddr === '0x0000000000000000000000000000000000000000'
        ? flag = false
        : flag = true

        return flag
    }
}

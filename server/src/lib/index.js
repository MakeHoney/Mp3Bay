import IpfsService from './ipfs/ipfs-service'

class Lib {
    constructor() {
        this.ipfsService = new IpfsService()
    }
}

export default Lib

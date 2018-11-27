import http from 'http'
import { utils } from '../../utils'

export const controller = {
  // song id를 받아서 블록에서 조회(emitter) ipfshash를 통해서 ipfs load
  async loadMusic (req, res) {
    try {
      const contract = await utils.getContract
      const events = await contract.getPastEvents('SongCreated', {
        fromBlock: 0,
        toBlock: 'latest'
      })

      console.log(events)

      const foo = await utils.lib.ipfsService.loadFile('QmWx16SWKaTFp4WDNYvRxru8wmJp8LWF4Pg6PAtbHBSk32')
      console.log(foo)
      res.json({
        foo
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}

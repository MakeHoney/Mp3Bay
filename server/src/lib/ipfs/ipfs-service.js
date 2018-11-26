import fetch from 'cross-fetch'
import MapCache from 'map-cache'
import FormData from 'form-data'
import { IPFS_CONST } from './constants'

/**
 * reason for using async function: to use try catch
 **/

class IpfsService {
  constructor() {
    this.gateway = IPFS_CONST.gateway
    this.api = IPFS_CONST.api
    this.mapCache = new MapCache()
  }

  async saveObjAsFile (obj) {
    let file
    if(typeof Blob === 'undefined'){
      file = Buffer.from(JSON.stringify(obj))
    } else {
      file = new Blob([JSON.stringify(obj)])
    }

    const ipfsHash = await this.saveFile(file)


    // Caching
    this.mapCache.set(ipfsHash, obj)

    return ipfsHash
  }

  async saveFile (file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const rawRes = await fetch(`${this.api}/api/v0/add`, {
        method: 'POST',
        body: formData
      })

      const result = await rawRes.json()
      return result.Hash
    } catch (err) {
      throw console.error('Failure to submit file to IPFS', err)
    }
  }

  async loadObjFromFile (ipfsHash) {
    if(this.mapCache.has(ipfsHash)) {
      return this.mapCache.get(ipfsHash)
    }
    const response = await this.loadFile(ipfsHash)
    const obj = response.json()
    this.mapCache.set(ipfsHash, obj)
    return obj
  }

  async loadFile (ipfsHash) {
    try {
      return await fetch(this.getewayUrlForHash(ipfsHash))
    } catch (err) {
      throw console.error('Failure to get IPFS file', err)
    }
  }

  getewayUrlForHash (ipfsHashStr) {
    return `${this.gateway}/ipfs/${ipfsHashStr}`
  }
}

export default IpfsService

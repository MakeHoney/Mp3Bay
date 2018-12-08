import {utils} from "../../../../server/src/utils"

export default {
  async getEventsFromBlock (eventName, filter) {
    // filter : const filter = {songID: data(array)}
    const option = {
      fromBlock: 0,
      toBlock: 'latest'
    }
    if (filter) option.filter = filter

    const contract = await utils.getContract
    const events = await contract.getPastEvents(eventName, option)
    console.log(events)
    console.log(option)

    if(!events.length) throw new Error("Song doesn't exist")

    return events
  },
  async getDataFromEvents (eventName, events) {
    const keyLists = {
      SongCreated: [ 'songID', 'ipfsHash', 'title' ],
      ArtistCreated: [ 'artistID', 'pictureHash' ]
    }
    const keyList = keyLists[eventName].slice()
    let result = []
    for (let i in events) {
      const eventData = events[i].returnValues
      let obj = {}
      for (let j in keyList) {
        const chunk = { [keyList[j]]: eventData[keyList[j]] }
        obj = Object.assign(obj, chunk)
      }
      result.push(obj)
    }
    return result
  }
}

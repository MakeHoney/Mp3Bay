import { utils } from '../index'
export const event = {
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
    // TODO: 이하 코드 밖으로 빼기 (이벤트 종류에따라 달라짐)


    // song event에 artist 메타데이터 추가
    // let songArray = []
    // for (let i in events) {
    //   const songData = events[i].returnValues
    //   const obj = Object.assign(
    //     { songID: songData.songID },
    //     { ipfsHash: songData.ipfsHash },
    //     { title: songData.title  })
    //   songArray.push(obj)
    //   // songArray[i].data = await utils.lib.ipfsService.loadObjFromFile(songArray[i].ipfsHash)
    // }
    // console.log(songArray)
    // return songArray
    //
    // let picArray = []
    // for (let i in events) {
    //   const picData = events[i].returnValues
    //   const obj = Object.assign(
    //     { artistID: picData.artistID },
    //     { pictureHash: picData.pictureHash }
    //   )
    //   picArray.push(obj)
    // }
    // return picArray
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

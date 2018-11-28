import { utils } from '../index'

export const getEventsFromBlock = async (eventName, filter) => {
  let songArray = []
  const option = {
    fromBlock: 0,
    toBlock: 'latest'
  }

  if (filter) option.filter = filter

  const events = await utils.getContract
    .getPastEvents(eventName, option)

  // song event에 artist 메타데이터 추가
  for (let i in events) {
    const songData = events[i].returnValues
    const obj = Object.assign(
      { songID: songData.songID },
      { ipfsHash: songData.ipfsHash },
      { title: songData.title  })
    songArray.push(obj)
    songArray[i].data = await utils.lib.ipfsService.loadObjFromFile(songArray[i].ipfsHash)
  }
  console.log(songArray)
  return songArray
}

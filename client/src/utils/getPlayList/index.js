import config from "../../config"

export default async state => {
  const songIDList = await state.blockSync.contractInstance().methods
    .getSongIDsByListenerAcc().call({
      from: state.blockSync.web3.coinbase
    })
  const list = []
  songIDList.forEach(async songID => {
    const song = await state.blockSync.contractInstance().methods
      .getSongBySongID(songID).call()
    list.push({
      title: song.title,
      artist: song.artistName,
      src: `${config.API_HOST}/music/load-song?id=${songID}`,
      pic: `${config.API_HOST}/artist/load-picture?id=${song.artistID}`
    })
  })

  return list
}

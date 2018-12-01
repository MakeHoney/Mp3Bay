if (process.argv[2] && process.argv[3] && process.argv[4]) {
  const keythereum = require("keythereum")
  const datadir = process.argv[2]
  const address = process.argv[3]
  const password = process.argv[4]

  const keyObject = keythereum.importFromFile(address, datadir)
  const privateKey = keythereum.recover(password, keyObject)
  console.log(privateKey.toString('hex'))
} else {
  console.log(`usage: node keythereum.js [datadir path] [address] [password]`)
}

const express = require('express')
const router = express.Router()
const http = require('http')

let opt = {
    host: '13.209.8.64',
    port: 80,
    path: '/ipfs/QmQNj8esX8A44diPnpkdG59gtZF943LRHgyzc7EAvoZcxZ/test2.js',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

router.get('/', (req, res, next) => {
    let request = http.request(opt, response => {
        console.log("Connected")
        response.on('data', data => {
            console.log(data.toString())
            res.send(data.toString())
        })
    })
    request.end()
})

module.exports = router;

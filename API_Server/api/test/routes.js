const controller = require('./controller')
const express = require('express')
const router = express.Router()

router.get('/mp3', controller.loadMusic)

router.get('/', (req, res) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Post</title>
    </head>
    <body>
        <audio controls controlsList="nodownload">
            <source src="http://localhost:3000/test/mp3" type="audio/mpeg">
        </audio>
        <form action="/test" method="post">
            <p>테스트 : <input type="text" name="test"></p>
            <input type="submit" value="정보 넘기기">
        </form>
    </body>
    </html>`)
})

module.exports = router
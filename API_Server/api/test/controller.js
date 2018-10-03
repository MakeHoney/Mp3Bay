const http = require('http')

// GET /test
exports.loadMusic = (req, res, next) => {
    // respond로 req가 온다? 미들웨어 알아보기
    const requestFromBrowser = res.req
    const opt = {
        host: '13.209.8.64',
        port: 80,
        /* proxy server에서 url 변경하여 아래 hash가 직접적으로 안들어가게 조정하기 */
        path: '/ipfs/Qmd4i5efq2KiDMiL2ypotRsUosmLxrPpuiL6TufGjnewao/wave.mp3',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    let flag = false
    if(!requestFromBrowser.headers['accept'].includes('text')) {
        if (requestFromBrowser.headers['user-agent'].includes('Firefox')) {
            if (requestFromBrowser.headers['accept'].includes('audio')) {
                flag = true
            }
        } else if (requestFromBrowser.headers['user-agent'].includes('Chrome')) {
            if (requestFromBrowser.headers['accept'] === '*/*') {
                flag = true
            }
        }
    }
    
    if(flag) {
        let request = http.request(opt, response => {
            let chunks = []
            let body;
    
            response.on('data', chunk => {
                chunks.push(Buffer.from(chunk))
            })
    
            response.on('end', () => {
                body = Buffer.concat(chunks)
                // TODO: header 설정 middleware로 빼기
                res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
                
                res.send(body)
            })
        })
        request.end()
    } else {
        res.send('<h1>Wong Request</h1>')
    }
}
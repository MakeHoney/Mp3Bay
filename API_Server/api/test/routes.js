const Controller = {
    // GET /test
    loadMusic: (res, req) => {
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
        if(!req.headers['accept'].includes('text')) {
            if (req.headers['user-agent'].includes('Firefox')) {
                if (req.headers['accept'].includes('audio')) {
                    flag = true
                }
            } else if (req.headers['user-agent'].includes('Chrome')) {
                if (req.headers['accept'].includes('*/*')) {
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
}

export default Controller
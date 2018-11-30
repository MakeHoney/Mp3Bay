export const checkFingerprint = reqHeaders => {
  let flag = false
  if(!reqHeaders['accept'].includes('text')) {
    if (reqHeaders['user-agent'].includes('Firefox')) {
      if (reqHeaders['accept'].includes('audio')) {
        flag = true
      }
    } else if (reqHeaders['user-agent'].includes('Chrome')) {
      if (reqHeaders['accept'] === '*/*') {
        flag = true
      }
    }
  }

}

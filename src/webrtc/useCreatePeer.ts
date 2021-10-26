import SimplePeer from 'simple-peer'

export default (id: string | null) => {
  if (id) {
    const peer = new SimplePeer({
    //   channelName: id,
      initiator: true,
      trickle: false,
    })
    peer.on('error', (err) => console.log('error', err))
    peer.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data))
    })

    peer.on('connect', () => {
      console.log('CONNECT')
      setInterval(() => {
        peer.send('whatever' + Math.random())
      }, 1000)
    })

    peer.on('data', (data) => {
      console.log('data: ' + data)
    })
  }
}

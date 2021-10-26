import SimplePeer from 'simple-peer'

export default (offer: string | null, id: string | null) => {
  if (offer) {
    console.log(offer)
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
    })
    peer.signal(JSON.parse(offer))

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

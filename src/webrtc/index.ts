export const init = () => {
    const localConnection: RTCPeerConnection = new RTCPeerConnection()

    localConnection.onicecandidate = (e) => {
        console.log(' NEW ice candidnat!! on localconnection reprinting SDP ')
        console.log(JSON.stringify(localConnection.localDescription))
    }

    const sendChannel = localConnection.createDataChannel('sendChannel')
    sendChannel.onmessage = (e) => console.log('messsage received!!!' + e.data)
    sendChannel.onopen = (e) => console.log('open!!!!')
    sendChannel.onclose = (e) => console.log('closed!!!!!!')

    localConnection
        .createOffer()
        .then((o) => localConnection.setLocalDescription(o))
    return localConnection
}

export let sendMessage, closeConnection

export const startWebsocketConnection = () => {
    const ws = new window.WebSocket('ws://localhost:8080/ws') || {}
    ws.onopen = () => {
        console.log('connected')
    }

    ws.onclose = (e) => {
        console.log('disconnected')
    }

    ws.onmessage = (e) => {
        onMessageCallback && onMessageCallback(e.data)
    }

    sendMessage = ws.send.bind(ws)
    closeConnection = ws.close.bind(ws)
}

let onMessageCallback
export const registerOnMessageCallback = (fn) => {
    onMessageCallback = fn
}
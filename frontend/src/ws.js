export const ws = new WebSocket('ws://localhost:9582')

export function sendMessage(msg) {
    if(ws.readyState === WebSocket.OPEN) {
        ws.send(msg)
    } else {
        ws.addEventListener("open", () => {
            ws.send(msg)
        })
    }
}

export function onMessage(callback) {
    ws.addEventListener("message", (event) => {
        const data = JSON.parse(event.data)
        callback(data)
    })
}
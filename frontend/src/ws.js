let ws = null;
let listeners = [];

function connect() {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        return ws;
    }

    ws = new WebSocket("ws://localhost:9582");

    ws.addEventListener("open", () => {
        console.log("WS connected");
    });

    ws.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        console.log("From client", data);
        listeners.forEach(cb => cb(data));
    });

    ws.addEventListener("close", () => {
        console.log("WS closed");
        setTimeout(connect, 2000);
    });

    ws.addEventListener("error", (err) => {
        console.error("WS err", err);
    });

    return ws;
}

export function sendMessage(rawmsg) {
    const msg = JSON.stringify(rawmsg);
    const socket = connect();

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(msg);
    } else {
        socket.addEventListener("open", () => socket.send(msg), { once: true });
    }
}

export function onMessage(callback) {
    listeners.push(callback);
    connect();
}

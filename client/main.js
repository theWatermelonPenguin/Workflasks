import WebSocket, {WebSocketServer} from "ws";
import searchApps from "./searchApps.js";

const wss = new WebSocketServer({port: 9582})

wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
        const parsedData = JSON.parse(data)
        if(parsedData.type === "fetchInstalledApps") {
            const apps = await searchApps()
            ws.send(JSON.stringify({ type: "installedApps", installedApps: apps}))
        }
    })
})
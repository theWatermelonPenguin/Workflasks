import chokidar from "chokidar"
import events from "../misc/events.js"

function fileCreatedTrigger(folderPath) {
    const watcher = chokidar.watch(folderPath,{
        persistent: true,
        ignoreInitial: true,
    })

    watcher.on("add", () => {
        events.emit("Trigger succeeded")
    })
}

export default fileCreatedTrigger
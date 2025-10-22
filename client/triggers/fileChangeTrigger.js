import chokidar from "chokidar"
import events from "../misc/events.js"
import path from "path"

function fileChangeTrigger(filePath) {
    const watcher = chokidar.watch(filePath, {
        persistent: true,
    })
    watcher.on("change", () => {
        events.emit("Trigger succeeded")
    })
}

export default fileChangeTrigger
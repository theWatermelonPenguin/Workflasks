import clipboardy from "clipboardy"
import events from "../misc/events.js";

let lastClipboard = '';

function clipboardChangeTrigger() {
    const intervalID = setInterval(() => {
        const currentClipboard = clipboardy.read()
        if (currentClipboard !== lastClipboard) {
            lastClipboard = currentClipboard
            events.emit("Trigger succeeded")
            clearInterval(intervalID)
    }}, 1000)
}

export default clipboardChangeTrigger

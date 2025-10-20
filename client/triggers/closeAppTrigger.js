import psList from "ps-list"
import events from "../misc/events.js";

async function closeAppTrigger(monitoredApp) {
    const intervalID = setInterval(async () => {
        const runningProcs = await psList()

        const processNames = runningProcs.map(proc => proc.name);
        if(!processNames.includes(monitoredApp)) {
            clearInterval(intervalID)
            events.emit("Trigger succeeded")
        }
        console.log(processNames)
    }, 1000)
}

export default closeAppTrigger
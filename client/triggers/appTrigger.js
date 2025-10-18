import psList from "ps-list"
import events from "../misc/events.js";

async function appTrigger(monitoredApp, appOpened) {
    const intervalID = setInterval(async () => {
        const runningProcs = await psList()

        const processNames = runningProcs.map(proc => proc.name);
        for(const app of processNames) {
            if(app === monitoredApp) {
                clearInterval(intervalID)
                events.emit("Trigger app opened")
            }
        }
        console.log(processNames)
    }, 1000)
}

export default appTrigger
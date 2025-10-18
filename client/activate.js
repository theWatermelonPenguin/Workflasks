import appTrigger from "./triggers/appTrigger.js";
import appAction from "./actions/appAction.js";
import { appFiles, knownAppLocations } from "./misc/consts.js";
import events from "./misc/events.js";

async function activate(parsedData, ws) {

    const appRelated = "app"

    let triggerType = null
    let actionType = null

    if(parsedData.trigger.includes(appRelated)) {
        triggerType = "app"
        const triggerParts = parsedData.trigger.split("app ");
        const triggerApp = triggerParts[1]
        if(appFiles.hasOwnProperty(triggerApp)) {

            const exeName = appFiles[triggerApp]

            await appTrigger(exeName)

            ws.send(JSON.stringify({ type: "success"}))
        }
    }
    if(parsedData.action.includes(appRelated)) {
        actionType = "app"
        const actionParts = parsedData.action.split("app ")
        const actionApp = actionParts[1]

        if(knownAppLocations.hasOwnProperty(actionApp)) {
            const exePath = knownAppLocations[actionApp]
            events.on("Trigger app opened", () => {
                appAction(exePath)
            })
        }
    }
}

export default activate
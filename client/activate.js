import openAppTrigger from "./triggers/openAppTrigger.js";
import appAction from "./actions/appAction.js";
import createFile from "./actions/createFile.js";
import { appFiles, knownAppLocations } from "./misc/consts.js";
import events from "./misc/events.js";
import closeAppTrigger from "./triggers/closeAppTrigger.js";

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
            if(parsedData.triggerType === "On app close") {
                await closeAppTrigger(exeName)
            } else if(parsedData.triggerType === "On app open") {
                await openAppTrigger(exeName)
                ws.send(JSON.stringify({ type: "success"}))
            }
        }
    }
    if(parsedData.action.includes(appRelated)) {
        actionType = "app"
        const actionParts = parsedData.action.split("app ")
        const actionApp = actionParts[1]

        if(knownAppLocations.hasOwnProperty(actionApp)) {
            const exePath = knownAppLocations[actionApp]
            events.on("Trigger succeeded", () => {
                appAction(exePath)
            })
        }
    } else if(parsedData.action.includes("\\")) {
        const filePath = parsedData.action
        const createFileContents = parsedData.contents
        events.on("Trigger succeeded", () => {
            createFile(filePath, createFileContents)
        })
    }
}

export default activate
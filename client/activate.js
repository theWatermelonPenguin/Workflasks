import openAppTrigger from "./triggers/openAppTrigger.js";
import openAppAction from "./actions/openAppAction.js";
import createFile from "./actions/createFileAction.js";
import { appFiles, knownAppLocations } from "./misc/consts.js";
import events from "./misc/events.js";
import closeAppTrigger from "./triggers/closeAppTrigger.js";
import closeAppAction from "./actions/closeAppAction.js";
import fileChangeTrigger from "./triggers/fileChangeTrigger.js";
import fileCreatedTrigger from "./triggers/fileCreatedTrigger.js";
import deleteFileAction from "./actions/deleteFileAction.js";
import clipboardChangeTrigger from "./triggers/clipboardChangeTrigger.js";

async function activate(parsedData) {

    if(parsedData.triggerType === "On app open") {
        const exeName = appFiles[parsedData.trigger]
        await openAppTrigger(exeName)
    } else if(parsedData.triggerType === "On app close") {
        const exeName = appFiles[parsedData.trigger]
        await closeAppTrigger(exeName)
    } else if(parsedData.triggerType === "On file save") {
        const filePath = parsedData.trigger
        fileChangeTrigger(filePath)
    } else if(parsedData.triggerType === "On file create") {
        const folderPath = parsedData.trigger
        fileCreatedTrigger(folderPath)
    } else if(parsedData.triggerType === "On clipboard change") {
        clipboardChangeTrigger()
    }

    if(parsedData.actionType === "Open app") {
        const exePath = knownAppLocations[parsedData.action]
        events.on("Trigger succeeded", () => {
            openAppAction(exePath)
        })
    } else if(parsedData.actionType === "Create file") {
        const filePath = parsedData.action
        const createFileContents = parsedData.contents
        events.on("Trigger succeeded", () => {
            createFile(filePath, createFileContents)
        })
    } else if(parsedData.actionType === "Close app") {
        const exeName = appFiles[parsedData.action]
        events.on("Trigger succeeded", () => {
            closeAppAction(exeName)
        })
    } else if(parsedData.actionType === "Delete file") {
        const filePath = parsedData.action
        events.on("Trigger succeeded", () => {
            deleteFileAction(filePath)
        })
    }
}

export default activate
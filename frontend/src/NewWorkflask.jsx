import { useState } from "react"
import { Link } from "react-router-dom"
import { onMessage, sendMessage } from "./ws.js"
import TriggerApps from "./components/TriggerApps.jsx"
import CreateFileMenu from "./components/CreateFileMenu.jsx"
import ActionApps from "./components/ActionApps.jsx"

function NewWorkflask({ apps }) {
    const [triggerType, setTriggerType] = useState(null)
    const [action, setAction] = useState(null)
    const [actionType, setActionType] = useState(null)
    const [trigger, setTrigger] = useState(null)
    const [contents, setContents] = useState(null)

    function onTriggerTypeChange(e) {
        if(e.target.value === "Select one") {
            setTriggerType(null)
        } else setTriggerType(e.target.value)
    }

    function onActionTypeChange(e) {
        if(e.target.value === "Select one") {
            setActionType(null)
        } else setActionType(e.target.value)
    }

    function onTriggerChange(e) {
        setTrigger(e.target.value)
        console.log(e.target.value)
    }

    function onActionChange(e) {
        setAction(e.target.value)
        console.log(e.target.value)
    }

    function onContentsChange(e) {
        setContents(e.target.value)
        console.log(e.target.value)
    }

    async function handleSave() {
        const payload = { trigger, action }
        const token = await window.store.get("Session Token")
        console.log(token)

        const res = await fetch("http://localhost:3000/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify(payload)
        });

        const data = await res.json()
        
        if(data.success) {
            alert("Succesfully saved")
        } else {
            alert("Something went wrong", data)
        }
    }
    
    async function handleActivate() {
        if(trigger === null || action === null) {
            alert("Trigger or action must be selected")
            return
        }

        sendMessage({ type: "activate", triggerType: triggerType, trigger: trigger, actionType: actionType, action: action, contents: contents })
        onMessage((data) => {
            console.log(data)
        })
    }

    return(
        <>
            <div className="flex h-screen">
                <div className="flex flex-col w-30 bg-neutral-100 text-white p-4 space-y-2">
                    <button className="bg-blue-700 p-4 rounded-lg w-full" onClick={handleSave}>Save</button>
                    <button className="bg-blue-700 p-4 rounded-lg w-full" onClick={handleActivate}>Activate</button>
                    <Link to="/">back</Link>
                </div>
                <div className="flex-1 flex-col p-4 space-y-2">
                    <h1>Select a trigger</h1>
                    <select name="trigger" id="triggerDropdown" className="focus:outline-none w-full" onChange={onTriggerTypeChange}>
                        <option value="Select one">Select one</option>
                        <option value="On app open">On app open</option>
                        <option value="On app close">On app close</option>
                    </select>
                    {triggerType === "On app open" ? <TriggerApps apps={apps} onTriggerChange={onTriggerChange}/> : triggerType === "On app close" ? <TriggerApps apps={apps} onTriggerChange={onTriggerChange}/> : null}
                    <h1>Select an action</h1>
                    <select onChange={onActionTypeChange} className="focus:outline-none w-full">
                        <option value="Select one">Select one</option>
                        <option value="Open app">Open app</option>
                        <option value="Close app">Close app</option>
                        <option value="Create file">Create file</option>
                    </select>
                    {actionType === "Open app" ? <ActionApps apps={apps} onActionChange={onActionChange}/> : actionType === "Create file" ? <CreateFileMenu onActionChange={onActionChange}  onContentsChange={onContentsChange}/> : actionType === "Close app" ? <ActionApps apps={apps} onActionChange={onActionChange}/> : null} 
                </div>
            </div>
        </>
    )
}

export default NewWorkflask
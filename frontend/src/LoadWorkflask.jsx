import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { onMessage, sendMessage } from "./ws.js"
import TriggerApps from "./components/TriggerApps.jsx"
import CreateFileMenu from "./components/CreateFileMenu.jsx"
import ActionApps from "./components/ActionApps.jsx"
import FilePathMenu from "./components/FilePathMenu.jsx"
import FolderPathMenu from "./components/FolderPathMenu.jsx"
import { ToastContainer, toast } from "react-toastify"

function LoadWorkflask({ apps }) {
    const location = useLocation()
    const [triggerType, setTriggerType] = useState("")
    const [action, setAction] = useState("")
    const [actionType, setActionType] = useState("")
    const [trigger, setTrigger] = useState("")
    const [contents, setContents] = useState("")
    const [title, setTitle] = useState("")
    
    const workflaskId = location.state
    useEffect(() => {
        async function obtainWorkflaskData() {
            const token = await window.store.get("Session Token")

            const res = await fetch("http://localhost:3000/api/workflask", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify({id: workflaskId})
            });

            const data = await res.json()
            console.log(data)
            setTriggerType(data.result.triggertype || "")
            setAction(data.result.action || "")
            setActionType(data.result.actiontype || "")
            setContents(data.result.contents || "")
            setTitle(data.result.title || "")
            setTrigger(data.result.trigger|| "")
        }

        obtainWorkflaskData()
    }, [workflaskId])

    function onTriggerTypeChange(e) {
        setTriggerType(e.target.value)
    }

    function onActionTypeChange(e) {
        setTriggerType(e.target.value)
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

    function onTitleChange(e){
        setTitle(e.target.value)
        console.log(e.target.value)
    }

    async function handleSave() {
        const payload = { title, triggerType, trigger, actionType, action, contents, workflaskId }
        const token = await window.store.get("Session Token")
        console.log(token)

        const res = await fetch("http://localhost:3000/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify(payload)
        });

        const data = await res.json()
        
        if(data.success) {
            toast.success("Successfully saved")
        } else {
            alert("Something went wrong", data)
        }
    }
    
    async function handleActivate() {
        if(triggerType === "" || actionType === "") {
            alert("Trigger or action must be selected")
            return
        }

        sendMessage({ type: "activate", triggerType: triggerType, trigger: trigger, actionType: actionType, action: action, contents: contents })
        toast.success("Successfully activated")
        onMessage((data) => {
            console.log(data)
        })
    }

    return(
        <>
            <div className="bg-neutral-100 flex items-center">
                <h1 className="m-0 p-2">Name</h1>
                <input type="text" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1 flex-1" value={title} onChange={onTitleChange}/>
            </div>
            <div className="flex h-screen">
                <div className="flex flex-col w-30 bg-neutral-100 text-white p-4 space-y-2">
                    <button className="bg-blue-700 p-4 rounded-lg w-full" onClick={handleSave}>Save</button>
                    <button className="bg-blue-700 p-4 rounded-lg w-full" onClick={handleActivate}>Activate</button>
                    <Link to="/">back</Link>
                </div>
                <div className="flex-1 flex-col p-4 space-y-2">
                    <h1>Select a trigger</h1>
                    <select name="trigger" id="triggerDropdown" className="focus:outline-none w-full" onChange={onTriggerTypeChange} value={triggerType}>
                        <option value="">Select one</option>
                        <option value="On app open">On app open</option>
                        <option value="On app close">On app close</option>
                        <option value="On file save">On file save</option>
                        <option value="On file create">On file create</option>
                        <option value="On clipboard change">On clipboard change</option>
                    </select>
                    {triggerType === "On app open" ? <TriggerApps apps={apps} onTriggerChange={onTriggerChange} value={trigger}/> : triggerType === "On app close" ? <TriggerApps apps={apps} onTriggerChange={onTriggerChange} value={trigger}/> : triggerType === "On file save" ? <FilePathMenu onChange={onTriggerChange}/> : triggerType === "On file create" ? <FolderPathMenu onTriggerChange={onTriggerChange}/> : null}
                    <h1>Select an action</h1>
                    <select onChange={onActionTypeChange} className="focus:outline-none w-full" value={actionType}>
                        <option value="">Select one</option>
                        <option value="Open app">Open app</option>
                        <option value="Close app">Close app</option>
                        <option value="Create file">Create file</option>
                        <option value="Delete file">Delete file</option>
                    </select>
                    {actionType === "Open app" ? <ActionApps apps={apps} onActionChange={onActionChange} value={action}/> : actionType === "Create file" ? <CreateFileMenu onActionChange={onActionChange}  onContentsChange={onContentsChange}/> : actionType === "Close app" ? <ActionApps apps={apps} onActionChange={onActionChange} value={action}/> : actionType === "Delete file" ? <FilePathMenu onChange={onActionChange} /> : null} 
                </div>
            </div>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover theme="colored"/>
        </>
    )
}

export default LoadWorkflask
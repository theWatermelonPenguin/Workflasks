import { useState } from "react"
import { Link } from "react-router-dom"

function NewWorkflask({ apps }) {
    const [trigger, setTrigger] = useState("")
    const [action, setAction] = useState("")

    function onTriggerChange(e) {
        setTrigger(e.target.value)
        console.log(e.target.value)
    }

    function onActionChange(e) {
        setAction(e.target.value)
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

    return(
        <>
            <div className="flex h-screen">
                <div className="flex flex-col w-30 bg-neutral-100 text-white p-4 space-y-2">
                    <button className="bg-blue-700 p-4 rounded-lg w-full" onClick={handleSave}>Save</button>
                    <button className="bg-blue-700 p-4 rounded-lg w-full">Activate</button>
                    <Link to="/">back</Link>
                </div>
                <div className="flex-1 flex-col p-4 space-y-2">
                    <h1>Select a trigger</h1>
                    <select name="trigger" id="triggerDropdown" className="focus:outline-none" onChange={onTriggerChange}>
                        {apps.map((app, index) => (
                            <option key={index} value={app}>
                                On {app} open
                            </option>
                        ))}
                    </select>
                    <h1>Select an action</h1>
                    <select onChange={onActionChange} className="focus:outline-none">
                        {apps.map((app, index) => (
                            <option key={index} value={app}>
                                Open {app}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default NewWorkflask
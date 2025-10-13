import { useState } from "react"

function NewWorkflask() {
    const [trigger, setTrigger] = useState("")

    function onTriggerChange(e) {
        setTrigger(e.target.value)
    }

    function handleSave() {
        
    }

    return(
        <>
            <div className="flex h-screen">
                <div className="flex flex-col w-30 bg-neutral-100 text-white p-4 ">
                    <button className="bg-blue-700 p-4 rounded-lg w-full" onClick={handleSave}>Save</button>
                </div>
                <div className="flex-1 p-4">
                    <h1>Select a trigger</h1>
                    <select name="trigger" id="triggerDropdown" className="focus:outline-none" onChange={onTriggerChange}>
                        <option value="On app open">On app open</option>
                        <option value="On this open">On this open</option>
                    </select>
                    <h1>Select an action</h1>
                    <select className="focus:outline-none">
                        <option value="Open this app">Open this app</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default NewWorkflask
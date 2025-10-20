function TriggerApps({apps, onTriggerChange}) {
    return (
        <>
            <h1>Select trigger app</h1>
            <select className="focus:outline-none w-full" onChange={onTriggerChange}>
                {apps.map((app, index) => (
                    <option key={index} value={`app ${app}`}>
                        On {app} open
                    </option>
                ))}
            </select>
        </>
    )
}

export default TriggerApps
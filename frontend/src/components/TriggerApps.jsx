function TriggerApps({apps, onTriggerChange, value}) {
    return (
        <>
            <h1>Select trigger app</h1>
            <select className="focus:outline-none w-full" onChange={onTriggerChange} value={value}>
                <option>Select one</option>
                {apps.map((app, index) => (
                    <option key={index} value={app}>
                        {app}
                    </option>
                ))}
            </select>
        </>
    )
}

export default TriggerApps
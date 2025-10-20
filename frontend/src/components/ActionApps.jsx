function ActionApps({apps, onActionChange}) {
    return (
        <>
            <h1>Select action app</h1>
            <select className="focus:outline-none w-full" onChange={onActionChange}>
                {apps.map((app, index) => (
                    <option key={index} value={`app ${app}`}>
                        On {app} open
                    </option>
                ))}
            </select>
        </>
    )
}

export default ActionApps
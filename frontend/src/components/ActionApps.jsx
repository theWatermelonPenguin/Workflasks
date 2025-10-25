function ActionApps({apps, onActionChange, value}) {
    return (
        <>
            <h1>Select action app</h1>
            <select className="focus:outline-none w-full" onChange={onActionChange} value={value}>
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

export default ActionApps
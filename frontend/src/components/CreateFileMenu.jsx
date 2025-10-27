function CreateFileMenu({onActionChange, onContentsChange, value, contentsvalue}) {
    return (
        <>
            <h1>File location (please use \\)</h1>
            <input type="text" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1 w-full" onChange={onActionChange} value={value}/>
            <h1>File contents:</h1>
            <input type="text" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1 w-full h-40" onChange={onContentsChange} value={contentsvalue}/>
        </>
    )
}

export default CreateFileMenu
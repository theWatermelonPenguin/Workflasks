function FolderPathMenu({onTriggerChange, value}) {
    return(
        <>
            <h1>Folder location (please use \\)</h1>
            <input type="text" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1 w-full" onChange={onTriggerChange} value={value}/>
        </>
    )
}

export default FolderPathMenu
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from './ws.js'

function Home({ setApps }) {
    const navigate = useNavigate() 
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        sendMessage({ type: "fetchInstalledApps"})
        onMessage((data) => {
            if(data.type === "installedApps"){
                console.log(data)
                setApps(data.installedApps)
                setLoaded(true)
            }
        })
    }, [setApps])

    async function handleNewWorkflask() {
        const loggedIn = await window.store.get("Is logged in")
        
        if(loaded === false) {
            alert("App still loading")
            return
        } else if (loggedIn === true && loaded === true) {
            navigate("/newWorkflask")
        } else {
            alert("You must log in to proceed")
        }
    }
    return (
        <>
            <div className="p-5 flex items-start">
                    <div className="flex-col text-xl space-y-5">
                        <h1 className="text-blue-700 text-6xl">Workflasks</h1>
                        <button className="text-2xl" onClick={handleNewWorkflask}>New Workflask</button>
                    </div>
                <Link to="/login" className="ml-auto hover:cursor-pointer hover:text-blue-700 transition delay-75">Log In or Sign Up</Link>
            </div>
        </>
    )
}

export default Home

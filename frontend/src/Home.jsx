import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { sendMessage, onMessage } from './ws.js'
import {ClipLoader} from "react-spinners"

function Home({ setApps, loaded, setLoaded }) {
    const navigate = useNavigate() 

    useEffect(() => {
        sendMessage({ type: "fetchInstalledApps"})
        onMessage((data) => {
            if(data.type === "installedApps"){
                console.log(data)
                setApps(data.installedApps)
                setLoaded(true)
            }
        })
    }, [setApps, setLoaded])

    async function handleNewWorkflask() {
        const loggedIn = await window.store.get("Is logged in")
        
        if (loggedIn === true && loaded === true) {
            navigate("/newWorkflask")
        } else {
            alert("You must log in to proceed")
        }
    }

    if(loaded === false) {
        return(
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <ClipLoader color="#2b6cb0" size={200}/>
                </div>
            </>
        )
    } else if(loaded === true) {
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
}

export default Home

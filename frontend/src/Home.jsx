import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from './ws.js'
import {ClipLoader} from "react-spinners" 
import {ToastContainer, toast} from "react-toastify"

function Home({ setApps, loaded, setLoaded }) {
    const navigate = useNavigate() 
    const [loggedIn, setLoggedIn] = useState(false)
    const [workflasks, setWorkflasks] = useState([])

    useEffect(() => {
        async function checkLoggedIn() {
            const loggedInStore = await window.store.get("Is logged in")
            setLoggedIn(loggedInStore)

            if(loggedInStore === true) {
                async function getSavedWorkflasks() {
                    const token = await window.store.get("Session Token")
                    console.log(token)
                    const res = await fetch("http://localhost:3000/api/workflasks", {
                        method: "GET",
                        headers: { "Content-Type": "application/json", "Authorization": token },
                    });

                    const data = await res.json()
                    
                    setWorkflasks(data.data)
                    console.log(data.data)
                    }

                getSavedWorkflasks()
            }
        }

        checkLoggedIn()
        if(!loaded) {
            sendMessage({ type: "fetchInstalledApps"})
            onMessage((data) => {
                if(data.type === "installedApps"){
                    setApps(data.installedApps)
                    setLoaded(true)
                    return
                }
            })
        }
    }, [loaded, setLoaded, setApps, loggedIn])

    async function handleNewWorkflask() {

        if (loggedIn === true) {
            navigate("/newWorkflask")
        } else {
            toast.error("You must log in to proceed")
        }
    }

    async function handleLogout(){
        window.store.set("Is logged in", false)
        window.store.delete("Session Token")
        setLoggedIn(false)
        setWorkflasks([])
        toast.success("Logged out successfully")
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
                            <h1 className="text-2xl">Your workflasks</h1>
                            <div className='grid grid-cols-4 gap-4'>
                                {workflasks.map(workflask => (
                                    <div key={workflask.id}> 
                                        <button className="border-2 border-blue-700 bg-neutral-100 rounded-lg w-80 h-20" onClick={() => {navigate("/loadWorkflask", {state: workflask.id})}}>{workflask.title}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    {loggedIn === false ? <Link to="/login" className="ml-auto hover:cursor-pointer hover:text-blue-700 transition delay-75">Log In or Sign Up</Link> : loggedIn === true ? <button className="ml-auto hover:cursor-pointer hover:text-blue-700 transition delay-75" onClick={handleLogout}>Log out</button> : null}
                </div>
                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover theme="colored"/>
            </>
        )
    }
}

export default Home

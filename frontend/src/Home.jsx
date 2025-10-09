import { Link } from 'react-router-dom'

function Home() {
    async function handleNewWorkflask() {
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

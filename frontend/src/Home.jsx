import './App.css'

function Home( {handleClick, test} ) {
  return (
        <>
            <div className="p-5 flex items-start">
                    <div className="flex-col text-xl space-y-5">        
                        <h1 className="text-blue-700 text-6xl">Workflasks</h1>
                        <h2>New workflask</h2>
                        <h2>Your Workflasks</h2>
                    </div>
                <h2 className="ml-auto hover:cursor-pointer hover:text-blue-700 transition delay-75" onClick={handleClick}>Log In or Sign Up</h2>

                
                <button onClick={test}>test</button>
            </div>
        </>
    )
}

export default Home

import { useState } from "react";
import Home from "./Home";
import Auth from "./auth";

function App(){
  const [authClick, setAuthClick] = useState(false)
  
  function handleClick() {
    setAuthClick(true)
  }
  return(
    <>
      {!authClick && <Home handleClick={handleClick}/>}
      {authClick && <Auth />}
    </>
  )
}

export default App
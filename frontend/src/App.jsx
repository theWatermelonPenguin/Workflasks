import { useState } from "react";
import Home from "./home";
import Auth from "./auth";
import Canvas from "./MainCanvas";

function App(){
  const [authClick, setAuthClick] = useState(false)
  const [thing, setThing] = useState(false)
  
  function handleClick() {
    setAuthClick(true)
  }
  function fein() {
    setThing(true)
  }
  return(
    <>
      {!authClick && !thing && <Home handleClick={handleClick} test={fein} />}
      {authClick && <Auth />}
      {thing && <Canvas />}
    </>
  )
}

export default App
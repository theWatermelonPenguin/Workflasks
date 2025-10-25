
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NewWorkflask from "./NewWorkflask";
import LoadWorkflask from "./LoadWorkflask"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";

function Router(){
  const [apps, setApps] = useState([])
  const [loaded, setLoaded] = useState(false)

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setApps={setApps} loaded={loaded} setLoaded={setLoaded}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/newWorkflask" element={<NewWorkflask apps={apps}/>}/>
          <Route path="/loadWorkflask" element={<LoadWorkflask apps={apps}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
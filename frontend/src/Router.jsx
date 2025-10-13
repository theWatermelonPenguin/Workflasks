
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NewWorkflask from "./NewWorkflask";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function Router(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/newWorkflask" element={<NewWorkflask/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
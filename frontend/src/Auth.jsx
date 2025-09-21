import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Auth() {
    const [click, setClicked] = useState(false)

    function handleAuthClick() {
        setClicked(!click)
    }
    return(
        <>
            {!click && <Login openLogOrSign={handleAuthClick} />}
            {click && <Signup openLogOrSign={handleAuthClick} />}
        </>
    )
}

export default Auth
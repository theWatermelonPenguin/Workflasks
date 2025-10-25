import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import x from "./assets/x.svg"

function Signup () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { email, password, name };

        const res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json()
        
        if (res.ok) {
            console.log("Signup successful:", data);
            navigate("/login")
        } else {
            console.log("Signup failed:", data);
        }
    }
    function onEmailChange(e) {
        setEmail(e.target.value)
    }
    function onPasswordChange(e) {
        setPassword(e.target.value)
    }
    function onNameChange(e) {
        setName(e.target.value)
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handleSubmit} className="relative items-start flex flex-col border-blue-700 border-2 rounded-lg w-auto h-auto bg-neutral-100 p-3 space-y-3">
                    <Link to="/" className="absolute top-2 right-2">
                        <img src={x} alt="Go back" className="w-10"/>
                    </Link>
                    <h1 className="text-2xl">Sign Up</h1>
                    <h1>Name</h1>
                    <input type="text" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1 capitalize" onChange={onNameChange}/>
                    <h1>Email</h1>
                    <input type="email" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1" onChange={onEmailChange}/>
                    <h1>Password</h1>
                    <input type="password" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ring-1" onChange={onPasswordChange}/>
                    <button type="submit" className="self-center bg-blue-700 w-20 h-10 rounded-lg text-white hover:cursor-pointer hover:bg-blue-500 transition-all">Sign Up</button>
                    <Link to="/login" className="hover:cursor-pointer hover:text-blue-700 underline self-center transition-all">Already have an account? Log in!</Link>
                </form>
            </div>
        </>
    )
}

export default Signup

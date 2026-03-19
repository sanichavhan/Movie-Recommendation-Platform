import React, { useState } from "react"
import authService from "../services/authService"

const RegisterPage = () => {

    const [username,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await authService.register({
                username,
                email,
                password
            })

            alert("Registration Successful")

        } catch {

            alert("Error")

        }
    }

    return (

        <form onSubmit={handleSubmit}>

            <h2>Create Account</h2>

            <input
                placeholder="username"
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                placeholder="email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">
                Register
            </button>

        </form>
    )
}

export default RegisterPage
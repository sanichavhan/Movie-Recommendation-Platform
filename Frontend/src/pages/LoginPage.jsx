/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import authService from "../services/authService"

const LoginPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await authService.login({
                username,
                password
            })

            alert("Login Successful")

        } catch (err) {

            alert("Login Failed")

        }
    }

    return (

        <form onSubmit={handleSubmit}>

            <h2>Login</h2>

            <input
                type="username"
                placeholder="Username"
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">
                Login
            </button>

        </form>
    )
}

export default LoginPage
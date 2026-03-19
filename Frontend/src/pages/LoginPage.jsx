
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import ErrorMessage from "../components/common/ErrorMessage"
import { useAuth } from "../context/AuthContext"
import "../styles/LoginPage.scss"

const LoginPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const validateForm = () => {
        if (!username.trim()) {
            setError("Username is required")
            return false
        }
        if (!password) {
            setError("Password is required")
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!validateForm()) return

        try {
            setLoading(true)
            await login({ username, password })
            navigate("/")
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Login failed. Please check your credentials."
            setError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <Navbar />

            <div className="login-container">
                <div className="login-form-wrapper">
                    <h2 className="login-heading">
                        Welcome Back
                    </h2>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group-last">
                            <label className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="form-button"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="login-link">
                        Don't have an account?{" "}
                        <Link to="/register" className="register-link">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default LoginPage
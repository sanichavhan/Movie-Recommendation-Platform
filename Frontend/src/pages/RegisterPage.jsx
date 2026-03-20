import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { useAuth } from "../context/AuthContext"
import "../styles/RegisterPage.scss"

const RegisterPage = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register } = useAuth()

    const validateForm = () => {
        if (!username.trim()) {
            setError("Username is required")
            return false
        }
        if (username.length < 3) {
            setError("Username must be at least 3 characters")
            return false
        }
        if (!email.trim()) {
            setError("Email is required")
            return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email")
            return false
        }
        if (!password) {
            setError("Password is required")
            return false
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return false
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match")
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
            await register({
                username,
                email,
                password
            })
            navigate("/")
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Registration failed. Please try again."
            setError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-page">
            <Navbar />

            <div className="register-container">
                <div className="register-form-wrapper">
                    <h2 className="register-heading">
                        Create Account
                    </h2>

                    {error && (
                        <div className="register-error">
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
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group-last">
                            <label className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="form-button"
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>

                    <p className="register-link">
                        Already have an account?{" "}
                        <Link to="/login" className="login-link">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default RegisterPage;
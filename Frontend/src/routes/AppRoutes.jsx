import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage"
import MovieDetailsPage from "../pages/MovieDetailsPage"
import SearchPage from "../pages/SearchPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/movie/:id" element={<MovieDetailsPage />} />

                <Route path="/search" element={<SearchPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

            </Routes>

        </BrowserRouter>

    )
}

export default AppRoutes
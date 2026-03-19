import React from "react"
import { useParams } from "react-router-dom"
import { useMovieDetails } from "../hooks/movies/useMovieDetails"

import Loader from "../components/common/Loader"

const MovieDetailsPage = () => {

    const { id } = useParams()

    const { movie, loading } = useMovieDetails(id)

    if (loading) return <Loader />

    return (
        <div className="movie-details">

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <h1>{movie.title}</h1>

            <p>{movie.overview}</p>

            <p>⭐ Rating: {movie.vote_average}</p>

            <p>Release Date: {movie.release_date}</p>

        </div>
    )
}

export default MovieDetailsPage
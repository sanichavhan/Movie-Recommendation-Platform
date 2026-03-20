import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useMovieDetails } from "../hooks/movies/useMovieDetails"
import { useCast } from "../hooks/movies/useCast"
import { useSimilarMovies } from "../hooks/search/useSimilarMovies"

import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import EmptyState from "../components/common/EmptyState"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import CastComponent from "../components/movie/CastComponent"
import SimilarMoviesSection from "../components/search/SimilarMoviesSection"
import "../styles/MovieDetailsPage.scss"

const MovieDetailsPage = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { movie, loading, error } = useMovieDetails(id)
    const { cast, loading: castLoading } = useCast(id)
    const { movies: similarMovies, loading: similarLoading, error: similarError } = useSimilarMovies(id)

    if (loading) return <Loader />

    if (error) return (
        <div className="error-page">
            <Navbar />
            <div className="error-container">
                <EmptyState
                    icon="⚠️"
                    title="Unable to Load Movie"
                    message={error || "We couldn't find the details for this movie. Please try again later."}
                    action={
                        <div className="empty-state-action">
                            <button className="primary" onClick={() => navigate("/")}>
                                Go to Home
                            </button>
                            <button className="secondary" onClick={() => window.location.reload()}>
                                Try Again
                            </button>
                        </div>
                    }
                />
            </div>
            <Footer />
        </div>
    )

    if (!movie || !movie.id) return (
        <div className="error-page">
            <Navbar />
            <div className="error-container">
                <EmptyState
                    icon="🎬"
                    title="Movie Details Not Available"
                    message="Sorry, we couldn't find the details for this movie. It may have been removed or the ID might be invalid."
                    action={
                        <div className="empty-state-action">
                            <button className="primary" onClick={() => navigate("/")}>
                                Back to Home
                            </button>
                            <button className="secondary" onClick={() => navigate("/discover")}>
                                Discover Movies
                            </button>
                        </div>
                    }
                />
            </div>
            <Footer />
        </div>
    )

    return (
        <div className="movie-details-page">
            <Navbar />

            <div className="details-content">
                <div className="details-grid">
                    {/* Poster */}
                    <div className="details-poster">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="poster-image"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'}
                        />
                    </div>

                    {/* Details */}
                    <div className="details-info">
                        <h1 className="details-title">
                            {movie.title}
                        </h1>

                        <div className="details-stats">
                            <div>
                                <p className="stat-label">Rating</p>
                                <h3 className="stat-value">
                                    ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10
                                </h3>
                            </div>
                            <div>
                                <p className="stat-label">Release Date</p>
                                <h3 className="stat-value">
                                    📅 {movie.release_date?.substring(0, 4) || 'N/A'}
                                </h3>
                            </div>
                            <div>
                                <p className="stat-label">Duration</p>
                                <h3 className="stat-value">
                                    🕒 {movie.runtime || 'N/A'} min
                                </h3>
                            </div>
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div className="genres-section">
                                <h3 className="genres-title">Genres:</h3>
                                <div className="genres-list">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="genre-tag"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="overview-section">
                            <h3 className="overview-title">Overview:</h3>
                            <p className="overview-text">
                                {movie.overview}
                            </p>
                        </div>

                        {movie.budget > 0 && (
                            <div className="finance-item">
                                <p className="finance-label">Budget</p>
                                <h4 className="finance-value">
                                    💰 ${(movie.budget / 1000000).toFixed(1)}M
                                </h4>
                            </div>
                        )}

                        {movie.revenue > 0 && (
                            <div className="finance-item">
                                <p className="finance-label">Revenue</p>
                                <h4 className="finance-value">
                                    💵 ${(movie.revenue / 1000000).toFixed(1)}M
                                </h4>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cast Section */}

                {/* Similar Movies Section */}
                <SimilarMoviesSection 
                    movies={similarMovies}
                    loading={similarLoading}
                    error={similarError}
                    title="Similar Movies"
                />
                {!castLoading && <CastComponent cast={cast} />}
            </div>

            <Footer />
        </div>
    )
}

export default MovieDetailsPage
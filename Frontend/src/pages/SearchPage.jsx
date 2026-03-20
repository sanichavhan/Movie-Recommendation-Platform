import React, { useState, useCallback, useRef, useEffect, useContext } from "react"
import { useSearch } from "../hooks/search/useSearch"
import { useSimilarMovies } from "../hooks/search/useSimilarMovies"
import { useSavedSearches } from "../hooks/search/useSavedSearches"
import useTrendingMovies from "../hooks/movies/useTrendingMovies"
import { AuthContext } from "../context/AuthContext"
import MovieCard from "../components/movie/MovieCard"
import RecommendationModal from "../components/search/RecommendationModal"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { animateSearchInput, animateSearchInputBlur, fadeIn } from "../utils/animations"
import "../styles/SearchPage.scss"

const SearchPage = () => {

    const { user } = useContext(AuthContext)
    const [query, setQuery] = useState("")
    const [selectedMovieForRecommendation, setSelectedMovieForRecommendation] = useState(null)
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches')
        return saved ? JSON.parse(saved) : []
    })
    
    const { movies, loading, error } = useSearch(query)
    const { movies: similarMovies, loading: similarLoading } = useSimilarMovies(selectedMovieForRecommendation?.id)
    const { movies: trendingMovies } = useTrendingMovies()
    const { savedSearches, saveSearch } = useSavedSearches(user?.id)
    const inputRef = useRef(null)
    const resultsRef = useRef(null)

    useEffect(() => {
        if (resultsRef.current && movies && movies.length > 0 && query) {
            fadeIn(resultsRef.current, 0.5)
        }
    }, [movies, query])

    const handleSearchChange = useCallback((e) => {
        setQuery(e.target.value)
    }, [])

    const handleSearchSubmit = (searchQuery) => {
        if (searchQuery.trim()) {
            // If user is logged in, save to database
            if (user?.id) {
                saveSearch(searchQuery)
            }
            
            // Also save to localStorage for unauthenticated users or as backup
            const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
            setRecentSearches(updated)
            localStorage.setItem('recentSearches', JSON.stringify(updated))
            setQuery(searchQuery)
        }
    }

    const handleRecentSearchClick = (search) => {
        setQuery(search)
    }

    const handleRemoveRecent = (search) => {
        const updated = recentSearches.filter(s => s !== search)
        setRecentSearches(updated)
        localStorage.setItem('recentSearches', JSON.stringify(updated))
    }

    const handleSearchFocus = () => {
        animateSearchInput(inputRef.current)
    }

    const handleSearchBlur = () => {
        animateSearchInputBlur(inputRef.current)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(query)
        }
    }

    const handleMovieClick = (e, movie) => {
        e.preventDefault()
        setSelectedMovieForRecommendation(movie)
    }

    const closeRecommendationModal = () => {
        setSelectedMovieForRecommendation(null)
    }

    return (
        <div className="search-page">
            <Navbar />

            <div className="search-content">
                {/* Search Input Section */}
                <div className="search-input-section">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Movies, shows and more"
                            value={query}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            className="search-input"
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
                    </div>
                </div>

                {error && <ErrorMessage message={error} />}

                {!query || query.trim() === "" ? (
                    <div className="search-initial">
                        {/* User's Saved Searches (Database) */}
                        {user?.id && savedSearches.length > 0 && (
                            <div className="saved-searches">
                                <div className="saved-searches-header">
                                    <h3>Your Saved Searches</h3>
                                    <span className="saved-count">{savedSearches.length}</span>
                                </div>
                                <div className="saved-searches-list">
                                    {savedSearches.map((search) => (
                                        <div key={search._id} className="saved-search-item">
                                            <span className="star-icon">⭐</span>
                                            <span 
                                                className="saved-text"
                                                onClick={() => handleRecentSearchClick(search.query)}
                                            >
                                                {search.query}
                                            </span>
                                            <span className="search-date">
                                                {new Date(search.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Searches (localStorage) */}
                        {recentSearches.length > 0 && (
                            <div className="recent-searches">
                                <h3>Recent Searches</h3>
                                <div className="recent-searches-list">
                                    {recentSearches.map((search, idx) => (
                                        <div key={idx} className="recent-search-item">
                                            <span className="clock-icon">⏱️</span>
                                            <span 
                                                className="recent-text"
                                                onClick={() => handleRecentSearchClick(search)}
                                            >
                                                {search}
                                            </span>
                                            <button
                                                className="close-btn"
                                                onClick={() => handleRemoveRecent(search)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending Section */}
                        <div className="search-trending">
                            <h2 className="trending-title">Trending in India</h2>
                            <div className="trending-carousel">
                                {trendingMovies && trendingMovies.slice(0, 20).map(movie => (
                                    <div key={movie.id} className="carousel-item">
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : loading ? (
                    <Loader />
                ) : movies && movies.length === 0 ? (
                    <div className="search-empty">
                        <div className="empty-icon">🎬</div>
                        <h2>No results found for "{query}"</h2>
                        <p>Try searching with different keywords</p>
                    </div>
                ) : movies && movies.length > 0 ? (
                    <div ref={resultsRef} className="search-results-section">
                        <p className="search-count">
                            Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{query}"
                        </p>
                        <p className="search-hint" style={{color: '#888', fontSize: '14px', marginBottom: '15px'}}>
                            💡 Click on any movie to see similar recommendations!
                        </p>
                        <div className="search-results-carousel">
                            {movies
                                .filter(item => item && (item.title || item.name))
                                .map(item => (
                                    <div 
                                        key={item.id} 
                                        className="carousel-item"
                                        onClick={(e) => handleMovieClick(e, {
                                            ...item,
                                            title: item.title || item.name,
                                            poster_path: item.poster_path
                                        })}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MovieCard
                                            movie={{
                                                ...item,
                                                title: item.title || item.name,
                                                poster_path: item.poster_path
                                            }}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Recommendation Modal */}
            {selectedMovieForRecommendation && (
                <RecommendationModal 
                    movie={selectedMovieForRecommendation}
                    similarMovies={similarMovies}
                    loading={similarLoading}
                    onClose={closeRecommendationModal}
                />
            )}

            <Footer />
        </div>
    )
}

export default SearchPage
                </div>

                {error && <ErrorMessage message={error} />}

                {!query || query.trim() === "" ? (
                    <div className="search-initial">
                        {/* User's Saved Searches (Database) */}
                        {user?.id && savedSearches.length > 0 && (
                            <div className="saved-searches">
                                <div className="saved-searches-header">
                                    <h3>Your Saved Searches</h3>
                                    <span className="saved-count">{savedSearches.length}</span>
                                </div>
                                <div className="saved-searches-list">
                                    {savedSearches.map((search) => (
                                        <div key={search._id} className="saved-search-item">
                                            <span className="star-icon">⭐</span>
                                            <span 
                                                className="saved-text"
                                                onClick={() => handleRecentSearchClick(search.query)}
                                            >
                                                {search.query}
                                            </span>
                                            <span className="search-date">
                                                {new Date(search.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Searches (localStorage) */}
                        {recentSearches.length > 0 && (
                            <div className="recent-searches">
                                <h3>Recent Searches</h3>
                                <div className="recent-searches-list">
                                    {recentSearches.map((search, idx) => (
                                        <div key={idx} className="recent-search-item">
                                            <span className="clock-icon">⏱️</span>
                                            <span 
                                                className="recent-text"
                                                onClick={() => handleRecentSearchClick(search)}
                                            >
                                                {search}
                                            </span>
                                            <button
                                                className="close-btn"
                                                onClick={() => handleRemoveRecent(search)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending Section */}
                        <div className="search-trending">
                            <h2 className="trending-title">Trending in India</h2>
                            <div className="trending-carousel">
                                {trendingMovies && trendingMovies.slice(0, 20).map(movie => (
                                    <div key={movie.id} className="carousel-item">
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : loading ? (
                    <Loader />
                ) : movies && movies.length === 0 ? (
                    <div className="search-empty">
                        <div className="empty-icon">🎬</div>
                        <h2>No results found for "{query}"</h2>
                        <p>Try searching with different keywords</p>
                    </div>
                ) : movies && movies.length > 0 ? (
                    <div ref={resultsRef} className="search-results-section">
                        <p className="search-count">
                            Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{query}"
                        </p>
                        <p className="search-hint" style={{color: '#888', fontSize: '14px', marginBottom: '15px'}}>
                            💡 Click on any movie to see similar recommendations!
                        </p>
                        <div className="search-results-carousel">
                            {movies
                                .filter(item => item && (item.title || item.name))
                                .map(item => (
                                    <div 
                                        key={item.id} 
                                        className="carousel-item"
                                        onClick={(e) => handleMovieClick(e, {
                                            ...item,
                                            title: item.title || item.name,
                                            poster_path: item.poster_path
                                        })}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MovieCard
                                            movie={{
                                                ...item,
                                                title: item.title || item.name,
                                                poster_path: item.poster_path
                                            }}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Recommendation Modal */}
            {selectedMovieForRecommendation && (
                <RecommendationModal 
                    movie={selectedMovieForRecommendation}
                    similarMovies={similarMovies}
                    loading={similarLoading}
                    onClose={closeRecommendationModal}
                />
            )}

            <Footer />
        </div>
    )
}

export default SearchPage
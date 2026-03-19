import React, { useState, useCallback, useRef, useEffect } from "react"
import { useSearch } from "../hooks/search/useSearch"
import useTrendingMovies from "../hooks/movies/useTrendingMovies"
import MovieCard from "../components/movie/MovieCard"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { animateSearchInput, animateSearchInputBlur, fadeIn } from "../utils/animations"
import "../styles/SearchPage.scss"

const SearchPage = () => {

    const [query, setQuery] = useState("")
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches')
        return saved ? JSON.parse(saved) : []
    })
    const { movies, loading, error } = useSearch(query)
    const { movies: trendingMovies } = useTrendingMovies()
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
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div className="recent-searches">
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
                        <div className="search-results-carousel">
                            {movies
                                .filter(item => item && (item.title || item.name))
                                .map(item => (
                                    <div key={item.id} className="carousel-item">
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

            <Footer />
        </div>
    )
}

export default SearchPage
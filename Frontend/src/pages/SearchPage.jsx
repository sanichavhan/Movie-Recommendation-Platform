import React, { useState, useCallback } from "react"
import { useSearch } from "../hooks/search/useSearch"
import MovieCard from "../components/movie/MovieCard"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import "../styles/SearchPage.scss"

const SearchPage = () => {

    const [query, setQuery] = useState("")
    const { movies, loading, error } = useSearch(query)

    const handleSearchChange = useCallback((e) => {
        setQuery(e.target.value)
    }, [])

    return (
        <div className="search-page">
            <Navbar />

            <div className="search-content">
                <h1 className="search-heading">🔍 Search Movies</h1>

                {error && <ErrorMessage message={error} />}

                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search for movies, TV shows, people..."
                        value={query}
                        onChange={handleSearchChange}
                        className="search-input"
                        onFocus={(e) => e.currentTarget.classList.add('focused')}
                        onBlur={(e) => e.currentTarget.classList.remove('focused')}
                    />
                </div>

                {!query || query.trim() === "" ? (
                    <div className="search-empty">
                        <h2>Start typing to search for movies, TV shows, and people...</h2>
                    </div>
                ) : loading ? (
                    <Loader />
                ) : movies && movies.length === 0 ? (
                    <div className="search-empty">
                        <h2>No results found for "{query}"</h2>
                    </div>
                ) : movies && movies.length > 0 ? (
                    <div>
                        <p className="search-count">
                            Found {movies.length} result{movies.length !== 1 ? 's' : ''}
                        </p>
                        <div className="search-results">
                            {movies
                                .filter(item => item && (item.title || item.name))
                                .map(item => (
                                    <MovieCard
                                        key={item.id}
                                        movie={{
                                            ...item,
                                            title: item.title || item.name,
                                            poster_path: item.poster_path
                                        }}
                                    />
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
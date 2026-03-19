import React, { useState } from "react"
import { useSearch } from "../hooks/search/useSearch"
import MovieCard from "../components/movie/MovieCard"

const SearchPage = () => {

    const [query, setQuery] = useState("")

    const { movies } = useSearch(query)

    return (
        <div className="search-page">

            <input
                type="text"
                placeholder="Search Movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="movies-grid">

                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}

            </div>

        </div>
    )
}

export default SearchPage
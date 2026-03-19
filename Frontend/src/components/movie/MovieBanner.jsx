import "../../styles/MovieBanner.scss";

const MovieBanner = ({ movie }) => {

  if (!movie) return null

  return (
    <div className="movie-banner" style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    }}>
      <div className="banner-overlay"></div>
      
      <div className="banner-content">
        <h1 className="banner-title">
          {movie.title}
        </h1>
        
        <div className="banner-meta">
          <span>⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10</span>
          <span>📅 {movie.release_date?.substring(0, 4) || 'N/A'}</span>
          <span>🕒 {movie.runtime || 'N/A'} min</span>
        </div>

        <p className="banner-overview">
          {movie.overview}
        </p>
      </div>
    </div>
  )
}

export default MovieBanner
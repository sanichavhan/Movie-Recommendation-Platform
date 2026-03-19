const MovieBanner = ({ movie }) => {

  if (!movie) return null

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
    >
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  )
}

export default MovieBanner
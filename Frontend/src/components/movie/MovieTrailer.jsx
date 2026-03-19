import ReactPlayer from "react-player";

const MovieTrailer = ({ url }) => {

  return (
    <div className="movie-trailer">

      <ReactPlayer url={url} controls width="100%" />

    </div>
  );
};

export default MovieTrailer;
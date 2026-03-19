import ReactPlayer from "react-player";

const MovieTrailer = ({ url }) => {

  return (
    <div style={{margin:"20px 0"}}>

      <ReactPlayer url={url} controls width="100%" />

    </div>
  );
};

export default MovieTrailer;
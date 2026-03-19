import { Link } from "react-router-dom";

const TVCard = ({ show }) => {

  const image = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

  return (
    <Link to={`/tv/${show.id}`}>

      <div style={{width:"200px"}}>

        <img src={image} alt={show.name} style={{width:"100%"}} />

        <h4>{show.name}</h4>

      </div>

    </Link>
  );
};

export default TVCard;
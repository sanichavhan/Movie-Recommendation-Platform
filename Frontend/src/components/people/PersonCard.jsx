const PersonCard = ({ person }) => {

  const image = `https://image.tmdb.org/t/p/w500${person.profile_path}`;

  return (
    <div style={{width:"200px"}}>

      <img src={image} alt={person.name} style={{width:"100%"}} />

      <h4>{person.name}</h4>

    </div>
  );
};

export default PersonCard;
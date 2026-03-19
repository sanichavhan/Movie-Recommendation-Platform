const PersonCard = ({ person }) => {

  const image = `https://image.tmdb.org/t/p/w500${person.profile_path}`;

  return (
    <div className="person-card">

      <img src={image} alt={person.name} className="person-image" />

      <h4 className="person-name">{person.name}</h4>

    </div>
  );
};

export default PersonCard;
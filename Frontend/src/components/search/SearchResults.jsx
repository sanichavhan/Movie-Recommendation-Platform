import MovieCard from "../movie/MovieCard";

const SearchResults = ({ results }) => {

  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}}>

      {results.map(item => (
        <MovieCard key={item.id} movie={item} />
      ))}

    </div>
  );
};

export default SearchResults;
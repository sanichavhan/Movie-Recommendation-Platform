import "../../styles/Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-spinner">
        <div className="loader-circle"></div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;

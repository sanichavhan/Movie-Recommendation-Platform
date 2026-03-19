import "../../styles/ErrorMessage.scss";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <span className="error-text">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="error-close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

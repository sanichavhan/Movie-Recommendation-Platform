import React from "react";
import "../../styles/EmptyState.scss";

const EmptyState = ({ title, message, icon, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">{icon || "🎬"}</div>
        <h2 className="empty-state-title">{title}</h2>
        <p className="empty-state-message">{message}</p>
        {action && <div className="empty-state-action">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;

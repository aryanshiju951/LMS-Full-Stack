import React from "react";

const Sidebar = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <aside className="sidebar" aria-label="Sidebar">
        <div className="sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="brand-logo" />
            <strong>Menu</strong>
          </div>
          <button className="ghost" onClick={onClose}>Close</button>
        </div>
        {children}
      </aside>
    </>
  );
};

export default Sidebar;

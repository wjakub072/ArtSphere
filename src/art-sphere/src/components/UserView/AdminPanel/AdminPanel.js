import React from "react";
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="user-admin-panel-wrap">

        <h2>Panel Administratora</h2>

        <div className="user-admin-panel-image-wrap">
            <img src={require('./kot.jpg')} alt="Zdjęcie kota" width="400px" />
        </div>

        <div className="user-admin-panel-verification-wrap">
            <button type="submit">Zatwierdź</button>
            <button type="submit">Odrzuć</button>
        </div>
    </div>
  );
}

export default AdminPanel;
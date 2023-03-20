import React from "react";
import './profile.css';

const Profile = () => {
  return (
    <div className="user-profile-wrap">
        <h2>Profil</h2>
        <p>Jeszcze jebnie się gdzieś zdjęcie</p>

        <form className="user-profile-form">
          <label>
              Imię
              <input type="text" placeholder="Imię"/>
          </label>
          <label>
              Nazwisko
              <input type="text" placeholder="Nazwisko"/>
          </label>
          <label>
              Krótki opis
              <input type="text" placeholder="Krótki opis"/>
              <textarea placeholder="Krótki opis" rows="5" cols="25"></textarea>
          </label>

          <input type="submit" value="Zaktualizuj profil"/>
        </form>
    </div>
  );
}

export default Profile;
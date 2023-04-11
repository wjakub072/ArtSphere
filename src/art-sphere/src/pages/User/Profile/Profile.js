import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./Profile.css";

const Profile = () => {
  useWebsiteTitle("Profil");
  const { userData, updateProfileData } = useContext(AuthContext);

  const [data, setData] = useState(userData);

  const clickHandler = (e) => {
    e.preventDefault();
    updateProfileData(data);
  };

  return (
    <div className="user-profile-wrap">
      <h2>Profil</h2>
      <p>Jeszcze będzie gdzieś zdjęcie</p>

      <form className="user-profile-form">
        <label className="text-primary">
          Imię
          <input
            className="form-control"
            type="text"
            placeholder="Imię"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </label>
        <label className="text-primary">
          Nazwisko
          <input
            className="form-control"
            type="text"
            placeholder="Nazwisko"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </label>
        <label className="text-primary">
          Krótki opis
          <textarea
            className="form-control"
            placeholder="Krótki opis"
            rows="5"
            cols="30"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </label>

        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          type="submit"
          value="Zaktualizuj profil"
          onClick={clickHandler}
        />
      </form>
    </div>
  );
};

export default Profile;

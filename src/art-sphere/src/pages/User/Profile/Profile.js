import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./Profile.css";

const Profile = () => {
  useWebsiteTitle("Profil");
  const [auth] = useAuth();

  if (!auth) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="user-profile-wrap">
      <h2>Profil</h2>
      <p>Jeszcze będzie gdzieś zdjęcie</p>

      <form className="user-profile-form">
        <label className="text-primary">
          Imię
          <input className="form-control" type="text" placeholder="Imię" />
        </label>
        <label className="text-primary">
          Nazwisko
          <input className="form-control" type="text" placeholder="Nazwisko" />
        </label>
        <label className="text-primary">
          Krótki opis
          <textarea
            className="form-control"
            placeholder="Krótki opis"
            rows="5"
            cols="30"
          ></textarea>
        </label>

        <input
          className="btn btn-primary"
          type="submit"
          value="Zaktualizuj profil"
        />
      </form>
    </div>
  );
};

export default Profile;

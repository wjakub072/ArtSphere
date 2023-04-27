import { useContext, useEffect } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Link } from "react-router-dom";
import artist_card from "../../data/artistData";
import AuthContext from "../../context/AuthContext";
import "./artists.css";

function Artists(props) {
  useWebsiteTitle("Artyści");
  const { setSesionError } = useContext(AuthContext);

  useEffect(() => {
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //tworzenie divy z artystami
  const listItems = artist_card.map((item) => (
    <Link to={`/artysci/${item.id}`}>
      <div className="artist_card" key={item.id}>
        <div className="artist_card_image">
          <img src={item.thumb} alt="" />
        </div>
        <div className="artist_card_name">
          <h3>
            {item.name} {item.surname}
          </h3>
        </div>
      </div>
    </Link>
  ));
  return (
    <div className="artists-container">
      <div className="artists">{listItems}</div>
    </div>
  );
}

export default Artists;

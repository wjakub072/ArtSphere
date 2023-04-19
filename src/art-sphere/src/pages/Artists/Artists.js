import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import artist_card from "../../data/artistData";
import { NavLink } from "react-router-dom";
import "./artists.css";

function Artists(props) {
  useWebsiteTitle("Artyści");
  console.log(artist_card)

  //tworzenie divy z artystami
  const listItems = artist_card.map((item) =>
    <NavLink
    to="./artysciszczegoly"
    >
      <div className="artist_card" key={item.id}>
            <div className="artist_card_image">
                  <img src={item.thumb} alt=" "/>
            </div>
            <div className="artist_card_name">
                  <h3>{item.name} {item.surname}</h3>
            </div>
      </div>
    </NavLink>
  );
  return (
    <div className="artists-view">
      <div className="artists-container">
        <div className="artists">
          <div className="artists_card_view">
              {listItems}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Artists;
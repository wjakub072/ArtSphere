import AddArt from "../../../components/AddArt/AddArt";
import offer_card from "../../../data/offerData";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

//tworzenie divy z ofertami
const cardStyle = {
  width: "200px",
  height: "250px",
};

const listItems = offer_card.map((item) => (
  <div className="offer_card" style={cardStyle} key={item.id}>
    <div className="offer_card_image" style={{ height: "65%" }}>
      <img src={item.thumb} alt=" " />
    </div>
    <div className="offer_card_name">
      <h3>{item.name}</h3>
      <p className="offer_card_name_author">{item.author}</p>
      <p>{item.price} zł</p>
    </div>
  </div>
));

const UserArts = () => {
  useWebsiteTitle("Twoje dzieła");
  return (
    <div className="user-user-arts-wrap">
      <h2 className="mt-2">Twoje dzieła</h2>
      <AddArt />

      <div className="offers-container">
        <div className="offers w-full"></div>
      </div>
    </div>
  );
};

export default UserArts;

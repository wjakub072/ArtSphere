import AddArt from "../../../components/AddArt/AddArt";
<<<<<<< HEAD
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

=======
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
const UserArts = () => {
  useWebsiteTitle("Twoje dzieła");
  return (
    <div className="user-user-arts-wrap">
<<<<<<< HEAD
      <h2 className="mt-2">Twoje dzieła</h2>
      <AddArt />

      <div className="offers-container">
        <div className="offers w-full"></div>
      </div>
=======
      <AddArt />
      <h2 className="mt-2">Twoje dzieła</h2>
      <p>Bedzie jakaś tabela razem z API się zrobi</p>
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    </div>
  );
};

export default UserArts;

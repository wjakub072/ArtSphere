import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const Favorite = () => {
  useWebsiteTitle("Ulubione");
  return (
    <div className="user-favorite-wrap">
      <h2>Ulubione</h2>
      <p>Bedzie jakaś tabela razem z API się zrobi</p>
    </div>
  );
};

export default Favorite;

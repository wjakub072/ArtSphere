import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const ShoppingHistory = () => {
  useWebsiteTitle("Moje zakupy");
  return (
    <div className="user-shopping-history-wrap">
      <h2>Moje zakupy</h2>
      <p>Bedzie jakaś tabela razem z API się zrobi</p>
    </div>
  );
};

export default ShoppingHistory;

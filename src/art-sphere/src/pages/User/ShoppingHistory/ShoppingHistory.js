import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import shopping_card from "../../../data/shoppingHistory";


const ShoppingHistory = () => {
  useWebsiteTitle("Moje zakupy");

  const listItems = shopping_card.map((item)=>
  
    <button className="border-2 border-indigo-500 rounded-md p-2 m-1 text-indigo-500 hover:border-indigo-800 hover:text-indigo-800 hover:bg-gray-300">
      <div key={item.id}>
        <h3>Produkt: <span className="text-black">{item.product_name}</span></h3>
        <p>Cena: <span className="text-black">{item.price}</span> zł</p>
        <p>Zakupione: <span className="text-black">{item.data}</span></p>
      </div>
    </button>
  )

  return (
      <div className="text-xl">
        <div>
          {listItems}
        </div>
      </div>
  );
};

export default ShoppingHistory;

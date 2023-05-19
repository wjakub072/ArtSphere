import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import product_card from "../../../data/ShoppingCartPlaceholder"

const ShoppingCart = () => {
  useWebsiteTitle("Koszyk");

  const listProducts = product_card.map((item) =>
    <div className="bg-black p-4 rounded-lg text-right m-3" key={item.id}>
        <div className="w-full h-2/3">
            <img 
                className="w-full max-w-full max-h-full h-full object-contain object-center block pt-1"
                src={item.thumb}
                alt="None"
                />
        </div>
        <div className="px-4 py-2 text-white">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-l font-bold mt-2">{item.price} zł</p>
        </div>
        <button className="rounded-lg h-9 w-40 mr-3 bg-red-700 hover:bg-red-800 text-white text-center">Usuń z koszyka</button>
    </div>
  );

  return (
    <section class="mt-5 md:flex bg-zinc-200 rounded-lg p-6 shadow-lg w-full xl:w-5/6 xl:mx-auto">
        {listProducts}
    </section>
  );
};

export default ShoppingCart;

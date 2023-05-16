import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const TopUpWallet = () => {
  useWebsiteTitle("Doładuj portfel");
  return (
    <div className="text-4xl text-center mt-20 w-80">
      <div className="pt-2 pb-2 pl-4 pr-4 mt-3 mb-3 bg-white border-indigo-700 border-2 rounded">
        <p className="text-indigo-700">Stan konta: <span className="text-black">200</span><span className="text-black"> zł</span></p>
      </div>
      <a href="./doladowaniePortfela" className="bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-700 text-white my-3 py-2 px-4 rounded disabled:opacity-50">Doładuj konto</a>
    </div>
  );
};

export default TopUpWallet;
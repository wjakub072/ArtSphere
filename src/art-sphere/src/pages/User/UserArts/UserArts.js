import AddArt from "../../../components/AddArt/AddArt";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const UserArts = () => {
  useWebsiteTitle("Twoje dzieła");
  return (
    <div className="user-user-arts-wrap">
      <AddArt />
      <h2 className="mt-2">Twoje dzieła</h2>
      <p>Bedzie jakaś tabela razem z API się zrobi</p>
    </div>
  );
};

export default UserArts;

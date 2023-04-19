import { useContext, useEffect } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";

function Artists(props) {
  useWebsiteTitle("Artyści");
  const { setSesionError } = useContext(AuthContext);

  useEffect(() => {
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h2>Tu będą się wyświetlali artyści</h2>;
}

export default Artists;

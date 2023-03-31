import {Outlet} from "react-router-dom";
import UserNav from "./UserNav/UserNav";
import './User.css';

function User() {
  return(
    <section className="user-view bg-dark-subtle rounded-3 mt-5 p-3">
      <UserNav/>
      <Outlet/>

    </section>
  );
}

export default User;
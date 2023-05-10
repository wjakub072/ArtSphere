import { Outlet } from "react-router-dom";
import UserNav from "./UserNav/UserNav";

function User() {
  return (
    <div className="px-5">
      <section className="mt-5 md:flex bg-zinc-200 rounded-lg p-6 shadow-lg w-full xl:w-5/6 xl:mx-auto">
        <UserNav />
        <Outlet />
      </section>
    </div>
  );
}

export default User;

import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginView from "./components/Auth/LoginView/LoginView";
import RegisterView from "./components/Auth/RegisterView/RegisterView";
import Menu from "./components/Header/Menu/Menu";
import User from "./pages/User/User";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Artists from "./pages/Artists/Artists";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/User/Profile/Profile";
import ShoppingHistory from "./pages/User/ShoppingHistory/ShoppingHistory";
import Favorite from "./pages/User/Favorite/Favorite";
import TopUpWallet from "./pages/User/TopUpWallet/TopUpWallet";
import DeliveryAddress from "./pages/User/DeliveryAddress/DeliveryAddress";
import InvoiceData from "./pages/User/InvoiceData/InvoiceData";
import AccountSettings from "./pages/User/AccountSettings/AccountSettings";
import UserArts from "./pages/User/UserArts/UserArts";
import AdminPanel from "./pages/User/AdminPanel/AdminPanel";
import ProtectedRoute from "./hoc/ProtectedRoute";
<<<<<<< HEAD
import PasswordRecovery from "./components/Auth/PasswordRecovery/PasswordRecovery";
import { AuthContextProvider } from "./context/AuthContext";
=======
import { AuthContextProvider } from "./context/AuthContext";
import ArtistsDetails from "./pages/Artists/ArtistsDetails/ArtistsDetails";
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

function App() {
  const content = (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/artysci" element={<Artists />} />
<<<<<<< HEAD
=======
        <Route path="/artysci/artysciszczegoly" element={<ArtistsDetails />} />
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
        <Route
          path="/logowanie"
          element={
            <ProtectedRoute accesBy="non-authenticated">
              <LoginView />
            </ProtectedRoute>
          }
        />
        <Route
<<<<<<< HEAD
          path="/logowanie/odzyskiwanieHasla"
          element={
            <ProtectedRoute accesBy="non-authenticated">
              <PasswordRecovery />
            </ProtectedRoute>
          }
        />
        <Route
=======
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
          path="/rejestracja"
          element={
            <ProtectedRoute accesBy="non-authenticated">
              <RegisterView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <ProtectedRoute accesBy="authenticated" role="klient">
              <User />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="mojeZakupy" element={<ShoppingHistory />} />
          <Route path="ulubione" element={<Favorite />} />
          <Route path="doladujPortfel" element={<TopUpWallet />} />
          <Route path="adresDostawy" element={<DeliveryAddress />} />
          <Route path="daneDoFaktury" element={<InvoiceData />} />
          <Route path="ustawieniaKonta" element={<AccountSettings />} />
          <Route
            path="twojeDziela"
            element={
              <ProtectedRoute accesBy="authenticated" role="artysta">
                <UserArts />
              </ProtectedRoute>
            }
          />
          <Route
            path="panelAdministratora"
            element={
              <ProtectedRoute accesBy="authenticated" role="administrator">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );

  return <AuthContextProvider>{content}</AuthContextProvider>;
}

export default App;

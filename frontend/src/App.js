import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Motos from "./pages/Motos";
import Supersport from "./pages/Supersport";
import Roadster from "./pages/Roadster";
import SportTouring from "./pages/SportTouring";
import OffRoad from "./pages/OffRoad";
import Marine from "./pages/Marine";
import Login from "./pages/Login";
import MyReservations from "./pages/MyReservations";
import About from "./pages/About";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/motos"
          element={<Motos />}
        />

        <Route
          path="/motos/supersport"
          element={<Supersport />}
        />

        <Route
          path="/motos/roadster"
          element={<Roadster />}
        />

        <Route
          path="/motos/sport-touring"
          element={<SportTouring />}
        />

        <Route
          path="/motos/off-road"
          element={<OffRoad />}
        />

        <Route
          path="/my-reservations"
          element={<MyReservations />}
        />

        <Route
          path="/marine"
          element={<Marine />}
        />

      </Routes>

      {/* FLOAT WHATSAPP BUTTON */}
      <a href="https://wa.me/1234567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contactez-nous sur WhatsApp">
        <svg fill="#fff" viewBox="0 0 24 24" width="30" height="30">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.652.581 1.214.761 1.387.848.173.087.276.072.375-.043.1-.116.434-.508.549-.683.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937 0 3.825-3.113 6.938-6.938 6.938z" />
        </svg>
      </a>

    </BrowserRouter>
  );
}

export default App;
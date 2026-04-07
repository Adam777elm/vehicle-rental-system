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

      </Routes>

    </BrowserRouter>
  );
}

export default App;
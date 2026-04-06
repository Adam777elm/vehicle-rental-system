import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Motos from "./pages/Motos";
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
          path="/my-reservations"
          element={<MyReservations />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" && (
        <main className="hero">
          <div className="hero-content">
            <h1>Paradise Nursery</h1>

            <h2>Bring Nature Into Your Home</h2>

            <p>
              Discover beautiful houseplants and create a
              greener, healthier, happier living space.
            </p>

            <button onClick={() => setPage("plants")}>
              Get Started
            </button>
          </div>
        </main>
      )}

      {page === "home" && <AboutUs />}

      {page === "plants" && (
        <ProductList onNavigate={setPage} />
      )}

      {page === "cart" && (
        <CartItem onNavigate={setPage} />
      )}
    </div>
  );
}

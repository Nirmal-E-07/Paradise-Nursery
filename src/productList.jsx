
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import plants from "./plants";

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="page">
      <nav className="navbar">
        <h2>🌿 Paradise Nursery</h2>

        <div className="nav-links">
          <button onClick={() => onNavigate("home")}>Home</button>
          <button onClick={() => onNavigate("plants")}>Plants</button>
          <button onClick={() => onNavigate("cart")}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      <header className="page-heading">
        <h1>Our Houseplants</h1>
        <p>Bring nature home with our beautiful plant collection.</p>
      </header>

      {categories.map((category) => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const isAdded = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article className="plant-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />

                    <h3>{plant.name}</h3>
                    <p className="price">₹{plant.price}</p>

                    <button
                      disabled={isAdded}
                      onClick={() => dispatch(addToCart(plant))}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

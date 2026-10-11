
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./CartSlice";

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
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

      <section className="cart-page">
        <h1>Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button onClick={() => onNavigate("plants")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ₹{item.price}</p>
                  <p>
                    Item Total: ₹{item.price * item.quantity}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove-button"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <div className="cart-summary">
              <h2>Total: ₹{total}</h2>

              <button
                onClick={() => window.alert("Checkout Coming Soon!")}
              >
                Checkout
              </button>

              <button
                className="secondary-button"
                onClick={() => onNavigate("plants")}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

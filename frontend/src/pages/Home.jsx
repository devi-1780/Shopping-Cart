import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const API_URL = "http://localhost:5000";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/items`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar cartCount={cart.length} />
      <div style={styles.main}>
        <ProductList products={products} onAdd={addToCart} />
        <Cart cart={cart} onRemove={removeFromCart} />
      </div>
    </>
  );
}

const styles = {
  main: {
    display: "flex",
    gap: "30px",
    padding: "20px",
  },
};

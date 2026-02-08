import { useEffect, useState } from "react";

export default function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addToCart = async (itemId) => {
    await fetch("http://localhost:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ itemId }),
    });

    alert("Item added to cart");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Items</h2>

      {items.map((item) => (
        <div key={item._id} className="border p-3 mb-2">
          <p>
            {item.name} - ₹{item.price}
          </p>
          <button
            onClick={() => addToCart(item._id)}
            className="bg-green-500 text-white px-3 py-1 mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

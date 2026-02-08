import { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/carts", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data.items || []));
  }, []);

  const placeOrder = async () => {
    await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    alert("Order placed successfully");
    setItems([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Cart</h2>

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className="border p-2 mb-2">
              Item ID: {item.itemId}
            </div>
          ))}

          <button
            onClick={placeOrder}
            className="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

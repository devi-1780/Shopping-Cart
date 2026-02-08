import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = async () => {
    await fetch("http://localhost:5000/users/logout", {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-200">
      {token && (
        <>
          <Link to="/items">Items</Link>
          <Link to="/cart">Cart</Link>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

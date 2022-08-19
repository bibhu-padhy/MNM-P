import { useSignOut, useUserData } from "@nhost/react";
import { useNavigate } from "react-router-dom";
function Home() {
  const user = useUserData();
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };
  return (
    <div className="max-w-md mx-auto">
      <nav className="flex justify-between items-center  w-full shadow px-2 py-2">
        <div className="text-blue-600 font-medium">{user?.email}</div>
        <button
          className="px-3 py-1 shadow bg-gray-200 font-medium text-xs"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
export default Home;

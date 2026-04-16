import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-zinc-800 text-white">
      <h1 className="text-4xl mb-5">Welcome to Notes App</h1>

      <button
        onClick={() => navigate("/register")}
        className="bg-blue-600 px-6 py-2 rounded"
      >
        Register Here
      </button>
    </div>
  );
}

export default Home;
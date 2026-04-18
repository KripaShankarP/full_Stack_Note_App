import { useState ,useNavigate} from "react";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const register = async () => {
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      alert("All fields are required...");
      return;
    }
    let res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    let data = await res.json();
    if (data.error || data.message) {
      alert(data.error || data.message);
      return;
    }
    if (data.user) {
      alert("User Created Successfully");
    }
    if (data.user) window.location.href = "/login";
  };

  return (
    <div className="w-full h-screen bg-zinc-800 p-3 ">
      <div className="m-5">
        <h1 className="text-3xl text-white pl-10">User Registration Form</h1>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-1/3 h-10 rounded-2xl  p-2 flex bg-zinc-500 m-2 text-black"
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-1/3 h-10 rounded-2xl  p-2 flex bg-zinc-500 m-2 text-black"
        />
        <input
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-1/3 h-10 rounded-2xl  p-2 flex bg-zinc-500 m-2 text-black"
        />
        <button
          onClick={register}
          className="w-1/4 h-10 text-center flex bg-blue-600 text-white rounded-4xl pl-30 ml-13 pt-1 text-2xl active:bg-blue-800"
        >
          Register
        </button>
        <p className="text-white ml-20 mt-3">
          Do you already have an account?{" "}
          <span
            onClick={() => (window.location.href = "/login")}
            className="text-blue-400 cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

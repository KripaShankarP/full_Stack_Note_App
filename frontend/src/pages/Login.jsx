import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    let res = await fetch("https://full-stack-note-app-3kj4.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    let data = await res.json();
    console.log(data);
    
     if (!data.user) {
        alert(" Invalid email or password!");
        return;
      } 
      else {
        alert(" Login Successful!");
        window.location.href = "/notes";
      }
    if (data.user) window.location.href = "/notes";
  };

  return (
    <div className="w-full h-screen bg-zinc-800 p-10 flex  flex-wrap justify-center">
      <div className="">
        <h1 className="text-3xl text-white ml-20 mb-5" >User Login Form</h1>
        <input onChange={e => setEmail(e.target.value)} placeholder="email"  className="w-full bg-zinc-700 rounded-b-md h-10 flex  m-2 p-2 text-white"/>
      <input onChange={e => setPassword(e.target.value)} placeholder="password" className="w-full bg-zinc-700 rounded-b-md h-10 flex  m-2 p-2 text-white" />
      <button onClick={login} className="bg-blue-700 p-1.5 text-white  rounded-3xl w-full ">Login</button>
      </div>
    </div>
  );
}

export default Login;
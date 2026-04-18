import { useEffect, useState } from "react";

function Notes() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
 

  const load = () => {
    fetch("http://localhost:3000/api/notes", { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user));
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!content.trim()) {
      alert("Empty notes not allowed");
      return;
    }
    let res = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      credentials: "include",
      body: JSON.stringify({ content })
    });
   
    if (res.status === 401) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }
   let data = await res.json();

  setContent("");
  load();
  };
   

  const del = async (id) => {
    await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    load();
  };
  const logout = async () => {
  await fetch("http://localhost:3000/api/auth/logout", {
    credentials: "include"
  });

  alert("Logged out");
  window.location.href = "/login";
};

  return (
    <div className="bg-zinc-900 text-white w-full h-screen ">
     <div className="pl-50 ">
      <h1 className="text-3xl text-white ">Create a Note</h1>
       <div className="flex items-center justify-between w-1/3">
  <h2 className="text-2xl text-white m-5">
    Hello, {user?.username}
  </h2>

  {user && (
    <button
      onClick={logout}
      className="bg-red-500 px-4 py-1 rounded-xl h-8"
    >
      Logout
    </button>
  )}
</div>


      <textarea value={content} onChange={e => setContent(e.target.value)} className="w-1/3 h-20 bg-zinc-600 " />
      <button onClick={add} className="flex bg-amber-500 w-50 rounded-4xl pl-18 h-10 pt-2 ml-10 mt-2">Add Note</button>
     <div className="flex flex-wrap">
      {user?.posts.map(n => (
         <div key={n._id} className="w-1/7 h-50 bg-zinc-700 flex flex-col justify-between p-3 m-3 rounded-2xl mt-5">
          <p className="text-2xl">{n.content}</p>
         <div className="flex justify-between">
           <button onClick={() => del(n._id) } className="text-red-500">Delete</button>
          <button onClick={() => window.location.href=`/edit/${n._id}`}>Edit</button>
         </div>
        </div>
      ))}
      </div>
     </div>
    </div>
  );
}

export default Notes;
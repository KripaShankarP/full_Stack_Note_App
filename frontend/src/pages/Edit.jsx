import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditNote() {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/notes", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        let note = data.user.posts.find(n => n._id === id);
        if (note) setContent(note.content);
      });
  }, []);

  const save = async () => {
    await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      credentials: "include",
      body: JSON.stringify({ content })
    });

    window.location.href = "/notes";
  };

  return (
    <div className="bg-zinc-900 w-full h-screen p-10">
      <h1 className="text-2xl text-white  mb-3 pl-20">Update your Notes...</h1>
      <textarea value={content} onChange={e => setContent(e.target.value)} className="flex w-1/3 h-20 bg-zinc-600 text-xl pl-2 rounded-md"/>
      <button onClick={save} className="w-1/4 h-10 bg-amber-700 active:bg-amber-900 rounded-3xl text-xl mt-3 ml-10">Save</button>
    </div>
  );
}

export default EditNote;
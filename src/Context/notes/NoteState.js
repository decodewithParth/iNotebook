import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYzljMmQ3YTA0NjljNjk3MGUzNzZkIn0sImlhdCI6MTY5MDA4NzMwMX0.2NGuncFxAzXWMYaB9Nf2Z39dktFXIBVdPId5NMASPVw"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }


  // Add a note 
  const addNote = async (title, description, tag) => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYzljMmQ3YTA0NjljNjk3MGUzNzZkIn0sImlhdCI6MTY5MDA4NzMwMX0.2NGuncFxAzXWMYaB9Nf2Z39dktFXIBVdPId5NMASPVw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    const note = {
      "_id": "64c497ba9a4085856cba4687a12",
      "user": "64bc9c2d7a0469c6970e376d",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-07-29T04:38:18.359Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYzljMmQ3YTA0NjljNjk3MGUzNzZkIn0sImlhdCI6MTY5MDA4NzMwMX0.2NGuncFxAzXWMYaB9Nf2Z39dktFXIBVdPId5NMASPVw"
      }
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting the node with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYzljMmQ3YTA0NjljNjk3MGUzNzZkIn0sImlhdCI6MTY5MDA4NzMwMX0.2NGuncFxAzXWMYaB9Nf2Z39dktFXIBVdPId5NMASPVw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit note in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
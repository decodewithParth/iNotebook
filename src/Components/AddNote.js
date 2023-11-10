import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext';
import { useState } from 'react';
import Notes from './Notes';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"});
    const handleOnChange=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
       setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h1>Add Your Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="title" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleOnChange}>Add Note</button>
            </form>
        </div>

    )
}

export default AddNote

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS for the Snow theme

import { useDispatch } from "react-redux";
import { createNote } from "../actions/actions";

const AddEditNote = () => {
  const quillRef = useRef(null);

  useEffect(() => {
    // Initialize Quill when the component mounts
    quillRef.current = new Quill("#editor", {
      theme: "snow", // Use the Snow theme for a clean and modern interface
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // Text styling options
          [{ list: "ordered" }, { list: "bullet" }], // Text formatting tools (lists)
          ["image"], // Image insertion option
          [{ color: [] }, { background: [] }], // Text color and background color options
          ["clean"], // Remove formatting option
        ],
      },
    });

    // Listen to changes in the editor content and update the component state
    quillRef.current.on("text-change", () => {
      setContent(quillRef.current.root.innerHTML);
    });

    // Clean up the Quill instance when the component unmounts
    return () => {
      quillRef.current.off("text-change");
      quillRef.current = null;
    };
  }, []); // Only run this effect once during component initialization

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [notes, setNotes] = React.useState([]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content: quillRef.current.root.innerHTML,
      category,
    };
    dispatch(createNote(newNote));
    setTitle("");
    setContent("");
    quillRef.current.root.innerHTML = "";
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2>Add/Edit Note</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
          
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="editor" className="form-label">
            Content
          </label>
          <div id="editor" style={{ height: "300px" }} />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Note
        </button>
      </form>
      <div className="mt-5">
        <h3>Notes Organization</h3>
        {notes.map((note) => (
          <div key={note.id}>
            <h4>{note.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEditNote;

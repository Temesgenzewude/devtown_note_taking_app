import React from "react";

const NoteDetail = () => {
  // Dummy data for testing
  const note = {
    id: 1,
    title: "Note 1",
    content: "This is the content of Note 1",
  };

  return (
    <div className="container mt-5">
      <h2>Note Detail</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title">{note.title}</h4>
          <p className="card-text">{note.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;

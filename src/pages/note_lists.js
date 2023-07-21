import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, searchNotes, filterNotes } from "../actions/actions";
import InfiniteScroll from "react-infinite-scroll-component";

const NoteList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    startDate: "",
    endDate: "",
    // Add more filter options if required.
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchNotes(page));
  }, [dispatch, page]);

  const notes = useSelector((state) => state.notes);
  const filteredNotes = useSelector((state) => state.filteredNotes);

  const handleSearch = () => {
    dispatch(searchNotes(searchTerm));
  };

  const handleFilter = () => {
    dispatch(filterNotes(filterOptions));
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterOptions({
      category: "",
      startDate: "",
      endDate: "",
    });
    dispatch(fetchNotes()); // Reset filters and fetch all notes again
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title, content, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <select
          value={filterOptions.category}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, category: e.target.value })
          }
        >
          <option value="">Filter by category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          {/* Add more categories here */}
        </select>
        <input
          type="date"
          value={filterOptions.startDate}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, startDate: e.target.value })
          }
        />
        <input
          type="date"
          value={filterOptions.endDate}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, endDate: e.target.value })
          }
        />
        {/* Add more filter options if required. */}
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleReset}>Reset Filters</button>
      </div>
      <div>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id}>
              <h4>{note.title}</h4>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </div>
          ))
        ) : (
          <p>No notes found. Try different filters or search terms.</p>
        )}
      </div>
      <div>
        <h2>Notes List</h2>
        <InfiniteScroll
          dataLength={notes.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {notes.map((note) => (
            <Note key={note.id} title={note.title} content={note.content} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default NoteList;

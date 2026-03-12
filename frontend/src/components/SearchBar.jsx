function SearchBar({ q, setQ }) {
  return (
    <div className="search-card">
      <input
        className="form-control form-control-sm"
        placeholder="Search for news, topics, or sources…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
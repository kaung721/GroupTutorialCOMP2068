function SearchBar({ q, setQ}){
    return (
        <div className="mb-3">
            <input 
                className="form-control" 
                placeholder="Search for news..." 
                value={q} 
                onChange={e => setQ(e.target.value)} 
            />
        </div>
    );
}

export default SearchBar;
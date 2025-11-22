function SavedList({saved, onRemove}) {
    if (!saved.length) {
        return <div className="alert alert-info">No saved articles.</div>;
    }
    return(
        <div>
            {saved.map(s => (
                <div className="card mb-2" key={s.id}>
                    <div className="card-body">
                        <h6>{s.title}</h6>
                        <p className="mb-1"><small className="text-muted">{s.source} | {s.publishedAt ? new Date(s.publishedAt).toLocaleString() : ''}</small></p>
                        <a href={s.url} className="btn btn-sm btn-outline-secondary me-2" target="_blank" rel="noreferrer">Open Article</a>
                        <button className="btn btn-sm btn-danger" onClick={() => onRemove(s.url)}>Unsave</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SavedList;
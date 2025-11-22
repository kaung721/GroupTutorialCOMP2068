function ArticleCard({ a, onSave, savedUrls, onRemove }) {
  const isSaved = savedUrls.includes(a.url);
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{a.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{a.source.name} - {new Date(a.publishedAt).toLocaleDateString()}</h6>
                <p className="card-text">{a.description}</p>
                <a href={a.url} className="btn btn-sm btn-outline-secondary me-2" target="_blank" rel="noreferrer">Open Article</a>
                {isSaved ? (
                    <button className="btn btn-sm btn-primary" onClick={() => onSave(a)}>Save</button>
                ) : (
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onRemove(a.url)}>Unsave</button>
                )}
            </div>
        </div>
    );
}

export default ArticleCard;
function ArticleCard({ a, onSave, savedUrls, onRemove }) {
  const isSaved = savedUrls instanceof Set && savedUrls.has(a.url);
  const published = a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : '';
  return (
    <article className="card article-card mb-3">
      <div className="card-body">
        <h4 className="card-title text-white mb-2">{a.title}</h4>
        <div className="article-meta mb-2">
          <span>{a.source}</span>
          {published && <span> • {published}</span>}
        </div>
        {a.description && <p className="card-text article-description mb-3">{a.description}</p>}
        <div className="d-flex flex-wrap gap-2">
          <a
            href={a.url}
            className="btn btn-sm btn-outline-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Open Article
          </a>
          {isSaved ? (
            <button className="btn btn-sm btn-primary" onClick={() => onRemove(a.url)}>
              Unsave
            </button>
          ) : (
            <button className="btn btn-sm btn-outline-primary" onClick={() => onSave(a)}>
              Save
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;

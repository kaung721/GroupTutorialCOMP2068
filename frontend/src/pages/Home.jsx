import { useEffect, useState } from "react";
import { news, saved } from "../api";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
export default function Home({ user }) {
  const [categories] = useState([
  "technology",
  "business",
  "world",
  "general",
]);
  const [selected, setSelected] = useState("technology");
  const [q, setQ] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [savedUrls, setSavedUrls] = useState(new Set());
  async function load() {
    const res = await news.getCategory(selected, q, 30);
    setArticles(res.articles);
  }
  async function loadSaved() {
    if (!user) {
      setSavedList([]);
      setSavedUrls(new Set());
      return;
    }
    const r = await saved.list();
    setSavedList(r.saved);
    setSavedUrls(new Set(r.saved.map((s) => s.url)));
  }
  useEffect(() => {
    load();
  }, [selected]);
  useEffect(() => {
    loadSaved();
  }, [user]);
  async function handleSave(a) {
    if (!user) return alert("Login to save");
    await saved.save(a);
    await loadSaved();
  }
  async function handleRemove(url) {
    if (!user) return;
    await saved.remove(url);
    await loadSaved();
  }
  const filtered = articles.filter((a) => {
    if (!q) return true;
    const qq = q.toLowerCase();
    return (
      (a.title && a.title.toLowerCase().includes(qq)) ||
      (a.description && a.description.toLowerCase().includes(qq))
    );
  });
  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-8">
          <CategoryMenu
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="col-md-4">
          <SearchBar q={q} setQ={setQ} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {filtered.map((a, i) => (
            <ArticleCard
              key={a.url || i}
              a={a}
              onSave={handleSave}
              savedUrls={savedUrls}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <div className="col-md-4">
          <h5>Saved</h5>
          <div style={{ maxHeight: "70vh", overflow: "auto" }}>
            {user ? (
              <SavedSidebar saved={savedList} onRemove={handleRemove} />
            ) : (
              <div className="alert alert-secondary">
                Login to see your saved articles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function SavedSidebar({ saved, onRemove }) {
  if (!saved.length) return <div className="text-muted">No saved</div>;
  return (
    <div>
      {saved.map((s) => (
        <div className="mb-2" key={s._id}>
          <div>
            <strong>{s.title}</strong>
          </div>
          <div>
            <small className="text-muted">{s.source}</small>
          </div>
          <div className="mt-1">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onRemove(s.url)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

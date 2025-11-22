import { useEffect, useState } from "react";
import SavedList from "../components/SavedList";
import { saved } from "../api";
export default function SavedPage({ user }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (user) load();
    else setList([]);
  }, [user]);
  async function load() {
    const r = await saved.list();
    setList(r.saved);
  }
  async function remove(url) {
    await saved.remove(url);
    await load();
  }
  if (!user)
    return (
      <div className="alert alert-info">Login to view saved articles.</div>
    );
  return (
    <div>
      <h3>Your saved articles</h3>
      <SavedList saved={list} onRemove={remove} />
    </div>
  );
}

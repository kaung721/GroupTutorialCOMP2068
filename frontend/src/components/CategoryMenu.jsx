function CategoryMenu({ categories, selected, setSelected }) {
  return (
    <div className="mb-3 category-strip">
      {categories.map((c) => (
        <button
          key={c}
          className={`btn btn-sm me-2 category-pill ${c === selected ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelected(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
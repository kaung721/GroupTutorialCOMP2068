function CategoryMenu({categories, selected, setSelected}) {
    return (
        <div className="mb-3">
            <div className="btn-group" role="group">
                {categories.map(c => (
                    <button key={c} className={`btn ${c===selected? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelected(c)}>{c}</button>
                ))}
            </div>
        </div>
    );
}

export default CategoryMenu;
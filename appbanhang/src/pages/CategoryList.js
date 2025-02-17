import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/category")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Danh Mục Thể Loại</h2>
      <div className="row">
        {categories.map(category => (
          <div className="col-md-4 mb-3" key={category._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/the-loai/${category._id}`}>{category.name}</Link>
                </h5>
                <p className="card-text">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList; 
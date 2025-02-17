import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StoryCard from "../components/StoryCard";

function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoryRes, storiesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/category/${id}`),
        axios.get(`http://localhost:5000/api/story/category/${id}`)
      ]);
      setCategory(categoryRes.data);
      setStories(storiesRes.data);
    };
    
    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      {category && <h1>{category.name}</h1>}
      {category?.description && <p className="lead">{category.description}</p>}
      
      <h3 className="mt-4">Danh sách truyện</h3>
      <div className="row">
        {stories.map(story => (
          <div className="col-md-4 mb-3" key={story._id}>
            <StoryCard story={story} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category; 
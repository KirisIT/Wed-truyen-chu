import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Story.css';

function Story() {
  const [story, setStory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/story/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story-container">
      <div className="row">
        <div className="col-md-4">
          <img src={story.image} alt={story.title} className="img-fluid rounded-3" />
        </div>
        <div className="col-md-8">

          <div className="story-header">
            <h1>{story.title}</h1>
            <p className="author">Tác giả: {story.author}</p>
          </div>

          <div className="story-stats">
            <div className="stat-item">
              <span>{story.chaptersPerWeek || 14}</span>
              <p>Chương/tuần</p>
            </div>
            <div className="stat-item">
              <span>{story.views || 526514}</span>
              <p>Lượt đọc</p>
            </div>
            <div className="stat-item">
              <span>{story.chapters || 162}</span>
              <p>Đề cử</p>
            </div>
            <div className="stat-item">
              <span>{story.bookmarks || 1583}</span>
              <p>Cất giữ</p>
            </div>
          </div>

          <div className="story-actions">
            <button className="btn-primary">Đọc Tiếp</button>
            <button className="btn-secondary">Đánh Dấu</button>
            <button className="btn-secondary">Mục Lục</button>
            <button className="btn-rating">Đánh Giá <span className="rating">{story.rating || 5}</span></button>
            <button className="btn-secondary">Thảo Luận <span className="comments">{story.comments || 180}</span></button>
          </div>

          <div className="story-tags">
            {story.tags && story.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story;
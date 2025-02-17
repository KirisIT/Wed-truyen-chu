import { Link } from "react-router-dom";
import './StoryCard.css';

function StoryCard({ story }) {
  return (
    <div className="card story-card">
      <img src={story.image} alt={story.title} className="card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{story.title}</h3>
        <p className="card-text">{story.author}</p>
        <Link to={`/story/${story._id}`} className="btn btn-primary">Đọc Truyện</Link>
      </div>
    </div>
  );
}

export default StoryCard;

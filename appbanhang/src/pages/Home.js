import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/story")
      .then(response => {
        setStories(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Không tải được danh sách truyện");
        setLoading(false);
      });
  }, []);

  const handleReadClick = (storyId) => {
    navigate(`/story/${storyId}`);
  };

  if (loading) return <StorySkeletonLoader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-container mb-5">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <i className="fa-solid fa-book-journal-whills"></i>
        <span className="title-text gradient-animate">
        <i className="fas fa-book-open me-2"></i>
          Truyện Hay Mới Nhất
        </span>
      </motion.h1>
      <motion.div
        className="story-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            className="story-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="story-image">
              {story.image ? (
                <img
                  src={story.image}
                  alt={story.title}
                  onError={(e) => {
                    e.target.src = '/default-cover.jpg'; // Hình ảnh mặc định khi lỗi
                  }}
                />
              ) : (
                <div className="default-cover">
                  <span>{story.title[0]}</span>
                </div>
              )}
            </div>
            <div className="story-content">
              <h2 className="story-title">
                <Link to={`/story/${story._id}`}>{story.title}</Link>
              </h2>
              <div className="story-author">
                <i className="fas fa-user"></i> {story.author}
              </div>
              <div className="story-chapters">
                {story.totalChapters || 0} chương
              </div>
              <motion.button
                className="read-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleReadClick(story._id)}
              >
                Đọc thử
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const StorySkeletonLoader = () => (
  <div className="story-grid">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div key={item} className="story-item skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Home;

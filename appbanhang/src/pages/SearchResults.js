import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StoryCard from "../components/StoryCard";
import { motion } from "framer-motion";

function SearchResults() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 9;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/story/search?q=${encodeURIComponent(query)}`
        );
        console.log("Dữ liệu nhận được từ API:", response.data);
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        setLoading(false);
      }
    };
    
    if (query) fetchResults();
  }, [query]);

  const SkeletonLoader = () => (
    <motion.div 
      className="col-md-4 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="search-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line-short"></div>
        </div>
      </div>
    </motion.div>
  );

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  return (
    <motion.div 
      className="search-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-header">
        <motion.h4 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="search-title text-black"
        >
          <i className="fas fa-search text-black"></i>
          Kết quả tìm kiếm cho: "{query}"
        </motion.h4>
      </div>

      {loading ? (
        <div className="search-results-grid">
          {[...Array(6)].map((_, i) => <SkeletonLoader key={i} />)}
        </div>
      ) : (
        <>
          <div className="search-results-grid">
            {stories.length > 0 ? (
              currentStories.map(story => (
                <motion.div
                  key={story._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <StoryCard story={story} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-exclamation-circle"></i>
                <p>Không tìm thấy truyện phù hợp với từ khóa "{query}"</p>
              </motion.div>
            )}
          </div>

          {stories.length > storiesPerPage && (
            <motion.div 
              className="pagination-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="pagination">
                {Array.from({ length: Math.ceil(stories.length / storiesPerPage) }, (_, i) => (
                  <motion.button
                    key={i}
                    className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default SearchResults; 
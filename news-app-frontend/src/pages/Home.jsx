import React, { useState, useEffect } from "react";
import { Box, Typography, Container, CircularProgress, Grid } from "@mui/material";
import NewsService from "../services/newsService";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../components/NavBar";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();

  const fetchArticles = async (query = "") => {
    try {
      setLoading(true);
      let response;
      if (query) {
        response = await NewsService.searchNews(query);
      } else {
        response = await NewsService.fetchTopHeadlines();
      }
      setArticles(response.articles || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch news. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchArticles();
    }
  }, [currentUser]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    fetchArticles(query);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F3F3F3',
        minHeight: '100vh',
        fontFamily: '"Neue Haas Grotesk", Arial, sans-serif',
      }}
    >
      <NavBar onSearchSubmit={handleSearchSubmit} />

      <Container maxWidth="xl" sx={{ pt: 12, position: 'relative' }}>
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 5,
            color: '#333',
            textAlign: 'center',
          }}
        >
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Today's Top Headlines"}
        </Typography>

        {/* Loading/Error/Articles */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr', // Two equal columns with a partition line
              gap: '20px',
              position: 'relative',
            }}
          >
            {/* Left column */}
            <Box
              sx={{
                display: 'grid',
                gap: '20px',
                gridAutoRows: '1fr', // Ensures all articles have the same height
              }}
            >
              {articles
                .filter((_, index) => index % 2 === 0) // Left side articles (even indices)
                .map((article, index) => (
                  <ArticleCard key={`left-${index}`} article={article} />
                ))}
            </Box>

            {/* Vertical partition line */}
            <Box
              sx={{
                backgroundColor: '#D0D0D0',
                width: '1px',
                height: '100%',
                position: 'relative',
                zIndex: 1,
              }}
            />

            {/* Right column */}
            <Box
              sx={{
                display: 'grid',
                gap: '20px',
                gridAutoRows: '1fr', // Ensures all articles have the same height
              }}
            >
              {articles
                .filter((_, index) => index % 2 !== 0) // Right side articles (odd indices)
                .map((article, index) => (
                  <ArticleCard key={`right-${index}`} article={article} />
                ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;

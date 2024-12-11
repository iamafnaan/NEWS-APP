import React, { useState, useEffect } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import NewsService from "../services/newsService";
import ArticleCard from "../components/ArticleCard";

const SearchResults = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await NewsService.searchNews(searchQuery);
      setArticles(response.articles || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <Box
      sx={{
        backgroundColor: "#F3F3F3",
        minHeight: "100vh",
        fontFamily: '"Neue Haas Grotesk", Arial, sans-serif',
      }}
    >
      <NavBar />

      <Container maxWidth="xl" sx={{ pt: 12, position: "relative" }}>
        
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 5,
            color: "#333",
            textAlign: "center",
          }}
        >
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Search Articles"}
        </Typography>

        {/* Loading/Error/Articles */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : articles.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No articles found for "{searchQuery}".
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1px 1fr", // Two equal columns with a partition line
              gap: "20px",
              position: "relative",
            }}
          >
            {/* Left column */}
            <Box
              sx={{
                display: "grid",
                gap: "20px",
                gridAutoRows: "1fr", // Ensures all articles have the same height
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
                backgroundColor: "#D0D0D0",
                width: "1px",
                height: "100%",
                position: "relative",
                zIndex: 1,
              }}
            />

            {/* Right column */}
            <Box
              sx={{
                display: "grid",
                gap: "20px",
                gridAutoRows: "1fr", // Ensures all articles have the same height
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

export default SearchResults;

import React, { useState, useEffect } from "react";
import { Typography, Container, CircularProgress, Alert, Box } from "@mui/material";
import NewsService from "../services/newsService";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import {Grid2} from "@mui/material";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await NewsService.fetchTopHeadlines();
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

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #4a90e2, #6a3b8f)",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        {loading ? (
          <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Container>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 4,
                color: "#ffffff",
              }}
            >
              Today's Top Headlines
            </Typography>
            <Grid2 container spacing={4} justifyContent="center">
              {articles.map((article, index) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ArticleCard article={article} />
                </Grid2>
              ))}
            </Grid2>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;

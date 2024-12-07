import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Container, 
  CircularProgress, 
  Alert ,
  
} from '@mui/material';

import {Grid2 }from '@mui/material';
import NewsService from '../services/newsService';
import ArticleCard from '../components/ArticleCard';
import Navbar from '../components/NavBar';
import { useAuth } from '../../context/AuthContext';

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
      setError('Failed to fetch news. Please try again later.');
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
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Container>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Today's Top Headlines
            </Typography>
            <Grid2 container spacing={2} disableEqualOverflow>
              {articles.map((article, index) => (
                <Grid2 key={index} xs={12} sm={6} md={4}>
                  <ArticleCard article={article} />
                </Grid2>
              ))}
            </Grid2>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
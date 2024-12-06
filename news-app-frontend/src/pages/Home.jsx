import React, { useState, useEffect } from 'react';
import { 
   
  Typography, 
  Container, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import NewsService from '../services/newsService';
import ArticleCard from '../components/ArticleCard';
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

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Today's Top Headlines
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
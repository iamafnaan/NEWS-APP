import axios from 'axios';

const BASE_URL =  'http://localhost:8080/api/news';

class NewsService {
  static async fetchTopHeadlines(country = 'us') {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, { 
        params: { country } 
      });
      return response.data;
    } catch (error) {
      console.error('News Fetch Error:', error);
      throw error;
    }
  }

  static async searchNews(query, country = 'us') {
    try {
      const response = await axios.get(`${BASE_URL}/query`, { 
        params: { q: query, country } 
      });
      return response.data;
    } catch (error) {
      console.error('News Search Error:', error);
      throw error;
    }
  }
}

export default NewsService;
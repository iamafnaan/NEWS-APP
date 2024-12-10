import React from "react";
import { 
  Box, 
  Typography 
} from "@mui/material";
import DefaultImage from "../../src/assets/GoogleImage.png";

const ArticleCard = ({ article }) => {
  const handleCardClick = () => {
    window.open(article.url, "_blank");
  };

  return (
    <Box
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        border: '1px solid #E0E0E0',
        boxShadow: 'none',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        mb: 4,
        backgroundColor: 'white'
      }}
      onClick={handleCardClick}
    >
      <Box
        sx={{
          height: 250,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <img
          src={article.urlToImage || DefaultImage}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: !article.urlToImage ? 'grayscale(50%)' : 'none'
          }}
        />
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            fontSize: '1.1rem',
            lineHeight: 1.3
          }}
        >
          {article.title || "Untitled Article"}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            height: 60,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {article.description || "No description available."}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
          >
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
          
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#666', 
              fontStyle: 'italic'
            }}
          >
            {article.source.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleCard;
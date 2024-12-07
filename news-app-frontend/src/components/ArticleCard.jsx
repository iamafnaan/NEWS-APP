// // components/ArticleCard.jsx
// import React from "react";
// import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

// const ArticleCard = ({ article }) => {
//   return (
//     <Card sx={{ maxWidth: 345, m: 2 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={article.urlToImage || "https://via.placeholder.com/150"}
//         alt={article.title}
//       />
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           {article.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {article.description}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           size="small"
//           color="primary"
//           onClick={() => window.open(article.url, "_blank")}
//         >
//           Read More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default ArticleCard;
import React from "react";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Box 
} from "@mui/material";

const ArticleCard = ({ article }) => {
  // Truncate description to ensure consistent text length
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        maxWidth: 345,
        margin: 2
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={article.urlToImage || "https://via.placeholder.com/350x200"}
        alt={article.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            mb: 1, 
            height: '3rem', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}
        >
          {truncateText(article.title, 60)}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            height: '4.5rem', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}
        >
          {truncateText(article.description)}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => window.open(article.url, "_blank")}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;

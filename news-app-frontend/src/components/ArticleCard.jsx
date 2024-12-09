import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

const ArticleCard = ({ article }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: 360,
        minWidth: 280,
        margin: 2,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        backgroundColor: "#ffffff",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={article.urlToImage || "https://via.placeholder.com/360x200?text=No+Image"}
        alt={article.title}
        sx={{
          borderRadius: "3px 3px 0 0",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginBottom: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {article.title || "Untitled Article"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {/* {article.description || "No description available."} */}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2, justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => window.open(article.url, "_blank")}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
